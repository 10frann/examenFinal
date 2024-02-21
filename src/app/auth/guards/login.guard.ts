import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const service = inject(AuthService)
  const router = inject(Router)
  if (service.estarLogueado()){
    return true
  } else {
    router.navigateByUrl('/auth/error')
    return false;
  }
};
