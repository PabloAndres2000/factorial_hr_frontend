import { Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../shared/components/inputs/input.component';
import { DropdownMenuComponent } from '../shared/menu/dropdown-menu.component';
interface DashboardStats {
  activeEmployees: number;
  inactiveEmployees: number;
  paidSettlements: number;
  pendingApprovals: number;
  attendanceRate: number;
  upcomingShifts: number;
  avgHoursWorked: number;
}

interface RecentActivity {
  id: number;
  type: 'settlement' | 'attendance' | 'shift';
  employee: string;
  action: string;
  time: string;
  status: 'completed' | 'pending' | 'active';
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

  ngOnInit(): void {
    this.currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Simulate API call with setTimeout
    setTimeout(() => {
      this.stats = {
        activeEmployees: 247,
        inactiveEmployees: 12,
        paidSettlements: 189,
        pendingApprovals: 8,
        attendanceRate: 94.5,
        upcomingShifts: 156,
        avgHoursWorked: 42.3,
      };

      this.recentActivities = [
        {
          id: 1,
          type: 'settlement',
          employee: 'Sarah Johnson',
          action: 'Settlement processed',
          time: '2 minutes ago',
          status: 'completed',
        },
        {
          id: 2,
          type: 'attendance',
          employee: 'Michael Chen',
          action: 'Checked in',
          time: '15 minutes ago',
          status: 'active',
        },
        {
          id: 3,
          type: 'shift',
          employee: 'Emily Rodriguez',
          action: 'Shift swap requested',
          time: '1 hour ago',
          status: 'pending',
        },
        {
          id: 4,
          type: 'settlement',
          employee: 'David Kim',
          action: 'Settlement approved',
          time: '2 hours ago',
          status: 'completed',
        },
        {
          id: 5,
          type: 'attendance',
          employee: 'Jessica Martinez',
          action: 'Checked out',
          time: '3 hours ago',
          status: 'completed',
        },
      ];

      this.loading = false;
    }, 800);
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
