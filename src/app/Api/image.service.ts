import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl: string = environment.api;
  private currentImageSubject = new BehaviorSubject<string>('');
  public currentImage = this.currentImageSubject.asObservable();

  constructor(private _http: HttpClient) {}

  changeImage(data: FormData): Observable<any> {
    return this._http.post(`${this.apiUrl}/info/changeImage`, data).pipe(
      tap((response: any) => {
        if (response.image_path) {
          this.setCurrentImage(response.image_path);
        }
      })
    );
  }

  setCurrentImage(imagePath: string): void {
    this.currentImageSubject.next(imagePath);
  }
}
