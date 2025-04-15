import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Token } from '../../Class/token.service';
import { environment } from '../../../environments/environment';

interface LoginData {
  identifier: string;
  password: string;
}

interface User {
  id: number;
  email: string;
  name?: string;
  [key: string]: any; // For additional fields
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private Api = environment.api;
  private user: User | null = null;
  private readonly USER_KEY = 'user';

  constructor(private httpClient: HttpClient, private router: Router , private _token : Token) {
    this.loadUser();
  }

  private loadUser(): void {
    const userData = localStorage.getItem(this.USER_KEY);
    if (userData) {
      try {
        const parsedUser: User = JSON.parse(userData);
        this.setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        this.clear(); // Clear invalid data
      }
    }
  }

  register(userData: any): Observable<any> {
    return this.httpClient
      .post(`${this.Api}/register`, userData)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  verify(otp: any): Observable<any> {
    return this.httpClient
      .post(`${this.Api}/Verify`, otp)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  setUser(user: User): void {
    this.user = user;
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): User | null {
    return this.user;
  }

  isAuthenticated(): boolean {
    return !!this.getUser();
  }

  private clear(): void {
    this.user = null;
    localStorage.removeItem(this.USER_KEY);
    this._token.removeToken() ;
  }

  login(userData: LoginData): Observable<any> {
    return this.httpClient
      .post(`${this.Api}/login`, userData)
      .pipe(
        tap((response: any) => {
          if (response.user) {
            this.setUser(response.user);
          }
        }),
        catchError((err) => {
          return throwError(
            () => new Error(err.error?.message || 'Login failed')
          );
        })
      );
  }

  // Logout user
  logout(): Observable<any> {
    this.clear();
    return this.httpClient
      .post(`${this.Api}/logout`, {})
      .pipe(
        tap(() => {
          this.router.navigate(['/login']);
        }),
        catchError((error) =>
          throwError(() => new Error(error.error?.message || 'Logout failed'))
        )
      );
  }
}
