import { AuthService } from './../../Api/Auth/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Component,
  signal,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LottieAnimationLoginComponent } from "../../lottie/lottie-animation-login/lottie-animation-login.component";
import { Router, RouterLink } from '@angular/router';
import { Token } from '../../Class/token.service';


@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    LottieAnimationLoginComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  event: any;
  LoginMsg :string = "" ;

  constructor( private _AuthService:AuthService  , private _TokenClass : Token , private _Router : Router ) {}

  ngOnInit(): void {}

  loginForm: FormGroup = new FormGroup({
    identifier: new FormControl(null, Validators.required),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$'),
    ]),
  });



  onSubmit(): void {
    if (this.loginForm.valid) {
      const identifier = this.loginForm.value.identifier ;
      const password = this.loginForm.value.password ;
      this._AuthService.login({identifier , password}).subscribe({
        next : (res)=>{
          this.LoginMsg = res.message ;
          this._TokenClass.setToken(res.token) ;
          this._Router.navigate(['/home'])
        },
        error : (res) => {
          this.LoginMsg = res.error.message ;
        }
      })
    }
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
