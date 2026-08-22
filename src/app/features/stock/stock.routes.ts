import {Routes} from '@angular/router';
import {StockComponent} from './stock.component';
import {StockDetailComponent} from './stock-detail.component';

export const stockRoutes: Routes = [
  {
    path: '',
    component: StockComponent
  },
  {
    path: ':id/view',
    component: StockDetailComponent
  }
];
