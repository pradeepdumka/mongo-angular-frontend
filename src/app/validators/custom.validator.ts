import { AbstractControl } from '@angular/forms';

export function checkPassword(
  contorl: AbstractControl
): { [key: string]: boolean } | null {
  const password = contorl.get('password');
  const confirmpassword = contorl.get('confirmpassword');
  if (password?.pristine || confirmpassword?.pristine) {
    return null;
  }
  return password && confirmpassword && password.value !== confirmpassword.value
    ? { paswordMisMAtch: true }
    : null;
}
