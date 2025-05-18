import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../../Api/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { PortfolioService } from '../../../../Api/Auth/portfolio.service';
import { ProfileImageComponent } from './profile-image/profile-image.component';

interface Skill {
  id?: number;
  title: string;
}

interface Language {
  id?: number;
  title: string;
}

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , ProfileImageComponent],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css',
})
export class ProfileInfoComponent implements OnInit, OnDestroy {
  formData: FormGroup;
  newSkillForm: FormGroup;
  newLangForm: FormGroup;
  isLoading = false;
  private subscriptions = new Subscription();
  portfolioData : any ;

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _portfolioService: PortfolioService,
    private _snackbar: MatSnackBar
  ) {
    this.formData = this.fb.group({
      languages: this.fb.array([]),
      skills: this.fb.array([]),
    });

    this.newSkillForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.newLangForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  get languages(): FormArray {
    return this.formData.get('languages') as FormArray;
  }

  get skills(): FormArray {
    return this.formData.get('skills') as FormArray;
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.isLoading = true;
    const sub = this._userService.currentUser().subscribe({
      next: (data) => {
         this.portfolioData = data.portfolio;
        this.portfolioData.language.forEach((lang: Language) => {
          this.addLanguage(lang);
        });
        this.portfolioData.skill.forEach((skill: Skill) => {
          this.addSkill(skill);
        });
        this.isLoading = false;
      },
      error: () => {
        this._snackbar.open('Failed to load data', 'Close', { duration: 3000 });
        this.isLoading = false;
      },
    });
    this.subscriptions.add(sub);
  }

  createLanguage(lang: any): FormGroup {
    return this.fb.group({
      id: [lang.id || ''],
      title: [lang.title || '', [Validators.required, Validators.minLength(3)]],
    });
  }

  createSkill(skill:any): FormGroup {
    return this.fb.group({
      id: [skill.id || ''],
      title: [skill.title || '', [Validators.required, Validators.minLength(3)]],
    });
  }

  addLanguage(lang?: Language): void {
    if (lang) {
      this.languages.push(this.createLanguage(lang));
      this.newLangForm.reset();
    } else if (this.newLangForm.valid) {
      const title = this.newLangForm.value.title.trim();
      const exists = this.languages.controls.some(
        (control) => control.value.title.toLowerCase() === title.toLowerCase()
      );
      if (!exists) {
        this.languages.push(this.createLanguage({ title }));
        this.newLangForm.reset()
        this.newLangForm.markAsUntouched();
      } else {
        this._snackbar.open('Language already exists', 'Close', { duration: 3000 });
      }
    }
  }

  addSkill(skill?: Skill): void {
    if (skill) {
      this.skills.push(this.createSkill(skill));
      this.newSkillForm.reset();
    } else if (this.newSkillForm.valid) {
      const title = this.newSkillForm.value.title.trim();
      const exists = this.skills.controls.some(
        (control) => control.value.title.toLowerCase() === title.toLowerCase()
      );
      if (!exists) {
        this.skills.push(this.createSkill({ title }));
        this.newSkillForm.reset();
        this.newSkillForm.markAsUntouched();
      } else {
        this._snackbar.open('Skill already exists', 'Close', { duration: 3000 });
      }
    }

  }

  removeLanguage(index: number): void {
    const language = this.languages.at(index).value as Language;
    if (language.id) {
      this.isLoading = true;
      const sub = this._portfolioService.deleteLanguage(language.id).subscribe({
        next: () => {
          this.languages.removeAt(index);
          this._snackbar.open('Language removed', 'Close', { duration: 3000 });
          this.isLoading = false;
        },
        error: () => {
          this._snackbar.open('Failed to remove language', 'Close', { duration: 3000 });
          this.isLoading = false;
        },
      });
      this.subscriptions.add(sub);
    } else {
      this.languages.removeAt(index);
      this._snackbar.open('Language removed', 'Close', { duration: 3000 });
    }
  }

  removeSkill(index: number): void {
    const skill = this.skills.at(index).value as Skill;
    if (skill.id) {
      this.isLoading = true;
      const sub = this._portfolioService.deleteSkill(skill.id ).subscribe({
        next: () => {
          this.skills.removeAt(index);
          this._snackbar.open('Skill removed', 'Close', { duration: 3000 });
          this.isLoading = false;
        },
        error: () => {
          this._snackbar.open('Failed to remove skill', 'Close', { duration: 3000 });
          this.isLoading = false;
        },
      });
      this.subscriptions.add(sub);
    } else {
      this.skills.removeAt(index);
      this._snackbar.open('Skill removed', 'Close', { duration: 3000 });
    }
  }

  onSubmit(): void {
    if (this.formData.valid) {
      this.isLoading = true;

      const formValue = {
        languages : this.languages.value ,
        skills : this.skills.value ,
        user_id : this.portfolioData.user_id ,
        portfolio_id : this.portfolioData.id ,
      }
      const sub = this._portfolioService.updateInfo(formValue).subscribe({
        next: () => {
          this._snackbar.open('Data saved successfully', 'Close', { duration: 3000 });
          this.isLoading = false;
        },
        error: () => {
          this._snackbar.open('Failed to save data', 'Close', { duration: 3000 });
          this.isLoading = false;
        },
      });
      this.subscriptions.add(sub);
    }
  }

  cancel(): void {
    if (this.formData.dirty) {
      if (confirm('Are you sure you want to discard changes?')) {
        this.loadUserData();
      }
    } else {
      this.loadUserData();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
