
import { AbstractControl, ValidatorFn } from "@angular/forms";



export function tagValidators(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
      const tags = control.value;
      if (!Array.isArray(tags)) {
          return { invalidTag: true };
      }
      for (const tag of tags) {
          if (typeof tag !== 'string' || !tag.startsWith('#')) {
              return { invalidTag: true };
          }
      }
      return null;
  };
}
