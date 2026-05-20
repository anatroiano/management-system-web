import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { NavbarService } from '../../core/services/navbar.service';
import { PaginationComponent } from "../../shared/components/pagination/pagination.component";
import { CustomerNavigationService } from './customer-navigation.service';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';
import { CustomerResponseDTO } from '../../shared/models/customer-response.dto';
import { CustomerService } from '../../core/services/customer.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  templateUrl: './customer.component.html',
  imports: [
    DataTableComponent,
    PaginationComponent,
    ConfirmModalComponent
  ]
})
export class CustomerComponent implements OnInit {

  columns = [
    { field: 'id', label: 'ID' },
    { field: 'name', label: 'Nome' },
    { field: 'email', label: 'E-mail' }
  ];

  customers: CustomerResponseDTO[] = [];

  isDeleteModalOpen = false;
  selectedCustomer?: CustomerResponseDTO;

  currentPage = 0;
  pageSize = 10;

  totalPages = 0;
  totalElements = 0;

  loading = false;

  constructor(
    private navbarService: NavbarService,
    private customerService: CustomerService,
    private navigation: CustomerNavigationService
  ) { }

  ngOnInit(): void {
    this.navbarService.setConfig({
      icon: 'people',
      showFilter: false,
      title: 'Clientes'
    });

    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;

    this.customerService
      .findAll(this.currentPage, this.pageSize)
      .subscribe({
        next: (response: any) => {
          this.customers = response.content;
          this.totalPages = response.totalPages;
          this.totalElements = response.totalElements;
          this.loading = false;
        },
        error: (error: any) => {
          console.error('Erro ao carregar clientes', error);
          this.loading = false;
        }
      });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadCustomers();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadCustomers();
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadCustomers();
  }

  goToNew(): void {
    this.navigation.goToNew();
  }

  goToEdit(customer: CustomerResponseDTO): void {
    this.navigation.goToEdit(customer.id);
  }

  goToDetails(customer: CustomerResponseDTO): void {
    this.navigation.goToDetails(customer.id);
  }

  onDelete(customer: CustomerResponseDTO): void {
    this.selectedCustomer = customer;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.selectedCustomer = undefined;
  }

  confirmDelete(): void {
    if (!this.selectedCustomer) {
      return;
    }

    this.customerService.disable(this.selectedCustomer.id)
      .subscribe({
        next: () => {
          this.closeDeleteModal();
          this.loadCustomers();
        },
        error: (error) => {
          console.error('Erro ao excluir cliente', error);
        }
      });

  }
}