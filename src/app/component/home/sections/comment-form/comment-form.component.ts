import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule , TranslateModule]
})
export class CommentFormComponent {
  commentForm: FormGroup;
  rating = signal<number>(0);
  hoverRating = signal<number>(0);

  constructor(private fb: FormBuilder) {
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required, Validators.minLength(5)]],
      rating: [0, [Validators.required, Validators.min(1)]]
    });
  }

  setRating(rating: number): void {
    this.rating.set(rating);
    this.commentForm.get('rating')?.setValue(rating);
  }

  onSubmit(): void {
    if (this.commentForm.valid) {
      console.log('Form Submitted:', {
        comment: this.commentForm.value.comment,
        rating: this.rating()
      });
    }
  }
}
