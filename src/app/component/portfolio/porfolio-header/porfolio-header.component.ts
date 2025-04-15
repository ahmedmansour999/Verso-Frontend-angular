import { UserService } from './../../../Api/user/user.service';
import { Component } from '@angular/core';
import { ModeBtnComponent } from '../../../template/Buttons/mode-btn/mode-btn.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

interface SocialLink {
  [key: string]: string | undefined;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

interface IuserDetails {
  name: string;
  birth: string;
  specialization: string;
  image?: string;
  city: string;
  country: string;
  gender: string;
  social?: SocialLink[];
}

@Component({
  selector: 'app-porfolio-header',
  imports: [ModeBtnComponent, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './porfolio-header.component.html',
  styleUrl: './porfolio-header.component.css',
})
export class PorfolioHeaderComponent {
  showList: boolean = true;

  userDetails: IuserDetails = {
    name: '',
    birth: '',
    specialization: '',
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    city: '',
    country: '',
    gender: '',
    social: [
      { facebook: 'https://www.facebook.com' },
      { instagram: 'https://www.instagram.com' },
      { linkedin: 'https://www.linkedin.com' },
      { twitter: 'https://www.twitter.com' },
      { github: 'https://www.github.com' },
      { githubas: 'https://www.github.com' },
    ],
  };

  constructor(private _userService: UserService) {
    _userService.currentUser().subscribe((data) => {

      this.userDetails = {
        name: `${data.first_name} ${data.last_name}`,
        birth: data.birth,
        specialization: data.specialization,
        image:
          data.image ||
          'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        city: data.city,
        country: data.country,
        gender: data.gender,
        social: [
          { facebook: 'https://www.facebook.com' },
          { instagram: 'https://www.instagram.com' },
          { linkedin: 'https://www.linkedin.com' },
          { twitter: 'https://www.twitter.com' },
          { github: 'https://www.github.com' },
          { githubas: 'https://www.github.com' },
        ],
      };
    });
  }

  toggleList() {
    this.showList = !this.showList;
  }

  getUnknownPlatform(platform: SocialLink): string | null {
    const knownPlatforms = [
      'facebook',
      'instagram',
      'linkedin',
      'twitter',
      'github',
    ];
    const platformKeys = Object.keys(platform);

    for (const key of platformKeys) {
      if (!knownPlatforms.includes(key) && platform[key]) {
        return platform[key]!;
      }
    }
    return null;
  }

  ngOnInit(): void {}
}
