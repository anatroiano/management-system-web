import {Routes} from '@angular/router';
import {SaleComponent} from './sale.component';
import {SaleDetailComponent} from './sale-detail.component';
import {SaleUpdateComponent} from './sale-update.component';

export const saleRoutes: Routes = [
  {
    path: '',
    component: SaleComponent
  },
  {
    path: 'new',
    component: SaleUpdateComponent
  },
  {
    path: ':id/view',
    component: SaleDetailComponent
  }
];
