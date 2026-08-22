import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerNavigationService {
  constructor(
    private router: Router
  ) {
  }

  goToList(): Promise<boolean> {
    return this.router.navigate(['/customers']);
  }

  goToNew(): Promise<boolean> {
    return this.router.navigate(['/customers/new']);
  }

  goToDetails(id: number | string): Promise<boolean> {
    return this.router.navigate(['/customers', id, 'view']);
  }

  goToEdit(id: number | string): Promise<boolean> {
    return this.router.navigate(['/customers/edit', id]);
  }

}
