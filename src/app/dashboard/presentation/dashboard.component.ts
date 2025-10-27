import { Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../shared/components/inputs/input.component';
import { DropdownMenuComponent } from '../../shared/components/dropdown-menu/dropdown-menu.component';
import {
  DashboardUseCase,
  DashboardStats,
  RecentActivity,
} from '../application/dashboard.use-case';

import { AuthService } from '../../auth/infrastructure/services/auth.service';

interface UserMenuItem {
  label: string;
  icon: string;
  action: () => void;
  type?: 'default' | 'danger';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputComponent, DropdownMenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats = {
    activeEmployees: 0,
    inactiveEmployees: 0,
    paidSettlements: 0,
    pendingApprovals: 0,
    attendanceRate: 0,
    upcomingShifts: 0,
    avgHoursWorked: 0,
  };

  recentActivities: RecentActivity[] = [];
  currentMonth = '';
  loading = true;

  searchQuery = '';
  searchControl = new FormControl('');
  notificationCount = 3;
  isUserMenuOpen = false;
  userName = 'John Anderson';
  userEmail = 'john.anderson@company.com';
  userAvatar = 'assets/images/yo_photoshop.jpeg';

  // Ahora definimos el menú del usuario de forma legible y reutilizable
  userMenuItems: UserMenuItem[] = [
    {
      label: 'Mi Perfil',
      icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',
      action: () => this.viewProfile(),
    },
    {
      label: 'Logout',
      icon: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17 L21 12 16 7 M21 12 L9 12',
      type: 'danger',
      action: () => this.logout(),
    },
  ];

  constructor(private dashboardUseCase: DashboardUseCase, private authService: AuthService) {}

  ngOnInit(): void {
    this.currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.dashboardUseCase.loadDashboardData().subscribe({
      next: (data) => {
        this.stats = data.stats;
        this.recentActivities = data.activities;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.loading = false;
      },
    });
  }

  getStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      completed: 'status-completed',
      pending: 'status-pending',
      active: 'status-active',
    };
    return statusClasses[status] || '';
  }

  getTypeIcon(type: string): string {
    const icons: { [key: string]: string } = {
      settlement: '💰',
      attendance: '📋',
      shift: '🔄',
    };
    return icons[type] || '📌';
  }

  refreshData(): void {
    this.loading = true;
    this.loadDashboardData();
  }

  onSearch(): void {
    console.log('[v0] Searching for:', this.searchControl.value);
    // Implement search logic here
  }

  toggleNotifications(): void {
    console.log('[v0] Notifications clicked');
    // Implement notifications panel logic here
  }

  openSettings(): void {
    console.log('[v0] Settings clicked');
    // Navigate to settings page or open settings modal
  }

  viewProfile(): void {
    console.log('[v0] View profile clicked');
    this.isUserMenuOpen = false;
    // Navigate to profile page
  }

  logout(): void {
    this.isUserMenuOpen = false;
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
      },
      error: (error) => {
        console.error('Error during logout:', error);
        // Si hay error, igual limpiamos el token local
        localStorage.removeItem('token');
      },
    });
  }
}
