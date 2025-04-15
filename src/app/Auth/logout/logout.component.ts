import { Component } from '@angular/core';
import { Token } from '../../Class/token.service';
import { AuthService } from '../../Api/Auth/auth.service';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor( private _authService : AuthService){
    this._authService.logout();
  }

}
