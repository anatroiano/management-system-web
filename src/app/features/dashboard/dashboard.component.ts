import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CommonModule, CurrencyPipe, DatePipe} from '@angular/common';
import {RouterModule} from '@angular/router';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip
} from 'chart.js';
import {DashboardService} from '../../core/services/dashboard.service';
import {NavbarService} from '../../core/services/navbar.service';
import {DashboardSummary, RecentSale, SalesByDay, StockAlert, TopCustomer, TopProduct} from './dashboard.model';
import {getSaleStatusBadge, getSaleStatusName, SaleStatus} from '../../shared/enums/sale-status.enum';
import {SaleNavigationService} from '../sale/sale-navigation.service';
import {CustomerNavigationService} from '../customer/customer-navigation.service';

Chart.register(
  LineController, LineElement, PointElement,
  LinearScale, CategoryScale,
  BarController, BarElement,
  Tooltip, Legend, Filler
);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('salesByDayCanvas') salesByDayCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('topProductsCanvas') topProductsCanvasRef!: ElementRef<HTMLCanvasElement>;

  private salesChart: Chart | null = null;
  private productsChart: Chart | null = null;

  summary: DashboardSummary | null = null;
  summaryLoading = true;
  summaryError = false;

  salesByDay: SalesByDay[] = [];
  salesByDayLoading = true;
  salesByDayError = false;

  topProducts: TopProduct[] = [];
  topProductsLoading = true;
  topProductsError = false;

  recentSales: RecentSale[] = [];
  recentSalesLoading = true;
  recentSalesError = false;

  topCustomers: TopCustomer[] = [];
  topCustomersLoading = true;
  topCustomersError = false;

  stockAlert: StockAlert | null = null;
  stockAlertLoading = true;
  stockAlertError = false;

  getSaleStatusName = getSaleStatusName;
  getSaleStatusBadge = getSaleStatusBadge;

  private viewReady = false;

  constructor(
    private dashboardService: DashboardService,
    private navbarService: NavbarService,
    private saleNavigationService: SaleNavigationService,
    private customerNavigationService: CustomerNavigationService
  ) {
  }

  ngOnInit(): void {
    this.navbarService.setConfig({
      icon: 'speedometer2',
      showFilter: false,
      title: 'Dashboard'
    });

    this.loadSummary();
    this.loadSalesByDay();
    this.loadTopProducts();
    this.loadRecentSales();
    this.loadTopCustomers();
    this.loadStockAlert();
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    if (this.salesByDay.length) this.renderSalesChart();
    if (this.topProducts.length) this.renderProductsChart();
  }

  ngOnDestroy(): void {
    this.salesChart?.destroy();
    this.productsChart?.destroy();
  }

  loadSummary(): void {
    this.summaryLoading = true;
    this.summaryError = false;
    this.dashboardService.getSummary().subscribe({
      next: data => {
        this.summary = data;
        this.summaryLoading = false;
      },
      error: () => {
        this.summaryLoading = false;
        this.summaryError = true;
      }
    });
  }

  loadSalesByDay(): void {
    this.salesByDayLoading = true;
    this.salesByDayError = false;
    this.salesChart?.destroy();
    this.salesChart = null;
    this.dashboardService.getSalesByDay().subscribe({
      next: data => {
        this.salesByDay = data;
        this.salesByDayLoading = false;
        if (this.viewReady) this.renderSalesChart();
      },
      error: () => {
        this.salesByDayLoading = false;
        this.salesByDayError = true;
      }
    });
  }

  loadTopProducts(): void {
    this.topProductsLoading = true;
    this.topProductsError = false;
    this.productsChart?.destroy();
    this.productsChart = null;
    this.dashboardService.getTopProducts().subscribe({
      next: data => {
        this.topProducts = data;
        this.topProductsLoading = false;
        if (this.viewReady) this.renderProductsChart();
      },
      error: () => {
        this.topProductsLoading = false;
        this.topProductsError = true;
      }
    });
  }

  loadRecentSales(): void {
    this.recentSalesLoading = true;
    this.recentSalesError = false;
    this.dashboardService.getRecentSales().subscribe({
      next: data => {
        this.recentSales = data;
        this.recentSalesLoading = false;
      },
      error: () => {
        this.recentSalesLoading = false;
        this.recentSalesError = true;
      }
    });
  }

  loadTopCustomers(): void {
    this.topCustomersLoading = true;
    this.topCustomersError = false;
    this.dashboardService.getTopCustomers().subscribe({
      next: data => {
        this.topCustomers = data;
        this.topCustomersLoading = false;
      },
      error: () => {
        this.topCustomersLoading = false;
        this.topCustomersError = true;
      }
    });
  }

  loadStockAlert(): void {
    this.stockAlertLoading = true;
    this.stockAlertError = false;
    this.dashboardService.getStockAlert().subscribe({
      next: data => {
        this.stockAlert = data;
        this.stockAlertLoading = false;
      },
      error: () => {
        this.stockAlertLoading = false;
        this.stockAlertError = true;
      }
    });
  }

  private renderSalesChart(): void {
    if (!this.salesByDayCanvasRef) return;
    this.salesChart?.destroy();

    const labels = this.salesByDay.map(d => this.formatDate(d.date));
    const values = this.salesByDay.map(d => d.totalAmount);

    this.salesChart = new Chart(this.salesByDayCanvasRef.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Receita (R$)',
          data: values,
          fill: true,
          tension: 0.4,
          borderColor: '#1554c0',
          backgroundColor: 'rgba(21, 84, 192, 0.08)',
          pointBackgroundColor: '#1554c0',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {display: false},
          tooltip: {
            callbacks: {
              label: ctx => `R$ ${(ctx.parsed.y as number).toLocaleString('pt-BR', {minimumFractionDigits: 2})}`
            }
          }
        },
        scales: {
          x: {
            grid: {display: false},
            ticks: {color: '#64748b', font: {size: 11}, maxTicksLimit: 10}
          },
          y: {
            grid: {color: 'rgba(219,228,240,0.5)'},
            ticks: {
              color: '#64748b',
              font: {size: 11},
              callback: (val) => `R$ ${(val as number).toLocaleString('pt-BR')}`
            }
          }
        }
      }
    });
  }

  private renderProductsChart(): void {
    if (!this.topProductsCanvasRef) return;
    this.productsChart?.destroy();

    const labels = this.topProducts.map(p => p.productName);
    const values = this.topProducts.map(p => p.totalQuantitySold);

    this.productsChart = new Chart(this.topProductsCanvasRef.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Qtd. vendida',
          data: values,
          backgroundColor: [
            'rgba(21,  84, 192, 0.75)',
            'rgba(18, 181, 208, 0.75)',
            'rgba(124, 58, 237, 0.75)',
            'rgba(  5,150, 105, 0.75)',
            'rgba(217, 119,  6, 0.75)'
          ],
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {display: false},
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.parsed.x} unidades`
            }
          }
        },
        scales: {
          x: {
            grid: {color: 'rgba(219,228,240,0.5)'},
            ticks: {color: '#64748b', font: {size: 11}}
          },
          y: {
            grid: {display: false},
            ticks: {color: '#64748b', font: {size: 12, weight: 600}}
          }
        }
      }
    });
  }

  getSaleStatusAsEnum(status: string): SaleStatus {
    return status as SaleStatus;
  }

  formatDate(dateStr: string): string {
    const parts = dateStr.split('-');
    if (parts.length === 3) return `${parts[2]}/${parts[1]}`;
    return dateStr;
  }

  goToSaleDetails(sale: RecentSale): void {
    this.saleNavigationService.goToDetails(sale.id);
  }

  goToCustomerDetails(customer: TopCustomer): void {
    this.customerNavigationService.goToDetails(customer.id);
  }
}
