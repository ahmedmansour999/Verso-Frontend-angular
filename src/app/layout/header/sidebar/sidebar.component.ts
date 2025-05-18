import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { HeaderService } from '../../../Api/header/header.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../Api/Auth/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, TranslateModule, RouterLink, RouterLinkActive ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  openMenu: boolean = false;
  showSide: boolean = true;

  constructor(
    private _header: HeaderService,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.showSide = this._header.getHeaderType() === 'sidebar';
    // Subscribe to header type changes
    this._header.headerType$.subscribe((type) => {
      this.showSide = type === 'sidebar';
    });
  }

  showNavBar() {
    this._header.toggleHeader();
    this.showSide = this._header.getHeaderType() === 'sidebar' ? true : false;
  }

  toggleMenu() {
    this.openMenu = !this.openMenu;
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this._snackBar.open('Successfully logged out', 'Close', {
          duration: 3000,
        });
      },
    });
  }
}
