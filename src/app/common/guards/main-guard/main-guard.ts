import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const mainGuard: CanActivateFn = (route, state) => {
  const cookiesService = inject(CookieService);
  let router = inject(Router);
  if (cookiesService.get('token')) return router.parseUrl('/home');

  return true;
};
