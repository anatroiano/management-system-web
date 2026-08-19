import {Injectable} from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastElement?: HTMLElement;

  show(message: string, type: ToastType = 'info'): void {
    this.removeCurrentToast();

    const toast = document.createElement('div');
    toast.className = `toast app-toast toast-${type} align-items-center border-0 position-fixed top-0 end-0 m-3 show`;
    toast.style.zIndex = '9999';

    const icon = this.getIcon(type);

    toast.innerHTML = `
      <div class="d-flex align-items-center">
        <div class="toast-body">
          <div class="toast-icon">
            <i class="${icon}"></i>
          </div>
          <span class="toast-message">${message}</span>
        </div>
        <button
          type="button"
          class="btn-close me-2 m-auto"
          aria-label="Close">
        </button>
      </div>
    `;

    document.body.appendChild(toast);
    this.toastElement = toast;

    const closeButton = toast.querySelector('button');
    closeButton?.addEventListener('click', () => {
      this.removeCurrentToast();
    });

    setTimeout(() => {
      this.removeCurrentToast();
    }, 4000);
  }

  success(message: string): void {
    this.show(message, 'success');
  }

  error(message: string): void {
    this.show(message, 'error');
  }

  warning(message: string): void {
    this.show(message, 'warning');
  }

  info(message: string): void {
    this.show(message, 'info');
  }

  private getIcon(type: ToastType): string {
    switch (type) {
      case 'success':
        return 'bi bi-check-circle-fill';
      case 'error':
        return 'bi bi-x-circle-fill';
      case 'warning':
        return 'bi bi-exclamation-triangle-fill';
      case 'info':
      default:
        return 'bi bi-info-circle-fill';
    }
  }

  private removeCurrentToast(): void {
    if (this.toastElement) {
      this.toastElement.remove();
      this.toastElement = undefined;
    }
  }
}
