import {Component, OnInit} from '@angular/core';
import {CommonModule, CurrencyPipe, DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {SaleService} from './sale.service';
import {SaleResponseDTO} from '../../shared/models/sale/sale-response.dto';
import {NavbarService} from '../../core/services/navbar.service';
import {SaleNavigationService} from './sale-navigation.service';
import {getSaleStatusBadge, getSaleStatusName} from '../../shared/enums/sale-status.enum';

@Component({
  selector: 'app-sale-detail',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './sale-detail.component.html'
})
export class SaleDetailComponent implements OnInit {

  sale?: SaleResponseDTO;

  constructor(
    private route: ActivatedRoute,
    private saleService: SaleService,
    private navbarService: NavbarService,
    private navigation: SaleNavigationService,
  ) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.saleService.findOne(id).subscribe({
      next: response => {
        this.sale = response;

        this.navbarService.setConfig({
          icon: 'cart',
          showFilter: false,
          title: 'Vendas'
        });
      }
    });
  }

  goToList(): void {
    this.navigation.goToList();
  }

  protected readonly getSaleStatusBadge = getSaleStatusBadge;
  protected readonly getSaleStatusName = getSaleStatusName;
}
