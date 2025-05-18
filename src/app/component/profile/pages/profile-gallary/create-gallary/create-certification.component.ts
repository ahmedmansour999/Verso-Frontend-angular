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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { PortfolioService } from '../../../../../Api/Auth/portfolio.service';
import { UserService } from '../../../../../Api/user/user.service';

@Component({
  selector: 'app-create-certification',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-certification.component.html',
  styleUrl: './create-certification.component.css',
})
export class CreatecertificationComponent {
  certificationForm: FormGroup;
  isSubmitting = false;
  imagePreviews: (string | null)[] = [];
  user: any;
  pathUrl: string = environment.baseUrl;
  certificationNum: number = 0;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
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

  getCertificationNum(index: number) {
    return this.certificationNum + index;
  }

  loadCertifications(): void {
    this.userService.currentUser().subscribe({
      next: (data) => {
        this.user = data;
        this.certificationNum = this.user.portfolio.certifications.length;
      },
      error: (err) => {
        this.snackbar.open('Failed to open certification', ' Close', {
          duration: 2500,
        });
      },
    });
    this.addCertification();
  }

  createCertification(cert: any): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      link: ['', [Validators.required]],
      image: [, Validators.required],
    });
  }

  addCertification(cert?: any): void {
    this.certifications.push(this.createCertification(cert));
    this.imagePreviews.push(null);
  }

  removeCertification(index: number): void {
    this.certifications.removeAt(index);
    this.imagePreviews.splice(index, 1);
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
        formData.append(`certifications[${index}][title]`, cert.title);
        if (cert.image instanceof File) {
          formData.append(
            `certifications[${index}][image]`,
            cert.image,
            cert.image.name
          );
        }
        formData.append(`certifications[${index}][link]`, cert.link);
        formData.append(
          `certifications[${index}][portfolio_id]`,
          this.user.portfolio.id
        );
        formData.append(`certifications[${index}][user_id]`, this.user.id);
      });

      this._portfolioService.addCertification(formData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.snackbar.open('Updated Success', ' Close', { duration: 2500 });
          this.router.navigate(['/profile/profile_Certifications']);

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
      this.snackbar.open('Please fill all required fields correctly', 'Close', {
        duration: 3000,
      });
    }
  }
}
