import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class AutocompleteComponent implements OnInit {
  @Input() label = 'Buscar';
  @Input() placeholder = 'Escribe algo...';
  @Input() variant: 'login' | 'dashboard' | 'secondary' = 'dashboard';
  @Input() options: string[] = [];
  @Input() loading = false;

  control = new FormControl('');
  filteredOptions$!: Observable<string[]>;
  panelOpen = false;

  ngOnInit() {
    this.filteredOptions$ = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) => option.toLowerCase().includes(filterValue));
  }

  clear(): void {
    this.control.setValue('');
    this.panelOpen = false;
  }

  onSelect(option: string): void {
    this.control.setValue(option);
    this.panelOpen = false;
    console.log('Seleccionado:', option);
  }
}
