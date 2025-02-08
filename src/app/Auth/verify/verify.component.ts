import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { LottieAnimationLoginComponent } from '../../lottie/lottie-animation-login/lottie-animation-login.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../Api/Auth/auth.service';
import { Router } from '@angular/router';
import { ShowError } from '../../helper/show-error';

@Component({
  selector: 'app-verify',
  imports: [
    LottieAnimationLoginComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css',
})
export class VerifyComponent {
  verifyOtp: FormGroup;
  otpFields = [0, 1, 2, 3, 4 , 5];
  errorMessage: string = '';
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  constructor(
    private fb: FormBuilder,
    private VerifyOtp: AuthService,
    private router: Router ,
    private showError : ShowError
  ) {
    this.verifyOtp = this.fb.group({
      otp0: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      otp1: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      otp2: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      otp3: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      otp4: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      otp5: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
    });
  }

  onInputChange(event: any, index: number): void {
    const input = event.target;
    if (input.value.length === 1 && index < this.otpFields.length - 1) {
      const nextInput = this.otpInputs.get(index + 1)?.nativeElement;
      nextInput?.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' && index > 0) {
      const prevInput = this.otpInputs.get(index - 1)?.nativeElement;
      prevInput?.focus();
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasteData = event.clipboardData
      ?.getData('text')
      .slice(0, this.otpFields.length);
    if (pasteData && /^\d+$/.test(pasteData)) {
      pasteData.split('').forEach((char, i) => {
        if (i < this.otpFields.length) {
          this.verifyOtp.get(`otp${i}`)?.setValue(char);
          if (i === this.otpFields.length - 1) {
            this.otpInputs.get(i)?.nativeElement.focus();
          }
        }
      });
    }
  }

  onSubmit(): void {
    if (this.verifyOtp.valid) {
      const otp = Object.values(this.verifyOtp.value).join('');
      this.VerifyOtp.verify({ "otp": otp }).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          if (error.error && typeof error.error === 'object') {
            const errorMessages =  this.showError.extractErrorMessages(error.error);
            this.errorMessage = errorMessages.join(' ');
          } else {
            this.errorMessage = 'An error occurred. Please try again.';
          }
        },
      });
    } else {
      this.errorMessage = 'Please enter a valid OTP.';
    }
  }

}
