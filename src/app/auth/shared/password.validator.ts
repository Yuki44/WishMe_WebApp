import { ValidatorFn, AbstractControl } from '@angular/forms';

export function matchingPassword(): ValidatorFn {
  return (repeatedPassword: AbstractControl): {
    [key: string]: any } => {
    const formGroup = repeatedPassword.parent;
    if (formGroup) {
      const password = formGroup.get('password');
      return password.value !== repeatedPassword.value
        ? { 'not-matching-pass': { value: repeatedPassword.value } }
        : null;
    }
    return null;
  };
}
