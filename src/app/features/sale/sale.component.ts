import {Component, OnInit} from '@angular/core';
import {CommonModule, CurrencyPipe, DatePipe} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SaleService} from './sale.service';
import {SaleResponseDTO} from '../../shared/models/sale/sale-response.dto';
import {NavbarService} from '../../core/services/navbar.service';
import {FormsModule} from '@angular/forms';
import {SaleNavigationService} from './sale-navigation.service';
import {PaginationComponent} from '../../shared/components/pagination/pagination.component';
import {ConfirmModalComponent} from "../../shared/components/confirm-modal/confirm-modal.component";
import {getSaleStatusBadge, getSaleStatusName} from "../../shared/enums/sale-status.enum"
import {SaleDashboardDTO} from '../../shared/models/sale/sale-dashboard.dto';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CurrencyPipe,
    DatePipe,
    PaginationComponent,
    ConfirmModalComponent
  ],
  templateUrl: './sale.component.html'
})
export class SaleComponent implements OnInit {

  sales: SaleResponseDTO[] = [];
  totalPages = 0;
  currentPage = 0;
  pageSize = 10;
  search = '';

  isCancelModalOpen = false;
  selectedSale?: SaleResponseDTO;

  getSaleStatusName = getSaleStatusName;
  getSaleStatusBadge = getSaleStatusBadge;

  dashboard?: SaleDashboardDTO;

  constructor(
    private saleService: SaleService,
    private navbarService: NavbarService,
    private navigation: SaleNavigationService
  ) {
  }

  ngOnInit(): void {
    this.navbarService.setConfig({
      icon: 'cart',
      showFilter: false,
      title: 'Vendas'
    });
    this.loadSales();
    this.loadDashboard();
  }

  loadSales(): void {
    this.saleService.findAll(this.currentPage, this.pageSize, 'id,desc').subscribe({
      next: (response: any) => {
        this.sales = response.content;
        this.totalPages = response.totalPages;
      }
    });
  }

  loadDashboard(): void {
    this.saleService.getDashboard()
      .subscribe({
        next: (data) => this.dashboard = data,
        error: () => {
        }
      });
  }

  goToDetails(sale: SaleResponseDTO): void {
    this.navigation.goToDetails(sale.id);
  }

  goToNew(): void {
    this.navigation.goToNew();
  }

  confirmCancelSale(): void {
    if (!this.selectedSale) {
      return;
    }
    this.saleService.cancel(this.selectedSale.id)
      .subscribe({
        next: () => {
          this.closeCancelModal();
          this.loadSales();
        },
        error: (error) => {
          console.error('Erro ao cancelar venda', error);
        }
      });
  }

  closeCancelModal(): void {
    this.isCancelModalOpen = false;
  }

  openCancelModal(sale: SaleResponseDTO): void {
    this.selectedSale = sale;
    this.isCancelModalOpen = true;
  }


  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadSales();
  }
}
