import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';

@Component({
  selector: 'app-profile',
  imports: [ProfileHeaderComponent , RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {}
