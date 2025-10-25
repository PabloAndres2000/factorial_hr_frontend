import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { LoginCredentials, AuthResponse, User } from '../../domain/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  private readonly baseUrl = '/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    // TODO: Replace with real API call
    // For now, simulate API call with mock data
    return of({
      user: {
        id: '1',
        email: credentials.email,
        name: 'Demo User',
        role: 'admin',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      token: 'fake-jwt-token',
    }).pipe(delay(500));
  }

  logout(): Observable<void> {
    // TODO: Replace with real API call
    return of(void 0).pipe(delay(200));
  }

  getCurrentUser(): Observable<User | null> {
    // TODO: Replace with real API call
    const token = localStorage.getItem('token');
    if (!token) {
      return of(null);
    }

    return of({
      id: '1',
      email: 'demo@user.com',
      name: 'Demo User',
      role: 'admin',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).pipe(delay(200));
  }

  refreshToken(): Observable<AuthResponse> {
    // TODO: Replace with real API call
    return of({
      user: {
        id: '1',
        email: 'demo@user.com',
        name: 'Demo User',
        role: 'admin',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      token: 'new-fake-jwt-token',
    }).pipe(delay(300));
  }
}
