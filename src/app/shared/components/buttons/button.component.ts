import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  /** Texto del botón */
  @Input() label!: string;

  /** Tipo de botón */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  /** Color del botón (según Angular Material) */
  @Input() color: 'primary' | 'accent' | 'warn' | undefined = 'primary';

  /** Estado de carga */
  @Input() loading: boolean = false;

  /** Texto mostrado mientras está cargando */
  @Input() loadingText: string = 'Cargando...';

  /** Si el botón está deshabilitado */
  @Input() disabled: boolean = false;

  /** nombre del ícono (por ejemplo 'login' o 'delete') */
  @Input() icon?: string;

  /** Clase de estilo específica según contexto (login, formulario, etc.) */
  @Input() variant: 'login' | 'form' | 'secondary' = 'login';
}
