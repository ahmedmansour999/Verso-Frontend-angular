import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ModeBtnComponent } from '../../../template/Buttons/mode-btn/mode-btn.component';
import { LangBtnComponent } from '../../../template/Buttons/lang-btn/lang-btn.component';
import { HeaderService } from '../../../Api/header/header.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule , TranslateModule , RouterLink , RouterLinkActive , ModeBtnComponent, LangBtnComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  toggle: boolean = false;
  showSetting : boolean = false ;
  showNav : boolean = true ;

  constructor(@Inject(PLATFORM_ID) private platformId: Object , private _header : HeaderService ) {
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener('click', (event) => {
        const footer = document.querySelector('section');
        if (footer && !footer.contains(event.target as Node)) {
          this.toggle = false;
        }
      });
    }
  }

  ngOnInit(): void {
    this.showNav = this._header.getHeaderType() === 'navbar';
    // Subscribe to header type changes
    this._header.headerType$.subscribe(type => {
      this.showNav = type === 'navbar';
    });
  }

  changeToggle() {
    this.toggle = !this.toggle;
  }

  changeSetting(){
    this.showSetting = !this.showSetting ;
  }

  showSideBar(){
    this._header.toggleHeader() ;
    this.showNav = this._header.getHeaderType() === "navbar" ? true : false ;
    console.log("showNav" , this.showNav)
  }

}
