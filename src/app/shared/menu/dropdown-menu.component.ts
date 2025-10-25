import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DropdownItem {
  label: string;
  icon?: string;
  type?: 'default' | 'danger';
  action?: () => void;
}

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [CommonModule], // ✅ esto permite usar *ngIf, *ngFor, ngClass
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
})
export class DropdownMenuComponent {
  @Input() items: DropdownItem[] = [];
  @Input() header?: { title?: string; subtitle?: string; avatarUrl?: string };
  @Input() isOpen: boolean = false;

  @Input() variant: 'dashboard' | 'default' = 'default';

  @Output() toggle = new EventEmitter<boolean>();

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    this.toggle.emit(this.isOpen);
  }

  handleItemClick(item: DropdownItem) {
    if (item.action) item.action();
    this.isOpen = false;
    this.toggle.emit(false);
  }
}
