import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PRODUCT_ROUTES } from '../../shared/constants/product-routes';
import { STOCK_ROUTES } from '../../shared/constants/stock-routes';

@Injectable({
  providedIn: 'root'
})
export class StockNavigationService {
  constructor(
    private router: Router
  ) {}

  goToList(): Promise<boolean> {
    return this.router.navigate([
      STOCK_ROUTES.LIST
    ]);
  }

  goToNew(): Promise<boolean> {
    return this.router.navigate([
      STOCK_ROUTES.NEW
    ]);
  }

  goToDetails(id: number | string): Promise<boolean> {
    return this.router.navigate([
      STOCK_ROUTES.DETAILS(id)
    ]);
  }

  goToEdit(id: number | string): Promise<boolean> {
    return this.router.navigate([
      STOCK_ROUTES.EDIT(id)
    ]);
  }

}