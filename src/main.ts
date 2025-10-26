// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app/core/config/app.routes';
import { AuthRepository } from './app/auth/domain/repositories/auth.repository';
import { AuthRepositoryMock } from './app/auth/infrastructure/api/auth-api.service';
import { AuthService } from './app/auth/infrastructure/services/auth.service';
import { AuthInterceptor } from './app/core/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // aquí puedes agregar otros providers globales
    provideHttpClient(withInterceptors([AuthInterceptor])),
    { provide: AuthRepository, useClass: AuthService },
  ],
});
