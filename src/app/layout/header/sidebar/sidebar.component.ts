import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { ModeBtnComponent } from '../../../template/Buttons/mode-btn/mode-btn.component';
import { LangBtnComponent } from '../../../template/Buttons/lang-btn/lang-btn.component';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, ModeBtnComponent, LangBtnComponent, TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  openMenu : boolean = false;

  toggleMenu(){
    this.openMenu = !this.openMenu;
  }

}
