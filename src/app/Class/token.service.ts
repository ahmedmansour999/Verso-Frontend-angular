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
    if (this.storage) {
      this.storage.setItem('token', token);
    }
  }

  removeToken(): void {
    if (this.storage) {
      this.storage.removeItem('token');
    }
  }
}
