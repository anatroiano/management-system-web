import { Routes } from '@angular/router';
import { ProductComponent } from "./features/product/product.component";
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { LoginComponent } from './features/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { ProductDetailComponent } from './features/product/product-detail.component';
import { ProductUpdateComponent } from './features/product/product-update.component';
import { CustomerUpdateComponent } from './features/customer/customer-update.component';
import { CustomerDetailComponent } from './features/customer/customer-detail.component';
import { CustomerComponent } from './features/customer/customer.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'products',
        component: ProductComponent,
        canActivate: [authGuard]
      },
      {
        path: 'products/:id/view',
        component: ProductDetailComponent,
        canActivate: [authGuard]
      },
      {
        path: 'products/new',
        component: ProductUpdateComponent,
        canActivate: [authGuard]
      },
      {
        path: 'products/edit/:id',
        component: ProductUpdateComponent,
        canActivate: [authGuard]
      },
      {
        path: 'customers',
        component: CustomerComponent,
        canActivate: [authGuard]
      },
      {
        path: 'customers/:id/view',
        component: CustomerDetailComponent,
        canActivate: [authGuard]
      },
      {
        path: 'customers/new',
        component: CustomerUpdateComponent,
        canActivate: [authGuard]
      },
      {
        path: 'customers/edit/:id',
        component: CustomerUpdateComponent,
        canActivate: [authGuard]
      }
    ]
  }
];
