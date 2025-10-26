// src/app/auth/application/logout.use-case.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRepository } from '../domain/repositories/auth.repository';
import { LoginCredentials, AuthResponse } from '../domain/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  execute(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.authRepository.login(credentials);
  }

  loginWithGoogle(idToken: string): Observable<AuthResponse> {
    return this.authRepository.loginWithGoogle(idToken);
  }
}
