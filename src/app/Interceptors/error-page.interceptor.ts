import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorPageInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 0 || error.status >= 500) {
        router.navigate(['/maintenance']);
      }
      return throwError(() => error);
    })
  );
};
