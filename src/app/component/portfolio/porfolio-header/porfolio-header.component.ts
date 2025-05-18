import { UserService } from './../../../Api/user/user.service';
import { Component } from '@angular/core';
import { ModeBtnComponent } from '../../../template/Buttons/mode-btn/mode-btn.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../../../environments/environment';

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
  profileImage?: string;
  baseUrl = environment.baseUrl;

  userDetails: IuserDetails;

  constructor(private _userService: UserService, private fb: FormBuilder) {
    this.userDetails = {
      name: '',
      birth: '',
      specialization: '',
      image: '',
      city: '',
      country: '',
      gender: '',
      social: [],
    };
  }

  ngOnInit(): void {
    this._userService.currentUser().subscribe({
      next: (data) => {
        this.userDetails = {
          name: `${data.first_name} ${data.last_name}`,
          birth: data.birth,
          specialization: data.specialization,
          image: data.image,
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
        this.profileImage = this.baseUrl + '/' + data.image;
      },
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
}
