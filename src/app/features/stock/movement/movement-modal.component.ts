import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovementType } from '../../../shared/enums/movement-type.enum';
import { StockResponseDTO } from '../../../shared/models/stock/stock-response.dto';
import { StockEntryRequestDTO } from '../../../shared/models/stock/stock-entry-request.dto';
import { StockExitRequestDTO } from '../../../shared/models/stock/stock-exit-request.dto';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { StockService } from '../../../core/services/stock.service';

@Component({
  selector: 'app-movement-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './movement-modal.component.html',
  styleUrl: './movement-modal.component.scss'
})
export class MovementModalComponent {

  @Input() isOpen = false;

  @Input() stock!: StockResponseDTO;

  @Input() movementType!: MovementType;

  @Output() confirm = new EventEmitter<void>();

  @Output() close = new EventEmitter<void>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private stockService: StockService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({

      quantity: [
        null,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      reason: [
        '',
        [
          Validators.required,
          Validators.maxLength(255)
        ]
      ]
    });
  }

  onConfirm(): void {

    const payload = {
      quantity: this.form.get('quantity')?.value,
      reason: this.form.get('reason')?.value
    }

    const request = this.movementType === MovementType.ENTRY

      ? this.stockService.addEntry(
        this.stock.productId,
        payload as StockEntryRequestDTO
      )

      : this.stockService.addExit(
        this.stock.productId,
        payload as StockExitRequestDTO
      );

    request.subscribe({
      next: () => {
        this.confirm.emit();
      }
    });
  }

  onClose(): void {
    this.close.emit();
  }

  isInvalidAndTouched(field: string) {
    return this.form.get(field)?.touched && this.form.get(field)?.invalid;
  }

}