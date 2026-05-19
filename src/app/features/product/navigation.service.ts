import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PRODUCT_ROUTES } from '../../shared/constants/product-routes';

@Injectable({
  providedIn: 'root'
})
export class ProductNavigationService {
  constructor(
    private router: Router
  ) {}

  goToList(): Promise<boolean> {
    return this.router.navigate([
      PRODUCT_ROUTES.LIST
    ]);
  }

  goToNew(): Promise<boolean> {
    return this.router.navigate([
      PRODUCT_ROUTES.NEW
    ]);
  }

  goToDetails(id: number | string): Promise<boolean> {
    return this.router.navigate([
      PRODUCT_ROUTES.DETAILS(id)
    ]);
  }

  goToEdit(id: number | string): Promise<boolean> {
    return this.router.navigate([
      PRODUCT_ROUTES.EDIT(id)
    ]);
  }

}