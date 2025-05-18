import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from '../../Class/token.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiUrl: string = environment.api;
  private token: string | null = null;

  constructor(private _http: HttpClient, private _token: Token) {
    this.token = this._token.getToken();
  }

  createPortfolio(formValue: any): Observable<any> {
    const formData = new FormData();

    // Append top-level fields
    formData.append('summary', formValue.summary);
    formData.append('graduate', formValue.graduate);
    formData.append('user_id', formValue.user_id);

    // Append educations
    formValue.educations.forEach((edu: any, index: number) => {
      formData.append(`educations[${index}][education]`, edu.education);
      formData.append(
        `educations[${index}][specialization]`,
        edu.specialization
      );
      formData.append(`educations[${index}][start_date]`, edu.start_date);
      formData.append(`educations[${index}][end_date]`, edu.end_date);
      formData.append(`educations[${index}][description]`, edu.description);
      formData.append(`educations[${index}][user_id]`, edu.user_id);
    });
    formValue.skills.forEach((skill: any, index: number) => {
      formData.append(`skills[${index}][title]`, skill.title);
      formData.append(`skills[${index}][user_id]`, skill.user_id);
    });
    formValue.language.forEach((lang: any, index: number) => {
      formData.append(`language[${index}][title]`, lang.title);
      formData.append(`language[${index}][user_id]`, lang.user_id);
    });

    // Append experiences
    formValue.experiences.forEach((exp: any, index: number) => {
      formData.append(`experiences[${index}][company]`, exp.company);
      formData.append(`experiences[${index}][role]`, exp.role);
      formData.append(`experiences[${index}][start_date]`, exp.start_date);
      formData.append(`experiences[${index}][end_date]`, exp.end_date);
      // formData.append(`experiences[${index}][description]`, exp.description);
      formData.append(`experiences[${index}][user_id]`, exp.user_id);
    });

    // Append projects
    formValue.projects.forEach((proj: any, index: number) => {
      formData.append(`projects[${index}][title]`, proj.title);
      formData.append(
        `projects[${index}][short_description]`,
        proj.short_description
      );
      formData.append(`projects[${index}][description]`, proj.description);
      if (proj.image instanceof File) {
        formData.append(
          `projects[${index}][image]`,
          proj.image,
          proj.image.name
        );
      }
      formData.append(`projects[${index}][link]`, proj.link);
      formData.append(`projects[${index}][user_id]`, proj.user_id);
    });

    // Append certifications
    formValue.certifications.forEach((cert: any, index: number) => {
      formData.append(`certifications[${index}][title]`, cert.title);
      if (cert.image instanceof File) {
        formData.append(
          `certifications[${index}][image]`,
          cert.image,
          cert.image.name
        );
      }
      formData.append(`certifications[${index}][link]`, cert.link);
      formData.append(`certifications[${index}][user_id]`, cert.user_id);
    });

    return this._http.post(`${this.apiUrl}/portfolio/create`, formData);
  }

  updateProjects(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/project/update`, data);
  }

  addProject(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/project/create`, data);
  }
  deleteProject(id: number): Observable<any> {
    return this._http.post(`${this.apiUrl}/project/delete`, { id: id });
  }

  updateCertifications(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/certification/update`, data);
  }

  addCertification(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/certification/create`, data);
  }
  deleteCertification(id: number): Observable<any> {
    return this._http.post(`${this.apiUrl}/certification/delete`, { id: id });
  }

  updateEducations(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/education/update`, data);
  }

  addEducation(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/education/create`, data);
  }
  deleteEducation(id: number): Observable<any> {
    return this._http.post(`${this.apiUrl}/education/delete`, { id: id });
  }

  updateExperience(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/experience/update`, data);
  }

  addExperience(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/experience/create`, data);
  }

  deleteExperience(id: number): Observable<any> {
    return this._http.post(`${this.apiUrl}/experience/delete`, { id: id });
  }


  updateInfo(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/info/update`, data);
  }


  deleteLanguage(id: number): Observable<any> {
    return this._http.post(`${this.apiUrl}/info/deleteLang`, { id: id });
  }
  deleteSkill(id: number): Observable<any> {
    return this._http.post(`${this.apiUrl}/info/deleteSkill`, { id: id });
  }

  changeImage(data : any):Observable<any>{
    return this._http.post(`${this.apiUrl}/info/changeImage`, data);
  }

}
