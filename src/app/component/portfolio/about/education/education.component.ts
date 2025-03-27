import { Component } from '@angular/core';

@Component({
  selector: 'app-education',
  imports: [],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {


  user_details = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '1234567890',
    education : [
      {
       id:1 ,
       title: 'Bachelor of Science in Computer Science',
       institution: 'University of Technology',
       start_at : "2024" ,
       end_at : "now"
      } ,
      {
       id:2 ,
       title: 'Bachelor of Civil engineering',
       institution: 'Faculty of Engineering',
       start_at : "2017" ,
       end_at : "2021"
      }
    ] ,
    experience : [
      {
        id:1 ,
        title: 'Software Engineer',
        company: 'ABC Company',
        start_at : "2024" ,
        end_at : "now"
      },
      {
        id:2 ,
        title: 'Front End Developer',
        company: 'Gwan Company',
        start_at : "2020" ,
        end_at : "2024"
      },
    ]
  }


  public get userEducation()  {
    return this.user_details.education ;
  }
  public get userExperience()  {
    return this.user_details.experience ;
  }



}
