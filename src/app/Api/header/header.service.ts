import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private headerType: string = 'navbar';
  private headerTypeSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.headerType);
  headerType$: Observable<string> = this.headerTypeSubject.asObservable();

  constructor() {
    this.useHeader();
  }

  private useHeader(): void {
    const storedType = localStorage.getItem('headerType');
    this.headerType = storedType ? storedType : 'navbar';
    this.headerTypeSubject.next(this.headerType);
  }

  getHeaderType(): string {
    return this.headerType;
  }

  setHeaderType(type: 'navbar' | 'sidebar'): void {
    this.headerType = type;
    localStorage.setItem('headerType', type);
    this.headerTypeSubject.next(this.headerType);
  }

  toggleHeader(): void {
    this.headerType = this.headerType === 'navbar' ? 'sidebar' : 'navbar';
    localStorage.setItem('headerType', this.headerType);
    this.headerTypeSubject.next(this.headerType);
  }
  
}
