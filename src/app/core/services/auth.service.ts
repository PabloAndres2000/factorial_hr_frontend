import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'token';

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    // TODO: Replace with real API call
    if (email === 'demo@user.com' && password === '1234') {
      localStorage.setItem(this.tokenKey, 'fake-jwt-token');
      this.router.navigate(['/dashboard']);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
