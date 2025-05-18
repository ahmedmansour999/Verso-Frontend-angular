import { Component, inject, ViewEncapsulation } from '@angular/core';
import {
  FormGroup,
  Validators,
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormArray,
  ValidatorFn,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Moment } from 'moment';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { UserService } from '../../../../../Api/user/user.service';
import { PortfolioService } from '../../../../../Api/Auth/portfolio.service';
const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-create-experience',
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
    MatMomentDateModule,
  ],
  templateUrl: './create-experience.component.html',
  styleUrl: './create-experience.component.css',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class CreateExperienceComponent {
  formData: FormGroup;
  isLoading = false;
  readonly currentYear = new Date().getFullYear();
  readonly startDate = moment([1990, 0, 1]);
  portfolioData: any;
  experienceNum: number = 0;

  private fb = inject(FormBuilder);

  constructor(
    private userService: UserService,
    private _router: Router,
    private snackBar: MatSnackBar,
    private _PortfolioService: PortfolioService
  ) {
    this.formData = this.fb.group({
      experiences: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.addExperience();
    this.userService.currentUser().subscribe({
      next: (user: any) => {
        this.portfolioData = user.portfolio;
      },
      error: () => {
        this.snackBar.open('Failed to load experience data', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  get experiences(): FormArray {
    return this.formData.get('experiences') as FormArray;
  }
  getExperienceNum(index: number) {
    return this.experienceNum + index + 1;
  }

  addExperience() {
    this.experiences.push(this.createExperience());
  }

  createExperience(): FormGroup {
    return this.fb.group({
      company: ['', [Validators.required, Validators.minLength(3)]],
      role: ['', [Validators.required, Validators.minLength(3)]],
      startYear: [null, [Validators.required]],
      endYear: [null, [Validators.required, this.endDateAfterStartValidator()]],
    });
  }

  removeExperience(index: number): void {
    this.experiences.removeAt(index);
  }

  private endDateAfterStartValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const group = control.parent;
      if (!group) return null;

      const startYearControl = group.get('startYear');
      const endYearControl = control;

      if (!startYearControl?.value || !endYearControl?.value) return null;

      const startYear = startYearControl.value as Moment;
      const endYear = endYearControl.value as Moment;

      return endYear.isSameOrAfter(startYear) ? null : { endBeforeStart: true };
    };
  }

  checkEndLaterStartExperience(index: number): boolean {
    const experienceGroup = this.experiences.at(index) as FormGroup;
    const startYear = experienceGroup.get('startYear')?.value as Moment;
    const endYear = experienceGroup.get('endYear')?.value as Moment;

    if (!startYear || !endYear) return true;

    return endYear.isSameOrAfter(startYear);
  }

  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: any,
    control: AbstractControl
  ) {
    if (!control) return;
    const ctrlValue = control.value ? moment(control.value) : moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    control.setValue(ctrlValue);
    datepicker.close();
  }

  onSubmit(): void {
    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formValue = {
      experiences: this.experiences.value.map((edu: any) => ({
        company: edu.company,
        role: edu.role,
        start_date: edu.startYear?.format('MM-YYYY') || '',
        end_date: edu.endYear?.format('MM-YYYY') || '',
        user_id: this.portfolioData.user_id,
        portfolio_id: this.portfolioData.id,
      })),
    };

    this._PortfolioService.addExperience(formValue).subscribe({
      next: () => {
        this.snackBar.open(' Created successfully', 'Close', {
          duration: 3000,
        });
        this.isLoading = false;
        this._router.navigate(['/profile/experience']);
      },
      error: () => {
        this.snackBar.open('Failed to Create ', 'Close', {
          duration: 3000,
        });
        this.isLoading = false;
      },
    });
  }
}
