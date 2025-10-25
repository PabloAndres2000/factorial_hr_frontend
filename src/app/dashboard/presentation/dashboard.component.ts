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

  constructor(private dashboardUseCase: DashboardUseCase) {}

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
    console.log('[v0] Logout clicked');
    this.isUserMenuOpen = false;
    // Implement logout logic here
  }
}
