import { Component } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { WelcomeComponent } from "./welcome/welcome.component";
import { SectionsComponent } from './sections/sections.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, WelcomeComponent , SectionsComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
