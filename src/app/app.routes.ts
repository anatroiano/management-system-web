import {Routes} from '@angular/router';
import {MainLayoutComponent} from './core/layout/main-layout/main-layout.component';
import {authGuard} from './core/guards/auth.guard';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes')
            .then(m => m.dashboardRoutes)
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./features/product/product.routes')
            .then(m => m.productRoutes)
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./features/customer/customer.routes')
            .then(m => m.customerRoutes)
      },
      {
        path: 'stocks',
        loadChildren: () =>
          import('./features/stock/stock.routes')
            .then(m => m.stockRoutes)
      },
      {
        path: 'sales',
        loadChildren: () =>
          import('./features/sale/sale.routes')
            .then(m => m.saleRoutes)
      }
    ]
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
