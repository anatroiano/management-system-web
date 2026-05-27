import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomerNavigationService } from './customer-navigation.service';
import { CustomerService } from '../../core/services/customer.service';
import { CustomerRequestDTO } from '../../shared/models/customer/customer-request.dto';
import { documentValidator } from '../../shared/utils/document.validator';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
    selector: 'app-customer-update',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgxMaskDirective
    ],
    templateUrl: './customer-update.component.html'
})
export class CustomerUpdateComponent implements OnInit {

    form!: FormGroup;

    customerId?: number;

    loading = false;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private customerService: CustomerService,
        private navigation: CustomerNavigationService
    ) { }

    ngOnInit(): void {
        this.createForm();
        const id = this.route.snapshot.paramMap.get('id');

        if (id) {
            this.customerId = Number(id);
            this.loadCustomer(this.customerId);
        }
    }

    createForm(): void {
        this.form = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(100)]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.minLength(10), Validators.maxLength(11)]],
            document: ['', [documentValidator()]]
        });
    }

    loadCustomer(id: number): void {
        this.loading = true;

        this.customerService.findOne(id)
            .subscribe({
                next: (customer) => {
                    this.form.patchValue({
                        name: customer.name,
                        email: customer.email,
                        phone: customer.phone,
                        document: customer.document
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

        const payload: CustomerRequestDTO = this.form.value;

        this.loading = true;

        if (this.customerId) {
            this.customerService.update(this.customerId, payload)
                .subscribe({
                    next: (customer) => {
                        this.navigation.goToDetails(customer.id);
                    },
                    error: () => {
                        this.loading = false;
                    }
                });
            return;
        }

        this.customerService.create(payload)
            .subscribe({
                next: (customer) => {
                    this.navigation.goToDetails(customer.id);
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
        return !!this.customerId;
    }

}