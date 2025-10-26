// src/app/core/config/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from '../../auth/presentation/pages/login/login.component';
import { DashboardComponent } from '../../dashboard/presentation/dashboard.component';

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
];
