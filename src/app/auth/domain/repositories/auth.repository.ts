import { Observable } from 'rxjs';
import { LoginCredentials, AuthResponse, User } from '../models/user.model';

export abstract class AuthRepository {
  abstract login(credentials: LoginCredentials): Observable<AuthResponse>;
  abstract logout(): Observable<void>;
  abstract getCurrentUser(): Observable<User | null>;
  abstract refreshToken(): Observable<AuthResponse>;
  abstract isAuthenticated(): boolean;
}
