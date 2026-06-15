export enum MovementType {
    ENTRY = 'ENTRY',
    MANUAL_EXIT = 'MANUAL_EXIT',
    SALE_EXIT = 'SALE_EXIT'
}

export function getMovementTypeName(type: MovementType): string {
    switch (type) {
        case MovementType.ENTRY:
            return 'Entrada';
        case MovementType.MANUAL_EXIT:
            return 'Saída manual';
        case MovementType.SALE_EXIT:
            return 'Saída por venda';
        default:
            return '';
    }
}

export function getMovementTypeBadge(type: MovementType): string {
    switch (type) {
        case MovementType.ENTRY:
            return 'success';
        case MovementType.MANUAL_EXIT:
            return 'danger';
        case MovementType.SALE_EXIT:
            return 'info';
        default:
            return '';
    }
}