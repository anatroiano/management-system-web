import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CUSTOMER_ROUTES} from '../../shared/constants/customer-routes';

@Injectable({
  providedIn: 'root'
})
export class CustomerNavigationService {
  constructor(
    private router: Router
  ) {
  }

  goToList(): Promise<boolean> {
    return this.router.navigate([
      CUSTOMER_ROUTES.LIST
    ]);
  }

  goToNew(): Promise<boolean> {
    return this.router.navigate([
      CUSTOMER_ROUTES.NEW
    ]);
  }

  goToDetails(id: number | string): Promise<boolean> {
    return this.router.navigate([
      CUSTOMER_ROUTES.DETAILS(id)
    ]);
  }

  goToEdit(id: number | string): Promise<boolean> {
    return this.router.navigate([
      CUSTOMER_ROUTES.EDIT(id)
    ]);
  }

}
