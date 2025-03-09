import { Component } from '@angular/core';
import { FeactureComponent } from './feacture/feacture.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentFormComponent } from './comment-form/comment-form.component';

@Component({
  selector: 'app-sections',
  imports: [FeactureComponent, OurTeamComponent, CommentsComponent , CommentFormComponent],
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.css',
})
export class SectionsComponent {}
