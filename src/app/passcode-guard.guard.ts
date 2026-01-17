import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

const getSessionWithExpiry = (key: string) => {
  const item = sessionStorage.getItem(key);
  if (!item) return null;
  const data = JSON.parse(item);
  if (Date.now() > data.expiredAt) {
    sessionStorage.removeItem(key);
    return null;
  }
  return data.value;
};

export const passcodeGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isPasscodeValue = getSessionWithExpiry('passcode');
  if (!isPasscodeValue) {
    router.navigate(['/passcode']);
    return false;
  }
  return true;
};
