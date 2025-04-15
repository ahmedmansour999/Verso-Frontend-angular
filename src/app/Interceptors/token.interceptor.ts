import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Token } from '../Class/token.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(Token);

  // Skip token for OpenStreetMap requests
  if (req.url.includes('nominatim.openstreetmap.org')  ) {
    return next(req);
  }



  // Add authorization token if available
  const token = tokenService.getToken();
  if (token) {
     req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return next(req);
  }

  return next(req);
};
