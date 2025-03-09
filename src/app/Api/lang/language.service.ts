import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

  private langSubject = new BehaviorSubject<string>('en') ;
  lang$ = this.langSubject.asObservable();

  setLang(lang : string):void{
    this.langSubject.next(lang);
    localStorage.setItem('locale', lang);

  }
  getLang(): string {
    return localStorage.getItem('locale') ?? 'en';
  }

}
