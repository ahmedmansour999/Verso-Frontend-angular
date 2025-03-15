import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PhoneComponent } from './phone/phone.component';
import { HeaderService } from '../../Api/header/header.service';

@Component({
  selector: 'app-header',
  imports: [SidebarComponent, NavbarComponent, PhoneComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
 



}
