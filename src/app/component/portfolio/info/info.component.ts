import { Component } from '@angular/core';
import { MapComponent } from '../../../template/map/map.component';
import { UserService } from '../../../Api/user/user.service';
import { environment } from '../../../../environments/environment';
interface Iinfo {
  name: string;
  specialization: string;
  image: string;
  birth: string;
  city: string;
  location: string;
  country: string;
  summary: string;
  social?: Array<any>;
}
@Component({
  selector: 'app-info',
  imports: [MapComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoComponent {
  profileImage?: string;
  baseUrl = environment.baseUrl;

  userDetails: Iinfo;

  constructor(private _userService: UserService) {
    this.userDetails = {
      name: '',
      specialization: '',
      image: '',
      city: '',
      country: '',
      location: '',
      birth: '',
      summary: '',
      social: [],
    };
  }

  ngOnInit(): void {
    this._userService.currentUser().subscribe({
      next: (data) => {
        this.userDetails = {
          name: `${data.first_name} ${data.last_name}`,
          specialization: data.specialization,
          image: data.image,
          city: data.city,
          country: data.country,
          location: `${data.city} , ${data.country}`,
          summary: data.portfolio.summary,
          birth: data.birth,
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
}
