import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

// I really prefer the class-based approach to avoid the service locator anti-pattern.
export const authDenyGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const isLogged = authService.isLoggedIn();
  if (!isLogged) {
    const router = inject(Router);
    router.navigate(["/error/401"]);
  }

  return isLogged;
};

export const authRedirectLoginGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const isLogged = authService.isLoggedIn();
  if (!isLogged) {
    const router = inject(Router);
    router.navigate(
      ["/login"],
      { queryParams: { redirectUrl: route.url } });
  }

  return isLogged;
};
