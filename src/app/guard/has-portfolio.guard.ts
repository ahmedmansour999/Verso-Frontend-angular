// portfolio-guard.service.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from '../Api/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class hasPortfolioGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) {}

  canActivate(): Observable<boolean> {
    return this._userService.userPortfolio().pipe(
      map((res) => {
        if (!res.hasPortfolio) {
          return true;
        } else {
          this._router.navigate(['/portfolio']);
          return false;
        }
      }),
      catchError((error) => {
        this._router.navigate(['/']);
        return [false];
      })
    );
  }
}
