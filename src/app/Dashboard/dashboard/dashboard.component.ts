import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardService, DashboardStats, RecentActivity, QuickAction, UserSummary, Alert, SystemHealth } from '../../services/dashboard.service';
import { Subject, takeUntil } from 'rxjs';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';
import { FooterComponent } from "../../components/app-footer/footer.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  imports: [CommonModule, RouterModule, AppHeaderComponent, FooterComponent]
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  dashboardStats: DashboardStats = {
    totalPatients: 0,
    totalAppointments: 0,
    totalRevenue: 0,
    totalUsers: 0,
    activeAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    cancelledAppointments: 0,
    newPatientsThisMonth: 0,
    revenueThisMonth: 0,
    systemHealth: {
      databaseUsage: 0,
      serverStatus: 'online',
      lastBackup: '',
      activeUsers: 0,
      systemLoad: 0
    }
  };
  
  recentActivity: RecentActivity[] = [];
  quickActions: QuickAction[] = [];
  recentUsers: UserSummary[] = [];
  alerts: Alert[] = [];
  systemHealth: SystemHealth = {
    databaseUsage: 0,
    serverStatus: 'online',
    lastBackup: '',
    activeUsers: 0,
    systemLoad: 0
  };

  // États
  loading = false;
  error = '';
  useDemoData = false;

  private destroy$ = new Subject<void>();

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadDashboardData() {
    this.loading = true;
    this.error = '';

    // Charger toutes les données en parallèle
    this.loadDashboardStats();
    this.loadRecentActivity();
    this.loadQuickActions();
    this.loadRecentUsers();
    this.loadAlerts();
    this.loadSystemHealth();
  }

  private loadDashboardStats() {
    this.dashboardService.getDashboardStats()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (stats) => {
          this.dashboardStats = stats;
          this.systemHealth = stats.systemHealth;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des statistiques:', error);
          this.error = 'Erreur lors du chargement des données';
          this.loading = false;
        }
      });
  }

  private loadRecentActivity() {
    this.dashboardService.getRecentActivity()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (activity) => {
          this.recentActivity = activity;
        },
        error: (error) => {
          console.error('Erreur lors du chargement de l\'activité récente:', error);
        }
      });
  }

  private loadQuickActions() {
    this.dashboardService.getQuickActions()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (actions) => {
          this.quickActions = actions;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des actions rapides:', error);
        }
      });
  }

  private loadRecentUsers() {
    this.dashboardService.getRecentUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (users) => {
          this.recentUsers = users;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des utilisateurs récents:', error);
        }
      });
  }

  private loadAlerts() {
    this.dashboardService.getAlerts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (alerts) => {
          this.alerts = alerts;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des alertes:', error);
        }
      });
  }

  private loadSystemHealth() {
    this.dashboardService.getSystemHealth()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (health) => {
          this.systemHealth = health;
        },
        error: (error) => {
          console.error('Erreur lors du chargement de la santé du système:', error);
        }
      });
  }

  markAlertAsRead(alertId: string) {
    this.dashboardService.markAlertAsRead(alertId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          // Marquer l'alerte comme lue localement
          const alert = this.alerts.find(a => a.id === alertId);
          if (alert) {
            alert.read = true;
          }
        },
        error: (error) => {
          console.error('Erreur lors du marquage de l\'alerte:', error);
        }
      });
  }

  getUnreadAlertsCount(): number {
    return this.alerts.filter(alert => !alert.read).length;
  }

  getSeverityClass(severity: string): string {
    switch (severity) {
      case 'success': return 'severity-success';
      case 'warning': return 'severity-warning';
      case 'error': return 'severity-error';
      case 'info': return 'severity-info';
      default: return 'severity-info';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'status-active';
      case 'inactive': return 'status-inactive';
      case 'pending': return 'status-pending';
      default: return 'status-inactive';
    }
  }

  getRoleIcon(role: string): string {
    switch (role) {
      case 'admin': return '👨‍💻';
      case 'medecin': return '👨‍⚕️';
      case 'secretaire': return '👩‍💼';
      default: return '👤';
    }
  }

  getSystemStatusClass(): string {
    switch (this.systemHealth.serverStatus) {
      case 'online': return 'status-online';
      case 'offline': return 'status-offline';
      case 'warning': return 'status-warning';
      default: return 'status-offline';
    }
  }

  getDatabaseUsageClass(): string {
    if (this.systemHealth.databaseUsage >= 90) return 'usage-critical';
    if (this.systemHealth.databaseUsage >= 80) return 'usage-warning';
    return 'usage-normal';
  }

  retryLoad() {
    this.error = '';
    this.loadDashboardData();
  }
}
