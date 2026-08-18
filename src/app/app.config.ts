import {ApplicationConfig} from '@angular/core';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';

import {routes} from './app.routes';
import {authInterceptor} from './core/interceptors/auth.interceptor';
import {provideRouter} from '@angular/router';
import {provideEnvironmentNgxMask} from 'ngx-mask';
import {HttpInterceptorService} from './core/interceptors/http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor]),
      withInterceptorsFromDi()
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    provideEnvironmentNgxMask()
  ]
};
