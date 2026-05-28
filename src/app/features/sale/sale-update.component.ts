import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaleService } from '../../core/services/sale.service';
import { CreateSaleRequestDTO } from '../../shared/models/sale/create-sale-request.dto';
import { CreateSaleItemRequestDTO } from '../../shared/models/sale/create-sale-item-request.dto';
import { SaleNavigationService } from './sale-navigation.service';
import { ProductService } from '../../core/services/product.service';
import { CustomerService } from '../../core/services/customer.service';
import { PageResponse } from '../../shared/models/page-response.model';
import { SaleItemResponseDTO } from '../../shared/models/sale/sale-item-response.dto';
import { CustomerResponseDTO } from '../../shared/models/customer/customer-response.dto';
import { ProductResponseDTO } from '../../shared/models/product/product-response.dto';
import { NavbarService } from '../../core/services/navbar.service';

@Component({
    selector: 'app-sale-create',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        CurrencyPipe
    ],
    templateUrl: './sale-update.component.html'
})
export class SaleUpdateComponent implements OnInit {

    customers: CustomerResponseDTO[] = [];
    products: ProductResponseDTO[] = [];

    customerPage = 0;
    productPage = 0;

    loadingCustomers = false;
    loadingProducts = false;

    hasMoreCustomers = true;
    hasMoreProducts = true;

    selectedCustomer?: CustomerResponseDTO;
    selectedProduct?: ProductResponseDTO;

    quantity = 1;
    unitPrice = 0;

    items: SaleItemResponseDTO[] = [];

    constructor(
        private saleService: SaleService,
        private navigation: SaleNavigationService,
        private productService: ProductService,
        private customerService: CustomerService,
        private navbarService: NavbarService
    ) { }

    ngOnInit(): void {
       this.navbarService.setConfig({
            icon: 'cart',
            showFilter: false,
            title: 'Vendas'
        });
        this.loadCustomers();
        this.loadProducts();
    }

    loadCustomers(): void {

        if (this.loadingCustomers || !this.hasMoreCustomers) {
            return;
        }

        this.loadingCustomers = true;

        this.customerService.findAll(this.customerPage, 10).subscribe({
            next: (response: any) => {

                this.customers = [
                    ...this.customers,
                    ...response.content
                ];

                this.hasMoreCustomers = !response.last;
                this.customerPage++;
                this.loadingCustomers = false;
            }
        });
    }

    loadProducts(): void {
        if (this.loadingProducts || !this.hasMoreProducts) {
            return;
        }

        this.loadingProducts = true;

        this.productService.findAll(this.productPage, 10).subscribe({
            next: (response: any) => {
                this.products = [
                    ...this.products,
                    ...response.content
                ];
                this.hasMoreProducts = !response.last;
                this.productPage++;
                this.loadingProducts = false;
            }
        });
    }

    onCustomerScroll(event: Event): void {

        const element = event.target as HTMLElement;

        const atBottom =
            element.scrollTop + element.clientHeight >= element.scrollHeight - 10;

        if (atBottom) {
            this.loadCustomers();
        }
    }

    onProductScroll(event: Event): void {

        const element = event.target as HTMLElement;

        const atBottom =
            element.scrollTop + element.clientHeight >= element.scrollHeight - 10;

        if (atBottom) {
            this.loadProducts();
        }
    }

    onProductChange(): void {

        if (!this.selectedProduct) {
            return;
        }

        this.unitPrice = this.selectedProduct.price;
    }

    addItem(): void {

        if (!this.selectedProduct || this.quantity <= 0) {
            return;
        }

        const existing = this.items.find(
            i => i.productId === this.selectedProduct!.id
        );

        if (existing) {
            existing.quantity += this.quantity;
            existing.unitPrice = this.unitPrice;
            existing.subtotal = existing.quantity * existing.unitPrice;
        } else {
            this.items.push({
                productId: this.selectedProduct.id,
                productName: this.selectedProduct.name,
                quantity: this.quantity,
                unitPrice: this.unitPrice,
                subtotal: this.quantity * this.unitPrice
            });
        }

        this.quantity = 1;
    }

    removeItem(index: number): void {
        this.items.splice(index, 1);
    }

    get total(): number {
        return this.items.reduce(
            (acc, item) => acc + item.subtotal,
            0
        );
    }

    save(): void {

        if (!this.selectedCustomer) {
            return;
        }

        const dto: CreateSaleRequestDTO = {
            customerId: this.selectedCustomer.id,
            items: this.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            } as CreateSaleItemRequestDTO))
        };

        this.saleService.create(dto).subscribe({
            next: () => {
                this.navigation.goToList();
            }
        });
    }
}