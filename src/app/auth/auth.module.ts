// src/app/auth/auth.module.ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'; // standalone

@NgModule({
  imports: [
    LoginComponent, // ✅ se importa directamente
    RouterModule.forChild([{ path: 'login', component: LoginComponent }]),
  ],
})
export class AuthModule {}
