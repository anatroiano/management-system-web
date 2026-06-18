import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { StockService } from '../../core/services/stock.service';
import { getStockQuantityClass, getStockQuantityLabel, StockResponseDTO } from '../../shared/models/stock/stock-response.dto';
import { MovementType } from '../../shared/enums/movement-type.enum';
import { PaginationComponent } from "../../shared/components/pagination/pagination.component";
import { NavbarService } from '../../core/services/navbar.service';
import { StockNavigationService } from './stock-navigation.service';
import { MovementModalComponent } from './movement/movement-modal.component';
import { StockDashboardDTO } from '../../shared/models/stock/stock-dashboard.dto';

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
    isNewMovementModalOpen = false;

    selectedStock?: StockResponseDTO;

    movementType!: MovementType;

    movementForm!: FormGroup;

    getStockQuantityClass = getStockQuantityClass;
    getStockQuantityLabel = getStockQuantityLabel;

    currentPage = 0;

    totalPages = 0;

    dashboard?: StockDashboardDTO;

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
        this.loadDashboard();
    }

    createForm(): void {
        this.movementForm = this.fb.group({
            quantity: [null, [Validators.required, Validators.min(1)]],
            reason: ['', [Validators.required, Validators.maxLength(255)]]
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

    loadDashboard(): void {
        this.stockService.getDashboard()
            .subscribe({
                next: (data) => this.dashboard = data,
                error: () => { }
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
        this.loadDashboard();
    }

    closeMovementModal(): void {
        this.isMovementModalOpen = false;
        this.selectedStock = undefined;
    }

    openNewMovementModal(): void {
        this.isNewMovementModalOpen = true;
    }

    closeNewMovementModal(): void {
        this.isNewMovementModalOpen = false;
    }

    confirmNewMovement(): void {
        this.isNewMovementModalOpen = false;
        this.loadStocks();
        this.loadDashboard();
    }
}