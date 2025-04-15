import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Token } from '../Class/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const route = inject(Router);
  const token = inject(Token) ;

  return next(req).pipe(
    catchError((e) => {
      if (e.status === 401) {
        token.removeToken() ;
        route.navigate(['/logout']);
      }
      return throwError(() => e);
    })
  );
};

