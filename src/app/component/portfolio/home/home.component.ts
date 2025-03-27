import { Component } from '@angular/core';
import { ProjectsComponent } from '../projects/projects.component';
import { AboutComponent } from '../about/about.component';
import { GalaryComponent } from '../galary/galary.component';
import { ContactComponent } from '../contact/contact.component';


@Component({
  selector: 'app-home',
  imports: [ ProjectsComponent , AboutComponent, GalaryComponent , ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
