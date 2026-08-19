import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {SHOW_ERROR_TOAST, SUCCESS_MESSAGE} from '../context/http-context';
import {ToastService} from '../../shared/components/toast/toast.service';
import {DEFAULT_ERROR_MESSAGE, ERROR_MESSAGES} from '../error/error-messages';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private toast: ToastService) {
  }

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const successMessage = req.context.get(SUCCESS_MESSAGE);
    const showErrorToast = req.context.get(SHOW_ERROR_TOAST);
    const shouldShowSuccessToast =
      ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method) &&
      !!successMessage;

    return next.handle(req).pipe(
      tap({
        next: (event) => {
          if (shouldShowSuccessToast && event instanceof HttpResponse) {
            this.toast.success(successMessage!);
          }
        },
        error: (error: HttpErrorResponse) => {
          if (!showErrorToast) {
            return;
          }
          const code = error.error?.code;
          const message = (code && ERROR_MESSAGES[code]) || DEFAULT_ERROR_MESSAGE;
          this.toast.error(message);
        }
      })
    );
  }
}
