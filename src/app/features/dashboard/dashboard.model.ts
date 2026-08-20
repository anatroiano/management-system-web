export interface DashboardSummary {
  totalCustomers: number;
  totalProducts: number;
  salesToday: number;
  currentMonthRevenue: number;
}

export interface SalesByDay {
  date: string;
  salesCount: number;
  totalAmount: number;
}

export interface TopProduct {
  productName: string;
  totalQuantitySold: number;
  totalRevenue: number;
}

export interface RecentSale {
  id: number;
  customerName: string;
  totalAmount: number;
  createdAt: string;
  status: string;
}

export interface TopCustomer {
  id: number;
  customerName: string;
  purchaseCount: number;
  totalSpent: number;
}

export interface StockAlert {
  criticalProductsCount: number;
}
