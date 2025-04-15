import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { PorfolioHeaderComponent } from './porfolio-header/porfolio-header.component';


@Component({
  selector: 'app-portfolio',
  imports: [RouterOutlet , PorfolioHeaderComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent{

  constructor(){

  }

}
