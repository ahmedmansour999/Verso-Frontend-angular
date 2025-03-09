import { inject } from '@angular/core';
import { LoadingService } from './../Api/Loading/loading.service';
import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const loadingService = inject(LoadingService);

  let activeRequests = 0;

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
