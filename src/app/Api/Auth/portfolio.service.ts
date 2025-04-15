import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from '../../Class/token.service';
import { Portfolio } from '../../interface/portfolio/portfolio';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiUrl: string = environment.api;
  private token: string | null = null;

  // This holds the form data you want to send (needs to be set before calling createInfo)
  public formData: Portfolio = {
    summary: '',
    graduate: new Date(),
    educations: [],
    projects: [],
    certifications: [],
    experiences: [],
  };

  constructor(private _http: HttpClient, private _token: Token) {
    this.token = this._token.getToken();
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });
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
      formData.append(
        `certifications[${index}][user_id]`,
        cert.user_id
      );
    });

    return this._http.post(`${this.apiUrl}/portfolio/create`, formData);
  }

  public createEducations(): Observable<any> {
    return this._http.post(
      `${this.apiUrl}/education/create`,
      this.formData.educations);
  }
  public createExperiences(): Observable<any> {
    return this._http.post(
      `${this.apiUrl}/experience/create`,
      this.formData.experiences
    );
  }
  public createProjects(): Observable<any> {
    return this._http.post(
      `${this.apiUrl}/project/create`,
      this.formData.projects
    );
  }
  public createCertifications(): Observable<any> {
    return this._http.post(
      `${this.apiUrl}/certification/create`,
      this.formData.certifications
    );
  }
}
