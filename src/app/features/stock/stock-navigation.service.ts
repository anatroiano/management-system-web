import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StockNavigationService {
  constructor(
    private router: Router
  ) {
  }

  goToList(): Promise<boolean> {
    return this.router.navigate(['/stocks']);
  }

  goToDetails(id: number | string): Promise<boolean> {
    return this.router.navigate(['/stocks', id, 'view']);
  }

}
