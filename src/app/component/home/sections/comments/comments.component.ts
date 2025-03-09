import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-comments',
  imports: [TranslateModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent {
  comments: any = [
    {
      id: 1,
      name: 'sara Mahmoud',
      jop: 'developer',
      rate: 5,
      comment:
        'Anima’s Landing Page UI Kit has become a staple in my design toolkit. This kit has everything I need to get the job done quickly and efficiently.',
      time: '12:0:0',
      img:""
    },
    {
      id: 2,
      name: 'Ahmed Mansour',
      jop: 'UI/UX',
      rate: 3,
      comment:
        'The Landing Page UI Kit has been a game changer. The pre-designed components and templates have helped us deliver projects faster!',
      time: '1:30:18',
      img:""
    },
  ];
}
