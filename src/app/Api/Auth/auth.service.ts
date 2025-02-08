import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  Api = 'http://localhost:8000/api' ;

  constructor( private httpClient : HttpClient ) {}

  register(userData : any):Observable<any>{
    return this.httpClient.post(`${this.Api}/register`,userData , {withCredentials : true}).pipe(
      catchError(error =>{
        return throwError(error);
      })
    );
  };

  verify(otp : any): Observable<any>{
    return this.httpClient.post(`${this.Api}/Verify` , otp , {withCredentials : true}).pipe(
      catchError(error =>{
        return throwError(error);
      })
    )
  }


}
