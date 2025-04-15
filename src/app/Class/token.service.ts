import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Token {
  private storage: Storage | null;
  


  constructor() {
    this.storage = window.localStorage ? window.localStorage : null;
  }

  getToken(): string | null {
    return this.storage ? this.storage.getItem('token') : null;
  }

  setToken(token: string): void {
      localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token')
  }
}
