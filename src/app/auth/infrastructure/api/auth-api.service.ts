// src/app/auth/infrastructure/api/auth-api.service.ts

import { Injectable } from '@angular/core';
import { Observable, of, throwError, delay } from 'rxjs';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { LoginCredentials, AuthResponse, User } from '../../domain/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthRepositoryMock extends AuthRepository {
  private mockUser: User = {
    id: '1',
    email: 'admin@example.com',
    name: 'Administrador',
    avatar: 'https://i.pravatar.cc/150?img=3', // opcional
    role: 'admin',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    const { email, password } = credentials;

    // ✅ Valores momentáneos
    if (email === 'admin@example.com' && password === '123456') {
      const response: AuthResponse = {
        token: 'fake-jwt-token',
        user: this.mockUser,
      };
      // simulamos una demora de red
      return of(response).pipe(delay(1000));
    }

    return throwError(() => new Error('Correo o contraseña incorrectos'));
  }

  logout(): Observable<void> {
    return of(void 0);
  }

  getCurrentUser(): Observable<User | null> {
    return of(this.mockUser);
  }

  refreshToken(): Observable<AuthResponse> {
    return of({ token: 'new-fake-token', user: this.mockUser });
  }

  isAuthenticated(): boolean {
    return true;
  }

  loginWithGoogle(idToken: string): Observable<AuthResponse> {
    // Simula una autenticación exitosa vía Google OAuth
    const response: AuthResponse = {
      token: 'fake-google-jwt-token',
      user: this.mockUser,
    };
    // Se puede tener una ligera demora para simular la red, como en login.
    return of(response).pipe(delay(1000));
  }
}
