import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginUseCase } from '../../../application/login.use-case';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { LoginCredentials } from '../../../domain/models/user.model';
import { AuthRepository } from '../../../domain/repositories/auth.repository';
import { AuthRepositoryMock } from '../../../infrastructure/api/auth-api.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, AuthFormComponent],
  providers: [{ provide: AuthRepository, useClass: AuthRepositoryMock }],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor(private loginUseCase: LoginUseCase, private router: Router) {}

  onFormSubmit(credentials: LoginCredentials): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.loginUseCase.execute(credentials).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        this.errorMessage.set(
          error.message || 'Error al iniciar sesión. Por favor, intente nuevamente.'
        );
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
