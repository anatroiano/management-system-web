import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StockService} from './stock.service';
import {
  getStockQuantityClass,
  getStockQuantityLabel,
  StockResponseDTO
} from '../../shared/models/stock/stock-response.dto';
import {StockMovementResponseDTO} from '../../shared/models/stock/stock-movement-response.dto';
import {getMovementTypeBadge, getMovementTypeName} from '../../shared/enums/movement-type.enum';
import {PaginationComponent} from '../../shared/components/pagination/pagination.component';
import {NavbarService} from '../../core/services/navbar.service';
import {StockNavigationService} from './stock-navigation.service';

@Component({
  selector: 'app-stock-detail',
  standalone: true,
  imports: [
    CommonModule,
    PaginationComponent
  ],
  templateUrl: './stock-detail.component.html',
  styleUrl: './stock-detail.component.scss',
})

export class StockDetailComponent implements OnInit {

  stock!: StockResponseDTO;

  movements: StockMovementResponseDTO[] = [];

  loading = false;

  currentPage = 0;

  totalPages = 0;

  productId!: number;

  getMovementTypeName = getMovementTypeName;
  getMovementTypeBadge = getMovementTypeBadge;
  getStockQuantityClass = getStockQuantityClass;
  getStockQuantityLabel = getStockQuantityLabel;

  constructor(
    private route: ActivatedRoute,
    private stockService: StockService,
    private navigation: StockNavigationService,
    private navbarService: NavbarService
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productId = Number(id);
      this.loadStock();
      this.loadHistory();
    }
  }

  loadStock(): void {

    this.stockService.findByProduct(this.productId)
      .subscribe({
        next: (response) => {
          this.stock = response;

          this.navbarService.setConfig({
            icon: 'boxes',
            showFilter: false,
            title: 'Detalhes do estoque'
          });
        },

        error: (err) => {
          console.error(
            'Erro ao buscar estoque',
            err
          );
        }
      });
  }

  loadHistory(page: number = 0): void {
    this.loading = true;

    this.stockService.getHistory(
      this.productId,
      page,
      10
    ).subscribe({

      next: (response) => {
        this.movements = response.content;
        this.currentPage = response.number;
        this.totalPages = response.totalPages;
        this.loading = false;
      },

      error: (err) => {
        console.error('Erro ao buscar histórico', err);
        this.loading = false;
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadHistory(page);
  }

  goToList(): void {
    this.navigation.goToList();
  }
}
