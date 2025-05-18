import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ModeBtnComponent } from '../../../template/Buttons/mode-btn/mode-btn.component';
import { LangBtnComponent } from '../../../template/Buttons/lang-btn/lang-btn.component';
import { AuthService } from '../../../Api/Auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-phone',
  imports: [
    CommonModule,
    TranslateModule,
    RouterLink,
    RouterLinkActive,
    ModeBtnComponent,
    LangBtnComponent,
  ],
  templateUrl: './phone.component.html',
  styleUrl: './phone.component.css',
})
export class PhoneComponent {
  toggle: boolean = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener('click', (event) => {
        const footer = document.querySelector('section');
        if (footer && !footer.contains(event.target as Node)) {
          this.toggle = false;
        }
      });
    }
  }

  changeToggle() {
    this.toggle = !this.toggle;
  }

  ngOnInit(): void {}
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
