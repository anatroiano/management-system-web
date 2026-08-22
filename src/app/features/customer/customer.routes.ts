import {Routes} from '@angular/router';
import {CustomerComponent} from './customer.component';
import {CustomerDetailComponent} from './customer-detail.component';
import {CustomerUpdateComponent} from './customer-update.component';

export const customerRoutes: Routes = [
  {
    path: '',
    component: CustomerComponent
  },
  {
    path: 'new',
    component: CustomerUpdateComponent
  },
  {
    path: ':id/view',
    component: CustomerDetailComponent
  },
  {
    path: 'edit/:id',
    component: CustomerUpdateComponent
  }
];
