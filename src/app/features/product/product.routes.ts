import {Routes} from '@angular/router';
import {ProductComponent} from './product.component';
import {ProductDetailComponent} from './product-detail.component';
import {ProductUpdateComponent} from './product-update.component';

export const productRoutes: Routes = [
  {
    path: '',
    component: ProductComponent
  },
  {
    path: 'new',
    component: ProductUpdateComponent
  },
  {
    path: ':id/view',
    component: ProductDetailComponent
  },
  {
    path: 'edit/:id',
    component: ProductUpdateComponent
  }
];
