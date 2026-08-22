import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SaleNavigationService {
  constructor(
    private router: Router
  ) {
  }

  goToList(): Promise<boolean> {
    return this.router.navigate(['/sales']);
  }

  goToNew(): Promise<boolean> {
    return this.router.navigate(['/sales/new']);
  }

  goToDetails(id: number | string): Promise<boolean> {
    return this.router.navigate(['/sales', id, 'view']);
  }

}
