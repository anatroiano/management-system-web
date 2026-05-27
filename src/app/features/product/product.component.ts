import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { NavbarService } from '../../core/services/navbar.service';
import { ProductService } from '../../core/services/product.service';
import { ProductResponseDTO } from '../../shared/models/product/product-response.dto';
import { PaginationComponent } from "../../shared/components/pagination/pagination.component";
import { ProductNavigationService } from './product-navigation.service';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  imports: [
    DataTableComponent,
    PaginationComponent,
    ConfirmModalComponent
  ]
})
export class ProductComponent implements OnInit {

  columns = [
    { field: 'id', label: 'ID' },
    { field: 'code', label: 'Código' },
    { field: 'name', label: 'Nome' }
  ];

  products: ProductResponseDTO[] = [];

  isDeleteModalOpen = false;
  selectedProduct?: ProductResponseDTO;

  currentPage = 0;
  pageSize = 10;

  totalPages = 0;
  totalElements = 0;

  loading = false;

  constructor(
    private navbarService: NavbarService,
    private productService: ProductService,
    private navigation: ProductNavigationService
  ) { }

  ngOnInit(): void {
    this.navbarService.setConfig({
      icon: 'box-seam',
      showFilter: false,
      title: 'Produtos'
    });

    this.loadProducts();
  }

  loadProducts(): void {

    this.loading = true;

    this.productService
      .findAll(this.currentPage, this.pageSize)
      .subscribe({
        next: (response: any) => {
          this.products = response.content;
          this.totalPages = response.totalPages;
          this.totalElements = response.totalElements;
          this.loading = false;
        },
        error: (error: any) => {
          console.error('Erro ao carregar produtos', error);
          this.loading = false;
        }
      });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }

  goToNew(): void {
    this.navigation.goToNew();
  }

  goToEdit(product: ProductResponseDTO): void {
    this.navigation.goToEdit(product.id);
  }

  goToDetails(product: ProductResponseDTO): void {
    this.navigation.goToDetails(product.id);
  }

  onDelete(product: ProductResponseDTO): void {
    this.selectedProduct = product;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.selectedProduct = undefined;
  }

  confirmDelete(): void {
    if (!this.selectedProduct) {
      return;
    }

    this.productService.disable(this.selectedProduct.id)
      .subscribe({
        next: () => {
          this.closeDeleteModal();
          this.loadProducts();
        },
        error: (error) => {
          console.error('Erro ao excluir produto', error);
        }
      });

  }
}