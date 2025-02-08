import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function checkAvailableEmail(): ValidatorFn{

  return(control : AbstractControl): ValidationErrors | null =>{
    const email = control.value;

    // Check if the email is already taken
    if(email === 'ahmed@gmail.com'){
      return { takenEmail: true };
    }

    return null; 
  }

}
