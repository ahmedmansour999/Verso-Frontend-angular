import { Component, OnInit } from '@angular/core';
import { ImageService } from './../../../Api/image.service';
import { ModeBtnComponent } from '../../../template/Buttons/mode-btn/mode-btn.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../Api/user/user.service';
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
  selector: 'app-profile-header',
  imports: [RouterLink, RouterLinkActive, CommonModule, ModeBtnComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.css',
})
export class ProfileHeaderComponent implements OnInit {
  showList: boolean = true;
  profileImage?: string;
  baseUrl = environment.baseUrl;
  userDetails!: IuserDetails;

  constructor(
    private _userService: UserService,
    private _ImageService: ImageService
  ) {
    this.emptyUserData()
  }

  ngOnInit(): void {
    this.loadUserData();
    this.subscribeToImageUpdates();
  }

  private emptyUserData(): void {
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

  private loadUserData(): void {
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
          social: this.getSocialLinks(data),
        };

        if (data.image) {
          this.profileImage = this.getFullImageUrl(data.image);
        }
      },
      error: (err) => {
        console.error('Failed to load user data:', err);
      },
    });
  }

  private subscribeToImageUpdates(): void {
    this._ImageService.currentImage.subscribe((imagePath) => {
      if (imagePath) {
        this.profileImage = this.getFullImageUrl(imagePath);
        if (this.userDetails) {
          this.userDetails.image = imagePath;
        }
      }
    });
  }

  private getFullImageUrl(imagePath: string): string {
    // Remove leading slash if present to avoid double slashes
    const cleanPath = imagePath.startsWith('/')
      ? imagePath.substring(1)
      : imagePath;
    return `${this.baseUrl}/${cleanPath}`;
  }

  private getSocialLinks(userData: any): SocialLink[] {
    return [
      { facebook: userData.facebook_url || 'https://www.facebook.com' },
      { instagram: userData.instagram_url || 'https://www.instagram.com' },
      { linkedin: userData.linkedin_url || 'https://www.linkedin.com' },
      { twitter: userData.twitter_url || 'https://www.twitter.com' },
      { github: userData.github_url || 'https://www.github.com' },
    ];
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
