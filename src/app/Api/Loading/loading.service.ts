import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }


  private LoadingState = new BehaviorSubject<boolean>(false) ;


  public isLoading$ = this.LoadingState.asObservable();

  show(){
    this.LoadingState.next(true);
  }

  hide(){
    this.LoadingState.next(false);
  }




}
