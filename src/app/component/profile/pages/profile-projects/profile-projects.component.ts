import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../../../Api/user/user.service';
import { Project } from '../../../../interface/portfolio/project';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../../../Api/Auth/portfolio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-profile-projects',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './profile-projects.component.html',
  styleUrl: './profile-projects.component.css',
})
export class ProfileProjectsComponent {
  projectsForm: FormGroup;
  isSubmitting = false;
  imagePreviews: (string | null)[] = [];
  user: any;
  pathUrl: string = environment.baseUrl;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private _portfolioService: PortfolioService,
    private snackbar: MatSnackBar
  ) {
    this.projectsForm = this.fb.group({
      projects: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  get projects(): FormArray {
    return this.projectsForm.get('projects') as FormArray;
  }

  loadProjects(): void {
    this.userService.currentUser().subscribe({
      next: (data) => {
        const projects = data.portfolio.projects;
        this.user = data;

        if (projects.length > 0) {
          projects.forEach((project: Project) => this.addProject(project));
        } else {
          this.addProject();
        }
      },
      error: (err) => {
        this.snackbar.open('Failed to open projects', ' Close', {
          duration: 2500,
        });
        this.addProject();
      },
    });
  }

  createProject(project: any): FormGroup {
    return this.fb.group({
      id: [project?.id || null],
      title: [
        project?.title || '',
        [Validators.required, Validators.minLength(3)],
      ],
      short_description: [
        project?.short_description || '',
        [Validators.required, Validators.minLength(3)],
      ],
      description: [
        project?.description || '',
        [Validators.required, Validators.minLength(3)],
      ],
      link: [project?.link || '', [Validators.required]],
      image: [project?.image || null, Validators.required],
      user_id: [this.user.id || null],
      portfolio_id: [this.user.portfolio.id || null],
    });
  }

  addProject(project?: any): void {
    this.projects.push(this.createProject(project));
    if (project?.image) {
      this.imagePreviews.push(`${this.pathUrl}${project.image}`);
    } else {
      this.imagePreviews.push(null);
    }
  }

  removeProject(index: number, id :number): void {
    this.projects.removeAt(index);
    this.imagePreviews.splice(index, 1);

    //const id = this.projects.at(index).get('id')?.value;

    this._portfolioService.deleteProject(id).subscribe({
      next: () => {
        this.snackbar.open('Project deleted successfully', 'Close', {
          duration: 3000,
        });
      },
      error: () => {
        this.snackbar.open('Failed to delete project', 'Close', {
          duration: 3000,
        });
      },
    });
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

  onSubmit(): void {
    if (this.projectsForm.valid) {
      this.isSubmitting = true;
      const formData = new FormData();

      this.projects.value.forEach((proj: any, index: number) => {
        formData.append(`projects[${index}][id]`, proj.id);
        formData.append(`projects[${index}][title]`, proj.title);
        formData.append(
          `projects[${index}][short_description]`,
          proj.short_description
        );
        formData.append(`projects[${index}][description]`, proj.description);
        if (proj.image instanceof File) {
          formData.append(
            `projects[${index}][image]`,
            proj.image,
            proj.image.name
          );
        }
        formData.append(`projects[${index}][link]`, proj.link);
      });

      this._portfolioService.updateProjects(formData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.snackbar.open('Updated Success', ' Close', { duration: 2500 });
        },
        error: () => {
          this.snackbar.open('Failed to update projects', ' Close', {
            duration: 2500,
          });
          this.isSubmitting = false;
        },
      });
    } else {
      this.projectsForm.markAllAsTouched();
    }
  }
}
