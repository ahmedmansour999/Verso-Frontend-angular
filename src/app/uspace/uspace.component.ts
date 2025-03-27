import { Component } from '@angular/core';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-uspace',
  imports: [HeaderComponent , FooterComponent , RouterOutlet],
  templateUrl: './uspace.component.html',
  styleUrl: './uspace.component.css'
})
export class UspaceComponent {

}
