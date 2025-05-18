import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormGroup,
  Validators,
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { dateFormatValidator } from '../../../../Validation/date-validate/date-validate.component';
import { UserService } from '../../../../Api/user/user.service';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-profile-home',
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
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class ProfileHomeComponent implements OnInit {
  formData: FormGroup;
  isLoading = false;
  hidePassword = true;
  readonly startDate = new Date(1990, 0, 1);
  userData: any = {};
  private fb = inject(FormBuilder); // Modern injection approach

  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Initialize with empty form structure
    this.formData = this.createEmptyForm();
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  createEmptyForm(): FormGroup {
    return this.fb.group(
      {
        first_name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern('^[a-zA-Z ]*$'),
          ],
        ],
        last_name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern('^[a-zA-Z ]*$'),
          ],
        ],
        email: [
          { value: '', disabled: true },
          [Validators.required, Validators.email],
        ],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        gender: ['', [Validators.required]],
        birth: [null, [Validators.required, dateFormatValidator()]],
        specialization: ['', [Validators.required]],
        city: ['', [Validators.required, Validators.minLength(3)]],
        country: ['', [Validators.required, Validators.minLength(3)]],
        password: [
          '',
          [
            Validators.minLength(8),
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$'),
          ],
        ],
        password_confirmation: [''],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  loadUserData(): void {
    this.isLoading = true;
    this.userService.currentUser().subscribe({
      next: (user) => {
        this.userData = user || {};
        this.updateFormWithUserData();
        this.isLoading = false;
      },
      error: (err) => {
        this.snackBar.open('Failed to load user data', 'Close', {
          duration: 3000,
        });
        this.isLoading = false;
      },
    });
  }

  updateFormWithUserData(): void {
    this.formData.patchValue({
      first_name: this.userData.first_name || '',
      last_name: this.userData.last_name || '',
      email: this.userData.email || '',
      phone: this.userData.phone || '',
      gender: this.userData.gender || '',
      birth: this.userData.birth ? new Date(this.userData.birth) : null,
      specialization: this.userData.specialization || '',
      city: this.userData.city || '',
      country: this.userData.country || '',
    });
  }

  // ... rest of your methods remain the same ...
  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('password_confirmation')?.value;

    if (password || confirmPassword) {
      return password === confirmPassword ? null : { mismatch: true };
    }
    return null;
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // YYYY-MM-DD format
  }
  onSubmit(): void {
    if (this.formData.invalid) return;

    this.isLoading = true;
    const formValue = this.prepareSubmitData();

    this.userService.updateUser(formValue).subscribe({
      next: (response) => {
        this.loadUserData();
        this.isLoading = false;
        this.snackBar.open('Profile updated successfully', 'Close', {
          duration: 3000,
        });
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.open('Failed to update profile', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  prepareSubmitData(): any {
    const data: any = {
      ...this.formData.getRawValue(),
      birth: this.formatDate(this.formData.value.birth),
    };

    // Remove password fields if not changing
    if (!data.password) {
      delete data.password;
      delete data.password_confirmation;
    }

    return data;
  }

  cancel(): void {
    this.router.navigate(['/profile']);
  }
}
