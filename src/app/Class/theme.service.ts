import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme: string = 'dark';

  constructor() {
    // Set dark theme as default
    if (typeof window !== 'undefined' && window.localStorage) {
      this.theme = localStorage.getItem('theme') || 'dark';
    }
    this.applyTheme();
  }


  toggleTheme(): void {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  }

  private applyTheme(): void {
    document.body.classList.toggle('dark-theme', this.theme === 'dark');
  }

  getTheme(): string {
    return this.theme;
  }
}
