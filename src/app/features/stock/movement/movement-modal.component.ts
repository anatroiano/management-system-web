import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovementType } from '../../../shared/enums/movement-type.enum';
import { StockResponseDTO } from '../../../shared/models/stock/stock-response.dto';
import { StockEntryRequestDTO } from '../../../shared/models/stock/stock-entry-request.dto';
import { StockExitRequestDTO } from '../../../shared/models/stock/stock-exit-request.dto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StockService } from '../../../core/services/stock.service';
import { ProductService } from '../../../core/services/product.service';
import { ProductResponseDTO } from '../../../shared/models/product/product-response.dto';
import { OnChanges, SimpleChanges } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastService } from '../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-movement-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './movement-modal.component.html',
  styleUrl: './movement-modal.component.scss'
})
export class MovementModalComponent implements OnInit, OnChanges {

  @Input() isOpen = false;
  @Input() stock?: StockResponseDTO;
  @Input() movementType?: MovementType;

  @Output() confirm = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  form!: FormGroup;
  MovementType = MovementType;

  products: ProductResponseDTO[] = [];
  productPage = 0;
  loadingProducts = false;
  hasMoreProducts = true;

  get isFreeMode(): boolean {
    return !this.stock || !this.movementType;
  }

  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private productService: ProductService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.createForm();

    if (this.isFreeMode) {
      this.loadProducts();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const opened = changes['isOpen'];

    if (opened?.currentValue === true && opened?.previousValue === false) {
      this.resetState();
    }
  }

  createForm(): void {
    this.form = this.fb.group({
      productId: [null],
      movementType: [null],
      quantity: [null, [Validators.required, Validators.min(1)]],
      reason: ['', [Validators.maxLength(255)]]
    });

    if (this.isFreeMode) {
      this.form.get('productId')!.setValidators(Validators.required);
      this.form.get('movementType')!.setValidators(Validators.required);
    }
  }

  private resetState(): void {
    this.form?.reset();

    if (this.isFreeMode) {
      this.products = [];
      this.productPage = 0;
      this.hasMoreProducts = true;
      this.loadProducts();
    }
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

  onProductScroll(event: Event): void {
    const element = event.target as HTMLElement;
    const atBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 10;

    if (atBottom) {
      this.loadProducts();
    }
  }

  onConfirm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const productId = this.stock?.productId ?? this.form.value.productId;
    const type: MovementType = this.movementType ?? this.form.value.movementType;

    const payload = {
      quantity: this.form.value.quantity,
      reason: this.form.value.reason
    };

    const request = type === MovementType.ENTRY
      ? this.stockService.addEntry(productId, payload as StockEntryRequestDTO)
      : this.stockService.addExit(productId, payload as StockExitRequestDTO);

    request.subscribe({
      next: () => {
        this.toast.success('Movimentação registrada com sucesso!');
        this.confirm.emit();
      }
    });
  }

  onClose(): void {
    this.close.emit();
  }

  isInvalidAndTouched(field: string): boolean {
    const c = this.form.get(field);
    return !!(c?.touched && c?.invalid);
  }

  get resolvedTitle(): string {
    const type = this.movementType ?? this.form.get('movementType')?.value;
    if (!type) return 'Nova movimentação';
    return type === MovementType.ENTRY ? 'Nova entrada' : 'Nova Saída';
  }
}