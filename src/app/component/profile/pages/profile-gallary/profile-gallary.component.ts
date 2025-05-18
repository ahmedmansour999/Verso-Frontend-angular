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
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../../../Api/Auth/portfolio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-profile-gallary',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './profile-gallary.component.html',
  styleUrl: './profile-gallary.component.css'
})
export class ProfileGallaryComponent {
  certificationForm: FormGroup;
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
    this.certificationForm = this.fb.group({
      certifications: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadCertifications();
  }

  get certifications(): FormArray {
    return this.certificationForm.get('certifications') as FormArray;
  }

  loadCertifications(): void {
    this.userService.currentUser().subscribe({
      next: (data) => {
        const certifications = data.portfolio.certifications;
        this.user = data;

        if (certifications.length > 0) {
          certifications.forEach((cert: any) => this.addCertification(cert));
        } else {
          this.addCertification();
        }
      },
      error: (err) => {
        this.snackbar.open('Failed to open certification', ' Close', {
          duration: 2500,
        });
        this.addCertification();
      },
    });
  }

  createCertification(cert: any): FormGroup {
    return this.fb.group({
      id: [cert?.id || null],
      title: [
        cert?.title || '',
        [Validators.required, Validators.minLength(3)],
      ],
      link: [cert?.link || '', [Validators.required]],
      image: [cert?.image || null, Validators.required],
      user_id: [this.user.id || null],
      portfolio_id: [this.user.portfolio.id || null],
    });
  }

  addCertification(cert?: any): void {
    this.certifications.push(this.createCertification(cert));
    if (cert?.image) {
      this.imagePreviews.push(`${this.pathUrl}${cert.image}`);
    } else {
      this.imagePreviews.push(null);
    }
  }

  removeCertification(index: number, id :number): void {
    this.certifications.removeAt(index);
    this.imagePreviews.splice(index, 1);

    this._portfolioService.deleteCertification(id).subscribe({
      next: () => {
        this.snackbar.open('certification deleted successfully', 'Close', {
          duration: 3000,
        });
      },
      error: () => {
        this.snackbar.open('Failed to delete certification', 'Close', {
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
        this.certifications.at(index).patchValue({
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
    if (this.certificationForm.valid) {
      this.isSubmitting = true;
      const formData = new FormData();

      this.certifications.value.forEach((cert: any, index: number) => {
        formData.append(`certifications[${index}][id]`, cert.id);
        formData.append(`certifications[${index}][title]`, cert.title);
        if (cert.image instanceof File) {
          formData.append(
            `certifications[${index}][image]`,
            cert.image,
            cert.image.name
          );
        }
        formData.append(`certifications[${index}][link]`, cert.link);
      });

      this._portfolioService.updateCertifications(formData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.snackbar.open('Updated Success', ' Close', { duration: 2500 });
        },
        error: () => {
          this.snackbar.open('Failed to update certifications', ' Close', {
            duration: 2500,
          });
          this.isSubmitting = false;
        },
      });
    } else {
      this.certificationForm.markAllAsTouched();
    }
  }
}
