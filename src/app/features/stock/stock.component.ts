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
import { Modal } from 'bootstrap';
import { StockNavigationService } from './stock-navigation.service';
import { MovementModalComponent } from './movement/movement-modal.component';

@Component({
    selector: 'app-stock',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PaginationComponent,
        MovementModalComponent
    ],
    templateUrl: './stock.component.html',
    styleUrl: './stock.component.scss',
})
export class StockComponent implements OnInit {

    stocks: StockResponseDTO[] = [];

    loading = false;

    isMovementModalOpen = false;
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
        this.movementType = MovementType.ENTRY;
        this.openMovementModal(stock);
    }

    openExitModal(stock: StockResponseDTO): void {
        this.movementType = MovementType.MANUAL_EXIT;
        this.openMovementModal(stock);
    }

    submitMovement(payload: {
        quantity: number;
        reason: string;
    }): void {

        if (!this.selectedStock) {
            return;
        }

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

    openMovementModal(stock: StockResponseDTO): void {
        this.selectedStock = stock;
        this.isMovementModalOpen = true;
    }

    confirmMovement(): void {
        this.isMovementModalOpen = false;
        this.selectedStock = undefined;
        this.loadStocks();
    }

    closeMovementModal(): void {
        this.isMovementModalOpen = false;
        this.selectedStock = undefined;
    }
}