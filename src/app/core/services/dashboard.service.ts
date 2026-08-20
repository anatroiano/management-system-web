import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../enviroments/enviroment';
import {
  DashboardSummary,
  RecentSale,
  SalesByDay,
  StockAlert,
  TopCustomer,
  TopProduct
} from '../../features/dashboard/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly API = `${environment.apiUrl}/dashboard`;

  constructor(private http: HttpClient) {
  }

  getSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${this.API}/summary`);
  }

  getSalesByDay(): Observable<SalesByDay[]> {
    return this.http.get<SalesByDay[]>(`${this.API}/sales-by-day`);
  }

  getTopProducts(): Observable<TopProduct[]> {
    return this.http.get<TopProduct[]>(`${this.API}/top-products`);
  }

  getRecentSales(): Observable<RecentSale[]> {
    return this.http.get<RecentSale[]>(`${this.API}/recent-sales`);
  }

  getTopCustomers(): Observable<TopCustomer[]> {
    return this.http.get<TopCustomer[]>(`${this.API}/top-customers`);
  }

  getStockAlert(): Observable<StockAlert> {
    return this.http.get<StockAlert>(`${this.API}/stock-alert`);
  }
}
