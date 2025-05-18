import { Component } from '@angular/core';
import { UserService } from '../../../../Api/user/user.service';
import { title } from 'process';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent {
  user_details :any ;
  constructor(private _userService: UserService) {
    this.user_details = {
      skills: [
        {
          id:0,
          title:""
        }
      ],
      language: [{
        id: 0,
        title : ''
      }],
    };
  }
  ngOnInit(): void {
    this._userService.fetchUserData().subscribe((data) => {
      this.user_details.language = data.portfolio.language ;
      this.user_details.skills = data.portfolio.skill;
    });
  }


  get Skills() {
    return this.user_details.skills;
  }
  get Language() {
    return this.user_details.language;
  }
}
