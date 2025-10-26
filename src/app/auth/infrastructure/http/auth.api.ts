import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse, LoginCredentials, User } from '../../domain/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  private readonly baseUrl = 'http://localhost:8000/api/authentications';

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login/`, credentials);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/logout/`, {});
  }

  getCurrentUser(): Observable<User | null> {
    return this.http.get<User | null>(`${this.baseUrl}/me/`);
  }

  refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/refresh/`, {});
  }

  // 🆕 Google OAuth
  loginWithGoogle(accessToken: string): Observable<AuthResponse> {
    const url = `${this.baseUrl}/external-login/`;
    const body = { provider: 'google', access_token: accessToken };

    return this.http.post<AuthResponse>(url, body, {
      responseType: 'json',
    });
  }
}
