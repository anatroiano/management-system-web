import {HttpContext, HttpContextToken} from '@angular/common/http';

export const SUCCESS_MESSAGE = new HttpContextToken<string | null>(
  () => null
);

export const SHOW_ERROR_TOAST = new HttpContextToken<boolean>(
  () => true
);

export function successContext(message: string): HttpContext {
  return new HttpContext().set(
    SUCCESS_MESSAGE,
    message
  );
}
