import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError  } from 'rxjs';


interface LoginData {
  identifier : any ;
  password : any ;
}



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

  login(userData : LoginData ):Observable<any>{
    return this.httpClient.post(`${this.Api}/login` , userData).pipe(
      catchError(err => {
        return throwError(err);
      })
    )

  }

}
