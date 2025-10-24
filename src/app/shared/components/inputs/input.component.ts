import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() control!: AbstractControl;

  get formControl(): FormControl {
    return this.control as FormControl;
  }

  getErrorMessage(): string {
    if (this.control.hasError('required')) {
      return `${this.label || 'Este campo'} es obligatorio.`;
    }
    if (this.control.hasError('email')) {
      return 'Por favor ingresa un correo electrónico válido.';
    }
    if (this.control.hasError('minlength')) {
      const requiredLength = this.control.getError('minlength').requiredLength;
      return `Debe tener al menos ${requiredLength} caracteres.`;
    }
    if (this.control.hasError('maxlength')) {
      const requiredLength = this.control.getError('maxlength').requiredLength;
      return `No puede tener más de ${requiredLength} caracteres.`;
    }
    return 'Campo inválido.';
  }
}
