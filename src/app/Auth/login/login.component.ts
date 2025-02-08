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
import { RouterLink } from '@angular/router';


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
  //loginForm!: FormGroup;
  errorMessage = signal('');
  event: any;

  constructor() {}

  ngOnInit(): void {
    this.loginForm.get('identifier')?.valueChanges.subscribe((value) => {
      this.updateErrorMessage(value);
    });
  }

  loginForm: FormGroup = new FormGroup({
    identifier: new FormControl(null, Validators.required),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$'),
    ]),
  });

  updateErrorMessage(identifier: string | number) {
    if (identifier === '01119710541') {
      this.errorMessage.set('not found');
    }
    console.log(identifier);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
