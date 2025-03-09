import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnquiryService {

  Api = 'http://localhost:8000/api' ;


  constructor(private httpClient : HttpClient) {}

  public checkValidEmail(email : any):Observable<any>{
    return this.httpClient.post(`${this.Api}/checkMail` , {"email" : email})
  }

}
