// portfolio-guard.service.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from '../Api/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class PortfolioGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) {}

  canActivate(): Observable<boolean> {
    return this._userService.userPortfolio().pipe(
      map((res) => {
        if (res.hasPortfolio) {
          return true;  // السماح بالوصول إذا كان لديه بورتفوليو
        } else {
          this._router.navigate(['/uspace/createportfolio']);  // إعادة التوجيه إذا لم يكن لديه بورتفوليو
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
