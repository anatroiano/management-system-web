export interface StockResponseDTO {
  id: number;
  productId: number;
  productCode: string;
  productName: string;
  quantity: number;
  updatedAt: string;
}

export function getStockQuantityClass(stock: StockResponseDTO): string {
  if (stock.quantity <= 0) {
    return 'danger';
  }

  if (stock.quantity <= 10) {
    return 'warning';
  }

  return 'success';
}

export function getStockQuantityLabel(stock: StockResponseDTO): string {
  if (stock.quantity <= 0) {
    return 'Sem estoque';
  }

  if (stock.quantity <= 10) {
    return 'Baixo';
  }

  return 'Disponível';
}
