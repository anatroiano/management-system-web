import {Routes} from '@angular/router';
import {ProductComponent} from "./features/product/product.component";
import {MainLayoutComponent} from './core/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [

      {
        path: 'products',
        component: ProductComponent
      }

    ]
  }
];
