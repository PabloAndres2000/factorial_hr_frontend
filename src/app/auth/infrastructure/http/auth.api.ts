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
    const options = {
      headers: {
        Authorization: `Token d41e099da8caa49a5fd944ec383ed7b43e108e92`,
      },
      responseType: 'json' as const, // asegura que Angular interprete la respuesta como JSON
    };

    console.log('loginWithGoogle call:', { url, body, options });

    return this.http.post<AuthResponse>(url, body, options);
  }
}
