import { inject } from '@angular/core';
import { LoadingService } from './../Api/Loading/loading.service';
import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { finalize } from 'rxjs';

let activeRequests = 0;

export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const loadingService = inject(LoadingService);


  if (activeRequests === 0) {
    loadingService.show() ;
  }

  activeRequests++;

  return next(req).pipe(
    finalize(() => {
      activeRequests--;
      if (activeRequests === 0) {
        loadingService.hide() ;
      }
    })
  )
};
