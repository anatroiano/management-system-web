import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SaleService } from '../../core/services/sale.service';
import { SaleResponseDTO } from '../../shared/models/sale/sale-response.dto';
import { PageResponse } from '../../shared/models/page-response.model';
import { NavbarService } from '../../core/services/navbar.service';
import { FormsModule } from '@angular/forms';
import { SaleNavigationService } from './sale-navigation.service';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
    selector: 'app-sale',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        CurrencyPipe,
        DatePipe,
        PaginationComponent
    ],
    templateUrl: './sale.component.html'
})
export class SaleComponent implements OnInit {

    sales: SaleResponseDTO[] = [];
    totalPages = 0;
    currentPage = 0;
    search = '';

    constructor(
        private saleService: SaleService,
        private navbarService: NavbarService,
        private navigation: SaleNavigationService
    ) { }

    ngOnInit(): void {
        this.navbarService.setConfig({
            icon: 'cart',
            showFilter: false,
            title: 'Vendas'
        });
        this.loadSales();
    }

    loadSales(): void {
        this.saleService.findAll(this.currentPage).subscribe({
            next: (response: any) => {
                this.sales = response.content;
                this.totalPages = response.totalPages;
            }
        });
    }

    goToDetails(sale: SaleResponseDTO): void {
        this.navigation.goToDetails(sale.id);
    }

    goToNew(): void {
        this.navigation.goToNew();
    }

    cancelSale(id: number): void {
        this.saleService.cancel(id).subscribe({
            next: () => this.loadSales()
        });
    }

    onPageChange(page: number): void {
        this.currentPage = page;
        this.loadSales();
    }
}