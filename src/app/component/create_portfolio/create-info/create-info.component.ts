import { Token } from './../../../Class/token.service';
import { PortfolioService } from './../../../Api/Auth/portfolio.service';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Portfolio } from '../../../interface/portfolio/portfolio';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { AuthService } from '../../../Api/Auth/auth.service';
import { Router } from '@angular/router';

const moment = _rollupMoment || _moment;

function checkSizeOfImage(maxSizeMB: number = 5): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value || typeof control.value === 'string') return null;

    const file = control.value as File;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    return file.size > maxSizeBytes ? { fileTooLarge: true } : null;
  };
}

@Component({
  selector: 'app-create-info',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    CommonModule,
  ],
  templateUrl: './create-info.component.html',
  styleUrls: ['./create-info.component.css'],
})
export class CreateInfoComponent {
  readonly startDate = moment([2020, 0, 1]);
  readonly currentYear = new Date().getFullYear();
  uploading: boolean = false;
  step = 1;
  userId: number | null = null;

  portfolio_form = new FormGroup({
    summary: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    graduate: new FormControl<Moment | null>(null, [Validators.required]),
    experiences: new FormArray<FormGroup>([]),
    educations: new FormArray<FormGroup>([]),
    projects: new FormArray<FormGroup>([]),
    certifications: new FormArray<FormGroup>([]),
    skills: new FormArray<FormGroup>([] , [this.minLengthArray(1)]),
    language: new FormArray<FormGroup>([] , [this.minLengthArray(1)]),
  });
  private minLengthArray(min: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control instanceof FormArray) {
        return control.length >= min ? null : { minLengthArray: true };
      }
      return null;
    };
  }

  constructor(
    private _PortfolioService: PortfolioService,
    private _authService: AuthService ,
    private router : Router
  ) {
    this.addExperience();
    this.addEducation();
    this.addProject();
    this.addCertification();
  }

  ngOnInit(): void {
    const user = this._authService.getUser();
    if (user) {
      this.userId = user.id;
    }
  }

  get experiences(): FormArray {
    return this.portfolio_form.get('experiences') as FormArray;
  }
  get educations(): FormArray {
    return this.portfolio_form.get('educations') as FormArray;
  }
  get projects(): FormArray {
    return this.portfolio_form.get('projects') as FormArray;
  }
  get certifications(): FormArray {
    return this.portfolio_form.get('certifications') as FormArray;
  }
  get skills(): FormArray {
    return this.portfolio_form.get('skills') as FormArray;
  }
  get language(): FormArray {
    return this.portfolio_form.get('language') as FormArray;
  }

  createExperience(): FormGroup {
    return new FormGroup({
      company: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      role: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      startYear: new FormControl<Moment | null>(null, [Validators.required]),
      endYear: new FormControl<Moment | null>(null, [
        Validators.required,
        this.endDateAfterStartValidator(),
      ]),
      description: new FormControl('', { nonNullable: true }),
    });
  }
  createEducations(): FormGroup {
    return new FormGroup({
      education: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      specialization: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      startYear: new FormControl<Moment | null>(null, [Validators.required]),
      endYear: new FormControl<Moment | null>(null, [
        Validators.required,
        this.endDateAfterStartValidator(),
      ]),
      description: new FormControl('', { nonNullable: true }),
    });
  }
  createProjects(): FormGroup {
    return new FormGroup({
      title: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.min(3)],
      }),
      smallDesc: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.min(3)],
      }),
      desc: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.min(3)],
      }),
      img: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, checkSizeOfImage(30)],
      }),
      link: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }
  createCertification(): FormGroup {
    return new FormGroup({
      image: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      title: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.min(3)],
      }),
      link: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.min(3)],
      }),
    });
  }
  newSkillForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
  newLangForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
  createSkill(title: string = ''): FormGroup {
    return new FormGroup({
      title: new FormControl(title, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }
  createLang(title: string = ''): FormGroup {
    return new FormGroup({
      title: new FormControl(title, [
        Validators.required,
        Validators.minLength(3),
      ]),
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

  addExperience(): void {
    this.experiences.push(this.createExperience());
  }
  addEducation(): void {
    this.educations.push(this.createEducations());
  }
  addProject(): void {
    this.projects.push(this.createProjects());
  }
  addCertification(): void {
    this.certifications.push(this.createCertification());
  }
  addSkill() {
    if (this.newSkillForm.valid) {
      const title = this.newSkillForm.value.title || '';
      this.skills.push(this.createSkill(title));
      this.newSkillForm.reset();
    }
  }
  addLang() {
    if (this.newLangForm.valid) {
      const title = this.newLangForm.value.title || '';
      this.language.push(this.createLang(title));
      this.newLangForm.reset();
    }
  }

  removeExperience(index: number): void {
    this.experiences.removeAt(index);
  }

  removeProject(index: number): void {
    if (this.projectPreviews[index]) {
      URL.revokeObjectURL(this.projectPreviews[index]);
    }

    this.projects.removeAt(index);

    this.projectPreviews.splice(index, 1);
    this.projectFiles.splice(index, 1);
  }

  removeEducation(index: number): void {
    this.educations.removeAt(index);
  }
  removeSkills(index: number): void {
    this.skills.removeAt(index);
  }
  removeLang(index: number): void {
    this.language.removeAt(index);
  }

  removeCertification(i: number): void {
    if (this.certificationPreview[i]) {
      URL.revokeObjectURL(this.certificationPreview[i]);
    }
    this.certifications.removeAt(i);

    this.certificationPreview.splice(i, 1);
    this.certificationFile.splice(i, 1);
  }

  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>,
    control: AbstractControl
  ) {
    if (!control) return;
    const ctrlValue = control.value ? moment(control.value) : moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    control.setValue(ctrlValue);
    datepicker.close();
  }

  checkEndLaterStart(experienceIndex: number): boolean {
    const experienceGroup = this.experiences.at(experienceIndex) as FormGroup;
    const startYear = experienceGroup.get('startYear')?.value as Moment;
    const endYear = experienceGroup.get('endYear')?.value as Moment;

    if (!startYear || !endYear) return true;

    return endYear.isSameOrAfter(startYear);
  }
  checkEndLaterStartEducation(educationIndex: number): boolean {
    const educationGroup = this.educations.at(educationIndex) as FormGroup;
    const startYear = educationGroup.get('startYear')?.value as Moment;
    const endYear = educationGroup.get('endYear')?.value as Moment;

    if (!startYear || !endYear) return true;

    return endYear.isSameOrAfter(startYear);
  }

  projectPreviews: string[] = [];
  projectFiles: (File | null)[] = [];
  certificationPreview: string[] = [];
  certificationFile: (File | null)[] = [];

  UploadImage(e: any, i: number) {
    const file = e.target.files[0];
    if (file) {
      // Update the form control with the file
      this.projectFiles[i] = file;
      // Create preview
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.projectPreviews[i] = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  UploadCerImage(e: any, i: number) {
    const file = e.target.files[0];
    if (file) {
      this.certificationFile[i] = file;

      // Create preview
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.certificationPreview[i] = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  getPreviewUrl(index: number): string | null {
    return this.projectPreviews[index] || null;
  }

  getCertificationUrl(index: number): string | null {
    return this.certificationPreview[index] || null;
  }

  next(): void {
    if (
      this.step === 1 &&
      this.portfolio_form.get('summary')?.valid &&
      this.portfolio_form.get('graduate')?.valid &&
      this.portfolio_form.get('language')?.valid &&
      this.portfolio_form.get('skills')?.valid

    ) {
      this.step = 2;
    } else if (
      this.step === 2 &&
      this.portfolio_form.get('experiences')?.valid
    ) {
      this.step = 3;
    } else if (
      this.step === 3 &&
      this.portfolio_form.get('educations')?.valid
    ) {
      this.step = 4;
    } else if (this.step === 4 && this.portfolio_form.get('projects')?.valid) {
      this.step = 5;
    } else if (this.step === 5 && this.portfolio_form.valid) {
      this.onSubmit();
    } else {
      this.portfolio_form.markAllAsTouched();
    }
  }

  back(): void {
    if (this.step > 1) {
      this.step--;
    }
  }

  async onSubmit(): Promise<void> {
    if (this.portfolio_form.valid) {
      this.uploading = true;
      try {
        const formValue = {
          summary: this.portfolio_form.value.summary || '',
          graduate:
            this.portfolio_form.value.graduate?.format('MM-YYYY') ||
            moment().format('MM-YYYY'),
          user_id: this.userId,
          educations:
            this.portfolio_form.value.educations?.map((edu) => ({
              education: edu.education || '',
              specialization: edu.specialization || '',
              start_date: edu.startYear?.format('MM-YYYY') || '',
              end_date: edu.endYear?.format('MM-YYYY') || '',
              description: edu.description || '',
              user_id: this.userId,
            })) || [],
          experiences:
            this.portfolio_form.value.experiences?.map((exp) => ({
              company: exp.company || '',
              role: exp.role || '',
              start_date: exp.startYear?.format('MM-YYYY') || '',
              end_date: exp.endYear?.format('MM-YYYY') || '',
              // description: exp.description || '',
              user_id: this.userId,
            })) || [],
          projects:
            this.portfolio_form.value.projects?.map((project, index) => ({
              title: project.title || '',
              short_description: project.smallDesc || '', // Match backend field name
              description: project.desc || '', // Match backend field name
              image: this.projectFiles[index], // Use File object
              link: project.link || '',
              user_id: this.userId,
            })) || [],
          certifications:
            this.portfolio_form.value.certifications?.map((cert, i) => ({
              title: cert.title || '',
              image: this.certificationFile[i], // Use File object
              link: cert.link || '',
              user_id: this.userId,
            })) || [],
          skills:
            this.portfolio_form.value.skills?.map((skill, i) => ({
              title: skill.title || '',
              user_id: this.userId,
            })) || [],
          language:
            this.portfolio_form.value.language?.map((lang, i) => ({
              title: lang.title || '',
              user_id: this.userId,
            })) || [],
        };

        this._PortfolioService.createPortfolio(formValue).subscribe(

          (error: any) => {
            console.error('Error:', error, formValue);
          }
        );

      } catch (error) {
        console.error('Error submitting data:', error);
      } finally {
        this.uploading = false;
        this.router.navigate(['/portfolio']);
      }
    } else {
      this.portfolio_form.markAllAsTouched();

    }
  }
}
