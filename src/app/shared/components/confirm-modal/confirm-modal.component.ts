import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-modal.component.html'
})
export class ConfirmModalComponent {

  @Input() isOpen = false;

  @Input() title = 'Confirmação';

  @Input() message = 'Deseja continuar?';

  @Input() confirmText = 'Confirmar';

  @Input() cancelText = 'Cancelar';

  @Input() confirmButtonClass = 'btn-danger';

  @Output() confirm = new EventEmitter<void>();

  @Output() close = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onClose(): void {
    this.close.emit();
  }

}