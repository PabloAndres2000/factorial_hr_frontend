import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface DashboardStats {
  activeEmployees: number;
  inactiveEmployees: number;
  paidSettlements: number;
  pendingApprovals: number;
  attendanceRate: number;
  upcomingShifts: number;
  avgHoursWorked: number;
}

export interface RecentActivity {
  id: number;
  type: 'settlement' | 'attendance' | 'shift';
  employee: string;
  action: string;
  time: string;
  status: 'completed' | 'pending' | 'active';
}

@Injectable({
  providedIn: 'root',
})
export class DashboardUseCase {
  loadDashboardData(): Observable<{ stats: DashboardStats; activities: RecentActivity[] }> {
    // TODO: Replace with real API call
    const mockData = {
      stats: {
        activeEmployees: 247,
        inactiveEmployees: 12,
        paidSettlements: 189,
        pendingApprovals: 8,
        attendanceRate: 94.5,
        upcomingShifts: 156,
        avgHoursWorked: 42.3,
      },
      activities: [
        {
          id: 1,
          type: 'settlement' as const,
          employee: 'Sarah Johnson',
          action: 'Settlement processed',
          time: '2 minutes ago',
          status: 'completed' as const,
        },
        {
          id: 2,
          type: 'attendance' as const,
          employee: 'Michael Chen',
          action: 'Checked in',
          time: '15 minutes ago',
          status: 'active' as const,
        },
        {
          id: 3,
          type: 'shift' as const,
          employee: 'Emily Rodriguez',
          action: 'Shift swap requested',
          time: '1 hour ago',
          status: 'pending' as const,
        },
        {
          id: 4,
          type: 'settlement' as const,
          employee: 'David Kim',
          action: 'Settlement approved',
          time: '2 hours ago',
          status: 'completed' as const,
        },
        {
          id: 5,
          type: 'attendance' as const,
          employee: 'Jessica Martinez',
          action: 'Checked out',
          time: '3 hours ago',
          status: 'completed' as const,
        },
      ],
    };

    return of(mockData).pipe(delay(800));
  }
}
