import { Component } from '@angular/core';
import { MapComponent } from '../../../template/map/map.component';
import { UserService } from '../../../Api/user/user.service';
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
  userDetails: Iinfo = {
    name: '',
    specialization: '',
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    city: '',
    country: '',
    location: '',
    birth: '',
    summary: '',
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
        specialization: data.specialization,
        image:
          data.image ||
          'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
    });
  }
}
