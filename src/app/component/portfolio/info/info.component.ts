import { Component } from '@angular/core';
import { MapComponent } from '../../../template/map/map.component';

@Component({
  selector: 'app-info',
  imports: [ MapComponent ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoComponent {



  portfolioDetails: any = {
    name: 'Ahmed Mansour',
    title: 'Software Developer',
    description:
      'I am a software developer with a passion for creating innovative solutions.',
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    location: 'cairo , Egypt',
    social: [
      { facebook: 'https://www.facebook.com' },
      { instagram: 'https://www.instagram.com' },
      { linkedin: 'https://www.linkedin.com' },
      { twitter: 'https://www.twitter.com' },
      { github: 'https://www.github.com' },
      { githubas: 'https://www.github.com' },
    ],
  };
}
