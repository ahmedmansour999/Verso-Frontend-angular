import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../../../Api/user/user.service';
import { PortfolioService } from '../../../../../Api/Auth/portfolio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css',
})
export class CreateProjectComponent {
  projectsForm: FormGroup;
  isSubmitting = false;
  user: any;
  imagePreviews: (string | null)[] = [];
  projectNum: number = 0;
  user_id : number = 0 ;

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private snackbar: MatSnackBar,
    private _portfolioService: PortfolioService ,
    private router : Router
  ) {
    this.projectsForm = this.fb.group({
      projects: this.fb.array([]),
    });
  }

  get projects(): FormArray {
    return this.projectsForm.get('projects') as FormArray;
  }

  getProjectNum(index: number) {
    return this.projectNum + index;
  }

  ngOnInit(): void {
    this._userService.currentUser().subscribe({
      next: (userData) => {
        this.user = userData;
        this.user_id = userData.id ;
        this.projectNum = this.user.portfolio.projects.length;
      },
      error: (error) => {
        this.snackbar.open('please login again');
      },
    });
    this.addProject();
  }

  createProject() {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      short_description: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      link: ['', [Validators.required]],
      image: [null, Validators.required],
    });
  }

  addProject() {
    this.projects.push(this.createProject());
  }

  removeProject(index: number): void {
    this.projects.removeAt(index);
    this.imagePreviews.splice(index, 1);
  }

  onFileChange(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews[index] = e.target.result;
        this.projects.at(index).patchValue({
          image: file,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  getImagePreview(index: number): string | null {
    return this.imagePreviews[index];
  }

  onSubmit() {
    if (this.projectsForm.valid) {
      if (!this.user) {
        this.snackbar.open('User data not loaded yet', 'Close', {
          duration: 3000,
        });
        return;
      }

      this.isSubmitting = true;
      const formData = new FormData();

      this.projects.value.forEach((proj: any, index: number) => {
        formData.append(`projects[${index}][title]`, proj.title);
        formData.append(
          `projects[${index}][short_description]`,
          proj.short_description
        );
        formData.append(`projects[${index}][description]`, proj.description);
        formData.append(`projects[${index}][link]`, proj.link);

        if (proj.image instanceof File) {
          formData.append(
            `projects[${index}][image]`,
            proj.image,
            proj.image.name
          );
        }

        formData.append(`projects[${index}][user_id]`, this.user.id);
        formData.append(
          `projects[${index}][portfolio_id]`,
          this.user.portfolio.id
        );
      });

      this._portfolioService.addProject(formData).subscribe({
        next: (response: any) => {
          this.snackbar.open('Project created successfully!', 'Close', {
            duration: 3000,
          });
          this.isSubmitting = false;
          this.projectsForm.reset();
          this.router.navigate(['/profile/profile_project']);
        },
        error: (err) => {
          console.error('Error creating project:', err);
          this.snackbar.open('Failed to create project', 'Close', {
            duration: 3000,
          });
          this.isSubmitting = false;
        },
      });
    } else {
      this.projectsForm.markAllAsTouched();
      this.snackbar.open('Please fill all required fields correctly', 'Close', {
        duration: 3000,
      });
    }
  }
}
