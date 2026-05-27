import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';

import { StockService } from '../../core/services/stock.service';

import { StockResponseDTO } from '../../shared/models/stock/stock-response.dto';

import { StockEntryRequestDTO } from '../../shared/models/stock/stock-entry-request.dto';
import { StockExitRequestDTO } from '../../shared/models/stock/stock-exit-request.dto';

import { MovementType } from '../../shared/enums/movement-type.enum';
import { PaginationComponent } from "../../shared/components/pagination/pagination.component";
import { NavbarService } from '../../core/services/navbar.service';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { StockNavigationService } from './stock-navigation.service';

@Component({
    selector: 'app-stock',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PaginationComponent
    ],
    templateUrl: './stock.component.html'
})
export class StockComponent implements OnInit {

    stocks: StockResponseDTO[] = [];

    loading = false;

    selectedStock?: StockResponseDTO;

    movementType!: MovementType;

    movementForm!: FormGroup;

    currentPage = 0;

    totalPages = 0;

    constructor(
        private fb: FormBuilder,
        private stockService: StockService,
        private navbarService: NavbarService,
        private navigation: StockNavigationService
    ) { }


    ngOnInit(): void {
        this.navbarService.setConfig({
            icon: 'boxes',
            showFilter: false,
            title: 'Estoques'
        });

        this.createForm();
        this.loadStocks();
    }

    createForm(): void {

        this.movementForm = this.fb.group({

            quantity: [
                null,
                [
                    Validators.required,
                    Validators.min(1)
                ]
            ],

            reason: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(255)
                ]
            ]
        });
    }

    loadStocks(page: number = 0): void {

        this.loading = true;

        this.stockService.findAll(page, 10)
            .subscribe({

                next: (response) => {

                    this.stocks = response.content;

                    this.currentPage = response.number;

                    this.totalPages = response.totalPages;

                    this.loading = false;
                },

                error: () => {
                    this.loading = false;
                }
            });
    }

    openEntryModal(stock: StockResponseDTO): void {

        this.selectedStock = stock;

        this.movementType = MovementType.ENTRY;

        this.movementForm.reset();

        const modal =
            new bootstrap.Modal(
                document.getElementById('movementModal')!
            );

        modal.show();
    }

    openExitModal(stock: StockResponseDTO): void {

        this.selectedStock = stock;

        this.movementType = MovementType.MANUAL_EXIT;

        this.movementForm.reset();

        const modal =
            new bootstrap.Modal(
                document.getElementById('movementModal')!
            );

        modal.show();
    }

    submitMovement(): void {

        if (
            this.movementForm.invalid ||
            !this.selectedStock
        ) {

            this.movementForm.markAllAsTouched();

            return;
        }

        const payload =
            this.movementForm.value;

        const request =
            this.movementType === MovementType.ENTRY

                ? this.stockService.addEntry(
                    this.selectedStock.productId,
                    payload as StockEntryRequestDTO
                )

                : this.stockService.addExit(
                    this.selectedStock.productId,
                    payload as StockExitRequestDTO
                );

        request.subscribe({

            next: () => {

                this.loadStocks(this.currentPage);

                const modalElement =
                    document.getElementById('movementModal');

                if (modalElement) {

                    const modalInstance =
                        Modal.getInstance(modalElement);

                    modalInstance?.hide();
                }
            }
        });
    }

    changePage(page: number): void {

        if (
            page < 0 ||
            page >= this.totalPages
        ) {
            return;
        }

        this.loadStocks(page);
    }

    getBadgeClass(quantity: number): string {

        if (quantity <= 0) {
            return 'bg-danger';
        }

        if (quantity <= 10) {
            return 'bg-warning text-dark';
        }

        return 'bg-success';
    }

    getStockStatus(quantity: number): string {

        if (quantity <= 0) {
            return 'Sem estoque';
        }

        if (quantity <= 10) {
            return 'Baixo';
        }

        return 'Disponível';
    }

    protected readonly MovementType = MovementType;


    onPageChange(page: number): void {
        this.currentPage = page;
        this.loadStocks();
    }

    goToView(stock: StockResponseDTO): void {
        this.navigation.goToDetails(stock.productId);
    }
}