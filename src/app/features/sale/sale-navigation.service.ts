import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {SALE_ROUTES} from '../../shared/constants/sale-routes';

@Injectable({
  providedIn: 'root'
})
export class SaleNavigationService {
  constructor(
    private router: Router
  ) {
  }

  goToList(): Promise<boolean> {
    return this.router.navigate([
      SALE_ROUTES.LIST
    ]);
  }

  goToNew(): Promise<boolean> {
    return this.router.navigate([
      SALE_ROUTES.NEW
    ]);
  }

  goToDetails(id: number | string): Promise<boolean> {
    return this.router.navigate([
      SALE_ROUTES.DETAILS(id)
    ]);
  }

}
