import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-create-portfolio',
  imports: [TranslateModule, RouterLink],
  templateUrl: './create-portfolio.component.html',
  styleUrl: './create-portfolio.component.css',
})
export class CreatePortfolioComponent {}
