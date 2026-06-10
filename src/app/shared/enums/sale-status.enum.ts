export enum SaleStatus {
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED'
}

export function getSaleStatusName(status: SaleStatus): string {
    switch (status) {
        case SaleStatus.CANCELED:
            return 'Cancelada';
        case SaleStatus.COMPLETED:
            return 'Completa';
        default:
            return '';
    }
}

export function getSaleStatusBadge(status: SaleStatus): string {
    switch (status) {
        case SaleStatus.CANCELED:
            return 'secondary';
        case SaleStatus.COMPLETED:
            return 'success';
        default:
            return '';
    }
}