import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  commentForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),
    message: new FormControl('' , [Validators.required , Validators.minLength(5)]),
  });

  get emailControl() {
    return this.commentForm.get('email');
  }

  get messageControl() {
    return this.commentForm.get('message');
  }
  comment() {
    console.log(this.commentForm.value);
  }
}
