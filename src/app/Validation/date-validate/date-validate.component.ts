import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateFormatValidator(): ValidatorFn {


  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;



    


    if (!value) {
      return null; // If the field is empty, don't validate
    }

    // Check if the value is a valid Date object
    if (!(value instanceof Date) || isNaN(value.getTime())) {
      return { invalidDate: true };
    }

    const today = new Date();
    if (value > today) {
      return { futureDate: true }; // Return error if the date is in the future
    }

    return null; // Return null if the date is valid
  };
}
