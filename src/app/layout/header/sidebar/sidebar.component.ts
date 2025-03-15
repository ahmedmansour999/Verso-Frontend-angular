import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { ModeBtnComponent } from '../../../template/Buttons/mode-btn/mode-btn.component';
import { LangBtnComponent } from '../../../template/Buttons/lang-btn/lang-btn.component';
import { HeaderService } from '../../../Api/header/header.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  openMenu : boolean = false;
  showSide : boolean = true ;

  constructor( private _header : HeaderService){}



  ngOnInit(): void {
    this.showSide = this._header.getHeaderType() === 'sidebar';
    // Subscribe to header type changes
    this._header.headerType$.subscribe(type => {
      this.showSide = type === 'sidebar';
    });
  }

  showNavBar(){
    this._header.toggleHeader() ;
    this.showSide = this._header.getHeaderType() === "sidebar" ? true : false ;
  }


  toggleMenu(){
    this.openMenu = !this.openMenu;
  }


}
