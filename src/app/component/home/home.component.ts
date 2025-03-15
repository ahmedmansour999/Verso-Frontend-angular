import { Component } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { WelcomeComponent } from "./welcome/welcome.component";
import { SectionsComponent } from './sections/sections.component';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, WelcomeComponent , SectionsComponent , FooterComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
