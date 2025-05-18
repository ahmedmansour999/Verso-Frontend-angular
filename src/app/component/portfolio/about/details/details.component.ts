import { Component } from '@angular/core';
import { UserService } from '../../../../Api/user/user.service';

interface IPortfolioDetails {
  graduate: number;
  experienceYear: number;
  projectNumber: string;
}

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  portfolioDetails: IPortfolioDetails;
  constructor(private _userService: UserService) {
    this.portfolioDetails = {
      graduate: 0,
      experienceYear: 0,
      projectNumber: '0',
    };
  }

  ngOnInit(): void {
    this._userService.fetchUserData().subscribe((data) => {
      const currentYear = new Date().getFullYear();
      const graduateYear = parseInt(data.portfolio.graduate.split('-')[1]);
      const experienceOfYear = currentYear - graduateYear;

      const numberOfProject = data.portfolio.projects?.length || 0;

      this.portfolioDetails = {
        graduate: graduateYear,
        experienceYear: experienceOfYear,
        projectNumber: numberOfProject,
      };
    });
  }
}
