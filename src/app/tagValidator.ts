// import { AbstractControl, ValidatorFn } from '@angular/forms';

import { AbstractControl, ValidatorFn } from "@angular/forms";

// export function tagValidator(): ValidatorFn {
//     return (control: AbstractControl): { [key: string]: any } | null => {
//         const tags = control.value;
//         if (!Array.isArray(tags)) {
//             return { invalidTag: true };
//         }
//         for (const tag of tags) {
//             if (typeof tag !== 'string' || !tag.match(/^#[a-zA-Z0-9]+$/)) {
//                 return { invalidTag: true };
//             }
//         }
//         return null;
//     };
// }

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
