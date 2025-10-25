import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../auth/infrastructure/services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      // Usuario autenticado: puede acceder a la ruta
      return true;
    } else {
      // No está autenticado: redirigir a login
      return this.router.createUrlTree(['/login']);
    }
  }
}
