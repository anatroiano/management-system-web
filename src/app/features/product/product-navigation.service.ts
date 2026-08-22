import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductNavigationService {
  constructor(
    private router: Router
  ) {
  }

  goToList(): Promise<boolean> {
    return this.router.navigate(['/products']);
  }

  goToNew(): Promise<boolean> {
    return this.router.navigate(['/products/new']);
  }

  goToDetails(id: number | string): Promise<boolean> {
    return this.router.navigate(['/products', id, 'view']);
  }

  goToEdit(id: number | string): Promise<boolean> {
    return this.router.navigate(['/products/edit', id]);
  }

}
