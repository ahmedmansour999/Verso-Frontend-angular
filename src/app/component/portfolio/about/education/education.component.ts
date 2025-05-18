import { Component } from '@angular/core';
import { UserService } from '../../../../Api/user/user.service';
import { Education } from '../../../../interface/portfolio/education';
import { Experience } from '../../../../interface/portfolio/experience';

interface IUserDetails {
  education: IEducation[];
  experience: IExperience[];
}
interface IExperience {
  id: number;
  company: string;
  role: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
}
interface IEducation {
  id: number;
  education: string;
  Specialization: string;
  start_date: string;
  end_date: string;
}

@Component({
  selector: 'app-education',
  imports: [],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css',
})
export class EducationComponent {
  user_details: IUserDetails;

  constructor(private _userService: UserService) {
    this.user_details = {
      education: [
        {
          id: 1,
          education: '',
          Specialization: '',
          start_date: '',
          end_date: '',
        },
      ],
      experience: [
        {
          id: 1,
          company: '',
          role: '',
          start_date: '',
          end_date: '',
          is_current: false,
        },
      ],
    };
  }
  ngOnInit(): void {
    this._userService.fetchUserData().subscribe((data) => {
      this.user_details = {
        education: data.portfolio.educations,
        experience: data.portfolio.experiences,
      };
    });
  }

  public get userEducation() {
    return this.user_details.education;
  }
  public get userExperience() {
    return this.user_details.experience;
  }
}
