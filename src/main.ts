// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/core/config/app.routes';
import { AuthRepository } from './app/auth/domain/repositories/auth.repository';
import { AuthRepositoryMock } from './app/auth/infrastructure/api/auth-api.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    // aquí puedes agregar otros providers globales
    { provide: AuthRepository, useClass: AuthRepositoryMock },
  ],
});
