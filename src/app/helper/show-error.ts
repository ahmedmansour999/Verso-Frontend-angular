import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root', 
})

export class ShowError {
  extractErrorMessages(errorObj: any): string[] {
    const messages: string[] = [];

    const extract = (obj: any) => {
      if (typeof obj === 'string') {
        messages.push(obj);
      } else if (Array.isArray(obj)) {
        obj.forEach((item) => extract(item));
      } else if (typeof obj === 'object') {
        Object.values(obj).forEach((value) => extract(value));
      }
    };

    extract(errorObj);
    return messages;
  }
}
