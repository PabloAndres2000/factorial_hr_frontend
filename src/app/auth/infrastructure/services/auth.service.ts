import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthApi } from '../http/auth.api';
import { LoginCredentials, AuthResponse, User } from '../../domain/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthRepository {
  private readonly tokenKey = 'token';

  constructor(private authApi: AuthApi, private router: Router) {}

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.authApi.login(credentials).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.token);
        this.router.navigate(['/dashboard']);
      })
    );
  }

  logout(): Observable<void> {
    return this.authApi.logout().pipe(
      tap(() => {
        localStorage.removeItem(this.tokenKey);
        this.router.navigate(['/auth/login']);
      })
    );
  }

  getCurrentUser(): Observable<User | null> {
    return this.authApi.getCurrentUser();
  }

  refreshToken(): Observable<AuthResponse> {
    return this.authApi.refreshToken().pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.token);
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
