import { Component } from '@angular/core';
import { EducationComponent } from './education/education.component';
import { DetailsComponent } from './details/details.component';
import { SkillsComponent } from './skills/skills.component';
import { InfoComponent } from '../info/info.component';

@Component({
  selector: 'app-about',
  imports: [EducationComponent , DetailsComponent , SkillsComponent , InfoComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
