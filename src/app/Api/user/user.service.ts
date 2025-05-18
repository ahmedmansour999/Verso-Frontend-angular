import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, catchError, BehaviorSubject, tap, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly api = environment.api;
  private userData$ = new BehaviorSubject<any>(null) ;


  constructor(private _http: HttpClient) {}

  AllUser(): Observable<any> {
    return this._http.get(`${this.api}/users`).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }
  updateUser(data : any):Observable<any>{
    return this._http.post(`${this.api}/editUser` , data).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }
  oneUser($id: number): Observable<any> {
    return this._http.get(`${this.api}/users/${$id}`).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  userPortfolio():Observable<any> {
    return this._http.get(`${this.api}/users/portfolio/check`).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  currentUser():Observable<any>{
    return this._http.get(`${this.api}/users/current`).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  fetchUserData():Observable<any>{
    if (!this.userData$.value) {
      this._http.get(`${this.api}/users/current`).pipe(
        tap((data)=>{
          this.userData$.next(data);
        }) ,
        shareReplay(1)
      ).subscribe();
    }
    return this.userData$.asObservable() ;
  }




}
