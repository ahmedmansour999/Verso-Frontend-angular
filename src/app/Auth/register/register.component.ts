import {
  AbstractControl,
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
  HostBinding,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LottieAnimationLoginComponent } from '../../lottie/lottie-animation-login/lottie-animation-login.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { dateFormatValidator } from '../../Validation/date-validate/date-validate.component';
import { AuthService } from '../../Api/Auth/auth.service';
import { Router } from '@angular/router';
import { ShowError } from '../../helper/show-error';
import { UnquiryService } from '../../Api/Auth/unquiry.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register',
  imports: [
    MatSelectModule,
    FormsModule,
    MatRadioModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    LottieAnimationLoginComponent,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent {
  errorMessage: string = '';
  event: any;
  step: number = 1;
  readonly startDate = new Date(1999, 0, 1);
  selectedValue: string | undefined;
  emailExists!: boolean | null;
  checking!: boolean | null;
  messageCheck: string = '';

  constructor(
    private registerApi: AuthService,
    private router: Router,
    private showError: ShowError,
    private checkEmailService: UnquiryService
  ) {}

  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  nextStep() {
    if (this.step < 3) {
      this.step++;
    }
  }

  prevStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  ngOnInit(): void {}

  registerForm: FormGroup = new FormGroup(
    {
      first_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z]*$'),
      ]),
      last_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z]*$'),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      gender: new FormControl(null, [Validators.required]),
      birth: new FormControl(null, [
        Validators.required,
        dateFormatValidator(),
      ]),
      specialization: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.minLength(3),
      ]),
      country: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.minLength(3),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$'),
      ]),
      password_confirmation: new FormControl(null, [Validators.required]),
    },
    { validators: this.passwordMatchValidator }
  );

  isCurrentStepValid(): boolean {
    switch (this.step) {
      case 1:
        return (
          (this.registerForm.get('first_name')?.valid ?? false) &&
          (this.registerForm.get('last_name')?.valid ?? false) &&
          (this.registerForm.get('phone')?.valid ?? false)
        );
      case 2:
        return (
          (this.registerForm.get('email')?.valid ?? false) &&
          (this.registerForm.get('birth')?.valid ?? false) &&
          (this.registerForm.get('password')?.valid ?? false) &&
          (this.registerForm.get('password_confirmation')?.valid ?? false) &&
          !this.registerForm.hasError('mismatch')
        );
      case 3:
        return (
          (this.registerForm.get('city')?.valid ?? false) &&
          (this.registerForm.get('country')?.valid ?? false) &&
          (this.registerForm.get('specialization')?.valid ?? false) &&
          (this.registerForm.get('gender')?.valid ?? false)
        );
      default:
        return false;
    }
  }

  isButtonDisabled(): boolean {
    return this.checking || this.emailExists || !this.isCurrentStepValid();
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('password_confirmation')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // YYYY-MM-DD format
  }

  checkEmailValid(event: any) {
    const emailValue = event.target.value;

    if (emailValue) {
      if (this.registerForm.get('email')?.valid) {
        this.emailExists = null;
        this.checking = true;
        this.messageCheck = ''; // Set checking message

        this.checkEmailService.checkValidEmail(emailValue).subscribe({
          next: (response: any) => {
            this.checking = false;
            this.emailExists = response === 'Email already exists';
            this.messageCheck = this.emailExists
              ? 'Email already exists'
              : 'Email is available'; // Update message
          },
          error: (err) => {
            this.checking = false;
            this.emailExists = null;
            this.messageCheck = '';
          },
        });
      } else {
        this.emailExists = null;
        this.checking = false;
        this.messageCheck = ''; // Reset message if email is invalid
      }
    } else {
      this.messageCheck = ''; // Reset message if email field is empty
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formValue = {
        ...this.registerForm.value,
        birth: this.formatDate(this.registerForm.value.birth),
      };
      this.registerApi.register(formValue).subscribe({
        next: () => {
          sessionStorage.setItem('register_user', formValue);
          this.router.navigate(['/verify']);
        },
        error: (error) => {
          if (error.error && typeof error.error === 'object') {
            const errorMessages = this.showError.extractErrorMessages(
              error.error
            );
            this.errorMessage = errorMessages.join(' ');
          } else {
            this.errorMessage = 'An error occurred. Please try again.';
          }
        },
      });
    }
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

}
