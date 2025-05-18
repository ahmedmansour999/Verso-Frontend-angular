import { PortfolioService } from '../../../../Api/Auth/portfolio.service';
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
import { UserService } from '../../../../Api/user/user.service';
import { Moment } from 'moment';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';

import { MatMomentDateModule } from '@angular/material-moment-adapter';

const moment = _rollupMoment || _moment;
@Component({
  selector: 'app-profile-experience',
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
    RouterLink,
  ],
  templateUrl: './profile-experience.component.html',
  styleUrl: './profile-experience.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class ProfileExperienceComponent {
  formData: FormGroup;
  isLoading = false;
  readonly currentYear = new Date().getFullYear();
  readonly startDate = moment([1990, 0, 1]);
  portfolioData: any;

  private fb = inject(FormBuilder);

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private _PortfolioService: PortfolioService
  ) {
    this.formData = this.fb.group({
      experiences: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadExperiences();
  }

  get experiences(): FormArray {
    return this.formData.get('experiences') as FormArray;
  }

  loadExperiences() {
    this.userService.currentUser().subscribe({
      next: (user) => {
        this.portfolioData = user.portfolio;
        const experiences = user.portfolio.experiences;

        if (experiences.length > 0) {
          experiences.forEach((experience: any) => {
            this.addExperience(experience);
          });
        } else {
          this.addExperience();
        }
      },
      error: (err) => {
        this.snackBar.open('Failed to load experiences data', 'Close', {
          duration: 3000,
        });
        this.addExperience();
      },
    });
  }

  addExperience(experience?: any) {
    this.experiences.push(this.createExperiences(experience));
  }

  createExperiences(exp?: any): FormGroup {
    return this.fb.group({
      id: exp?.id || '',
      company: [
        exp?.company || '',
        [Validators.required, Validators.minLength(3)],
      ],
      role: [
        exp?.role || '',
        [Validators.required, Validators.minLength(3)],
      ],
      startYear: [
        exp?.start_date ? moment(exp.start_date, 'MM-YYYY') : null,
        [Validators.required],
      ],
      endYear: [
        exp?.end_date ? moment(exp.end_date, 'MM-YYYY') : null,
        [Validators.required, this.endDateAfterStartValidator()],
      ],
    });
  }

  removeExperience(index: number, id: number): void {
    this.isLoading = true;
    this.experiences.removeAt(index);
    this._PortfolioService.deleteExperience(id).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open('experience deleted successfully', 'Close', {
          duration: 3000,
        });
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('experience deleted Failed', 'Close', {
          duration: 3000,
        });
      },
    });
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
    const experiencesGroup = this.experiences.at(index) as FormGroup;
    const startYear = experiencesGroup.get('startYear')?.value as Moment;
    const endYear = experiencesGroup.get('endYear')?.value as Moment;

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
      experiences: this.experiences.value.map((exp: any) => ({
        id: exp.id,
        company: exp.company,
        role: exp.role,
        start_date: exp.startYear?.format('MM-YYYY') || '',
        end_date: exp.endYear?.format('MM-YYYY') || '',
        user_id: this.portfolioData.user_id,
        portfolio_id: this.portfolioData.id,
      })),
    };

    this._PortfolioService.updateExperience(formValue).subscribe({
      next: () => {
        this.snackBar.open(' updated successfully', 'Close', {
          duration: 3000,
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.snackBar.open('Failed to update ', 'Close', {
          duration: 3000,
        });
        this.isLoading = false;
      },
    });
  }
}
