import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { SaleService } from '../../core/services/sale.service';
import { ProductService } from '../../core/services/product.service';
import { CustomerService } from '../../core/services/customer.service';
import { SaleNavigationService } from './sale-navigation.service';
import { NavbarService } from '../../core/services/navbar.service';

import { CreateSaleRequestDTO } from '../../shared/models/sale/create-sale-request.dto';
import { CreateSaleItemRequestDTO } from '../../shared/models/sale/create-sale-item-request.dto';
import { SaleItemResponseDTO } from '../../shared/models/sale/sale-item-response.dto';
import { CustomerResponseDTO } from '../../shared/models/customer/customer-response.dto';
import { ProductResponseDTO } from '../../shared/models/product/product-response.dto';
import { ToastService } from '../../shared/components/toast/toast.service';

@Component({
    selector: 'app-sale-create',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, CurrencyPipe, NgSelectModule],
    templateUrl: './sale-update.component.html'
})
export class SaleUpdateComponent implements OnInit {

    form!: FormGroup;
    itemForm!: FormGroup;

    customers: CustomerResponseDTO[] = [];
    products: ProductResponseDTO[] = [];

    customerPage = 0;
    productPage = 0;

    loadingCustomers = false;
    loadingProducts = false;

    hasMoreCustomers = true;
    hasMoreProducts = true;

    items: SaleItemResponseDTO[] = [];

    loading = false;

    constructor(
        private fb: FormBuilder,
        private saleService: SaleService,
        private navigation: SaleNavigationService,
        private productService: ProductService,
        private customerService: CustomerService,
        private navbarService: NavbarService,
        private toast: ToastService
    ) { }

    ngOnInit(): void {
        this.navbarService.setConfig({
            icon: 'cart',
            showFilter: false,
            title: 'Vendas'
        });

        this.createForms();
        this.loadCustomers();
        this.loadProducts();
    }

    createForms(): void {
        this.form = this.fb.group({
            customerId: [null, Validators.required]
        });

        this.itemForm = this.fb.group({
            product: [null, Validators.required],
            quantity: [1, [Validators.required, Validators.min(1)]],
            unitPrice: [null, [Validators.required, Validators.min(0)]]
        });

        this.itemForm.get('product')!.valueChanges.subscribe((product: ProductResponseDTO | null) => {
            if (product) {
                this.itemForm.get('unitPrice')!.setValue(product.price);
            }
        });
    }

    loadCustomers(): void {
        if (this.loadingCustomers || !this.hasMoreCustomers) return;

        this.loadingCustomers = true;

        this.customerService.findAll(this.customerPage, 10).subscribe({
            next: (response: any) => {
                this.customers = [...this.customers, ...response.content];
                this.hasMoreCustomers = !response.last;
                this.customerPage++;
                this.loadingCustomers = false;
            }
        });
    }

    loadProducts(): void {
        if (this.loadingProducts || !this.hasMoreProducts) return;

        this.loadingProducts = true;

        this.productService.findAll(this.productPage, 10).subscribe({
            next: (response: any) => {
                this.products = [...this.products, ...response.content];
                this.hasMoreProducts = !response.last;
                this.productPage++;
                this.loadingProducts = false;
            }
        });
    }

    addItem(): void {
        if (this.itemForm.invalid) {
            this.itemForm.markAllAsTouched();
            return;
        }

        const { product, quantity, unitPrice } = this.itemForm.value;

        const existing = this.items.find(i => i.productId === product.id);

        if (existing) {
            existing.quantity += quantity;
            existing.unitPrice = unitPrice;
            existing.subtotal = existing.quantity * existing.unitPrice;
        } else {
            this.items.push({
                productId: product.id,
                productName: product.name,
                quantity,
                unitPrice,
                subtotal: quantity * unitPrice
            });
        }

        this.itemForm.reset({ quantity: 1 });
    }

    removeItem(index: number): void {
        this.items.splice(index, 1);
    }

    get total(): number {
        return this.items.reduce((acc, item) => acc + item.subtotal, 0);
    }

    onSubmit(): void {
        if (this.form.invalid || this.items.length === 0) {
            this.form.markAllAsTouched();
            return;
        }

        const dto: CreateSaleRequestDTO = {
            customerId: this.form.value.customerId,
            items: this.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            } as CreateSaleItemRequestDTO))
        };

        this.loading = true;

        this.saleService.create(dto).subscribe({
            next: () => {
                this.toast.success('Venda criada com sucesso!');
                this.navigation.goToList();
            },
            error: () => { this.loading = false; }
        });
    }

    goToList(): void {
        this.navigation.goToList();
    }

    isInvalidAndTouched(field: string, formGroup: FormGroup = this.form): boolean {
        const c = formGroup.get(field);
        return !!(c?.touched && c?.invalid);
    }
}