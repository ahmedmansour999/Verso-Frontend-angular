import { ImageService } from './../../../../../Api/image.service';
import { UserService } from './../../../../../Api/user/user.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { PortfolioService } from '../../../../../Api/Auth/portfolio.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-image',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-image.component.html',
  styleUrl: './profile-image.component.css',
})
export class ProfileImageComponent implements OnInit {
  imageProfile: string | null = null;
  imageForm: FormGroup;
  pathUrl = environment.baseUrl;
  loading = false;
  selectedFile: File | null = null;

  private fb = inject(FormBuilder);

  constructor(
    private userService: UserService,
    private portfolioService: PortfolioService,
    private router: Router,
    private sanckBar: MatSnackBar ,
    private _ImageService : ImageService
  ) {
    this.imageForm = this.fb.group({
      image: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadUserImage();
  }

  private loadUserImage(): void {
    this.loading = true;
    this.userService.currentUser().subscribe({
      next: (data) => {
        if (data.image) {
          this.imageProfile = `${this.pathUrl}/${data.image}`;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      // Create preview before updating form
      const reader = new FileReader();
      reader.onloadstart = () => (this.loading = true);
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imageProfile = e.target?.result as string;
        this.loading = false;

        // Update form after preview is ready
        this.imageForm.patchValue({
          image: this.selectedFile,
        });
        this.imageForm.get('image')?.markAsTouched();
        this.imageForm.get('image')?.updateValueAndValidity();
      };
      reader.onerror = () => (this.loading = false);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit() {
    if (this.imageForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);

      this.loading = true;
      this._ImageService.changeImage(formData).subscribe({
        next: (response) => {
          this.sanckBar.open('update image success', 'close', {
            duration: 3000,
          });
          this.loading = false;
        },
        error: (error) => {
          this.sanckBar.open('update image Fail', 'close', { duration: 3000 });
          this.loading = false;
        },
      });
    }
  }
}
