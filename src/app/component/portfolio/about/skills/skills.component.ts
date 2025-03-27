import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent {
  user_details = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '1234567890',
    skills: [
      { id: 1, title: 'html' },
      { id: 2, title: 'css' },
      { id: 3, title: 'javascript' },
      { id: 4, title: 'photoshop' },
      { id: 5, title: 'photoshop & illustrator' },
      { id: 6, title: 'drawing in paint' },
      { id: 7, title: 'dancing' },
    ],
    language: [{ id: 1, title: 'english' }],
  };

  get Skills() {
    return this.user_details.skills;
  }
  get Language() {
    return this.user_details.language;
  }
}
