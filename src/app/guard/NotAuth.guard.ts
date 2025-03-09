import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Token } from '../Class/token.service';

export const NoAuthGuard: CanActivateFn = (route, state) => {
  const _Token = inject(Token);
  const _Router = inject(Router);

  const isAuthenticated = _Token.getToken();

  if (!isAuthenticated) {
    return true;
  } else {
    _Router.navigate(['/home']);
    return false;
  }


};
