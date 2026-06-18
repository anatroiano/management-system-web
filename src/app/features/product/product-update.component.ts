import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../../core/services/product.service';
import { ProductRequestDTO } from '../../shared/models/product/product-request.dto';
import { ProductNavigationService } from './product-navigation.service';
import { NgxMaskDirective } from 'ngx-mask';
import { NavbarService } from '../../core/services/navbar.service';
import { ToastService } from '../../shared/components/toast/toast.service';

@Component({
    selector: 'app-product-update',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgxMaskDirective
    ],
    templateUrl: './product-update.component.html'
})
export class ProductUpdateComponent implements OnInit {

    form!: FormGroup;

    productId?: number;

    loading = false;

    constructor(
        private fb: FormBuilder,
        private navbarService: NavbarService,
        private route: ActivatedRoute,
        private productService: ProductService,
        private navigation: ProductNavigationService,
        private toast: ToastService
    ) { }

    ngOnInit(): void {
        this.createForm();
        const id = this.route.snapshot.paramMap.get('id');

        if (id) {
            this.productId = Number(id);
            this.loadProduct(this.productId);
        }

        this.navbarService.setConfig({
            icon: 'box-seam',
            showFilter: false,
            title: 'Produtos'
        });
    }

    createForm(): void {
        this.form = this.fb.group({
            code: ['', [Validators.required, Validators.maxLength(100)]],
            name: ['', [Validators.required, Validators.maxLength(255)]],
            description: ['', [Validators.maxLength(1000)]],
            price: [null, [Validators.required, Validators.min(0)]]
        });
    }

    loadProduct(id: number): void {
        this.loading = true;

        this.productService.findOne(id)
            .subscribe({
                next: (product) => {

                    this.form.patchValue({
                        code: product.code,
                        name: product.name,
                        description: product.description,
                        price: product.price
                    });

                    this.loading = false;
                },

                error: () => {
                    this.loading = false;
                }
            });
    }

    onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const payload: ProductRequestDTO = this.form.value;

        this.loading = true;

        if (this.productId) {
            this.productService.update(this.productId, payload)
                .subscribe({
                    next: (product) => {
                        this.toast.success('Produto alterado com sucesso!');
                        this.navigation.goToDetails(product.id);
                    },
                    error: () => {
                        this.loading = false;
                    }
                });
            return;
        }

        this.productService.create(payload)
            .subscribe({
                next: (product) => {
                    this.toast.success('Produto criado com sucesso!');
                    this.navigation.goToDetails(product.id);
                },
                error: () => {
                    this.loading = false;
                }
            });
    }

    goToList(): void {
        this.navigation.goToList();
    }

    get isEditMode(): boolean {
        return !!this.productId;
    }

    isInvalidAndTouched(field: string) {
        return this.form.get(field)?.touched && this.form.get(field)?.invalid;
    }

}