import { Component } from '@angular/core';
import { CreatePortfolioComponent } from './create-portfolio/create-portfolio.component';
import { CompaniesComponent } from './companies/companies.component';

@Component({
  selector: 'app-feacture',
  imports: [CreatePortfolioComponent , CompaniesComponent],
  templateUrl: './feacture.component.html',
  styleUrl: './feacture.component.css'
})
export class FeactureComponent {

}
