import { Component, signal, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { LoginUseCase } from '../../../application/login.use-case';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { LoginCredentials } from '../../../domain/models/user.model';
import { AuthRepository } from '../../../domain/repositories/auth.repository';
import { AuthService } from '../../../infrastructure/services/auth.service';

declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, AuthFormComponent],
  providers: [{ provide: AuthRepository, useClass: AuthService }],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  // Si quieres, agrega tu client id en environment y cámbialo aquí
  // IMPORTANTE: Este Client ID debe estar configurado en Google Cloud Console
  // con los dominios autorizados: http://localhost:4200 y https://localhost:4200
  private readonly GOOGLE_CLIENT_ID =
    '246849265305-l1fqk4ejhnhldup6ibc8pulqsokfsnq9.apps.googleusercontent.com';

  constructor(
    private loginUseCase: LoginUseCase,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Solo ejecutar en el navegador, no en el servidor
    if (isPlatformBrowser(this.platformId)) {
      this.loadGoogleScript();
    }
  }

  // Login tradicional
  onFormSubmit(credentials: LoginCredentials): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.loginUseCase.execute(credentials).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        this.errorMessage.set(
          error?.message || 'Error al iniciar sesión. Por favor, intente nuevamente.'
        );
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  // Carga el script de Google de forma dinámica
  private loadGoogleScript(): void {
    // Verificar que estamos en el navegador
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Verificar si ya está cargado
    if (typeof google !== 'undefined' && google?.accounts?.id) {
      console.log('Google Identity Services ya está cargado');
      this.initializeGoogleSignIn();
      return;
    }

    // Verificar si el script ya existe en el DOM
    const existingScript = document.querySelector('script[src*="accounts.google.com/gsi/client"]');
    if (existingScript) {
      console.log('Script de Google ya existe, esperando carga...');
      this.waitForGoogleScript();
      return;
    }

    // Crear y cargar el script dinámicamente
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log('Script de Google cargado dinámicamente');
      this.initializeGoogleSignIn();
    };

    script.onerror = () => {
      console.error('Error al cargar el script de Google');
      this.errorMessage.set('Error al cargar Google Sign-In. Verifica tu conexión a internet.');
    };

    document.head.appendChild(script);
  }

  // Método de respaldo con timeout
  private waitForGoogleScript(): void {
    // Verificar que estamos en el navegador
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    let attempts = 0;
    const maxAttempts = 30; // Máximo 3 segundos (30 * 100ms)

    const checkGoogleScript = () => {
      attempts++;

      if (typeof google !== 'undefined' && google?.accounts?.id) {
        console.log('Google Identity Services cargado correctamente');
        this.initializeGoogleSignIn();
        return;
      }

      if (attempts >= maxAttempts) {
        console.warn('Timeout: Google Identity Services no se cargó');
        this.errorMessage.set('Google Sign-In no está disponible. Usa el formulario de login.');
        return;
      }

      setTimeout(checkGoogleScript, 100);
    };

    setTimeout(checkGoogleScript, 100);
  }

  // Inicializa el botón / flujo de Google Identity Services
  private initializeGoogleSignIn(): void {
    // Verificar que estamos en el navegador
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      google.accounts.id.initialize({
        client_id: this.GOOGLE_CLIENT_ID,
        callback: (response: any) => this.handleGoogleResponse(response),
        error_callback: (error: any) => this.handleGoogleError(error),
      });

      // renderiza el botón dentro del contenedor con id 'googleSignInButton'
      const container = document.getElementById('googleSignInButton');
      if (container) {
        google.accounts.id.renderButton(container, {
          theme: 'outline',
          size: 'large',
          width: 280,
        });
      }
    } catch (error) {
      console.error('Error al inicializar Google Sign-In:', error);
      this.handleGoogleError(error);
    }
  }

  // Maneja errores de Google Sign-In
  private handleGoogleError(error: any): void {
    console.error('Error de Google Sign-In:', error);

    let errorMessage = 'Error al cargar Google Sign-In. ';

    if (error?.type === 'popup_closed_by_user') {
      errorMessage += 'El usuario cerró la ventana de login.';
    } else if (error?.type === 'popup_blocked') {
      errorMessage += 'El navegador bloqueó la ventana emergente.';
    } else if (error?.status === 403) {
      errorMessage += 'Error 403: Verifica la configuración del Client ID en Google Cloud Console.';
    } else {
      errorMessage += 'Verifica tu conexión a internet y la configuración del proyecto.';
    }

    this.errorMessage.set(errorMessage);
  }

  // Maneja la respuesta de Google (id_token) y llama al use-case
  private handleGoogleResponse(response: any): void {
    const idToken = response?.credential;
    if (!idToken) {
      this.errorMessage.set('No se recibió token de Google.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    // Usas el método que agregaste en LoginUseCase
    this.loginUseCase.loginWithGoogle(idToken).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error login Google:', err);
        this.errorMessage.set('Error al iniciar sesión con Google.');
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
