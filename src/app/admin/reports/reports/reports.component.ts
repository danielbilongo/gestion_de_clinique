import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReportsService, StatCard, AppointmentStats, RevenueStats, PatientStats, DoctorRanking, RecentActivity, MonthlyData, ReportFilters } from '../../../services/reports.service';
import { Subject, takeUntil, catchError, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppHeaderComponent } from '../../../components/app-header/app-header.component';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, AppHeaderComponent],
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, OnDestroy {
  
  // Données
  mainStats: StatCard[] = [];
  appointmentStats: AppointmentStats = {
    total: 0,
    completed: 0,
    cancelled: 0,
    pending: 0,
    today: 0
  };
  revenueStats: RevenueStats = {
    monthly: 0,
    weekly: 0,
    daily: 0,
    growth: 0
  };
  patientStats: PatientStats = {
    total: 0,
    newThisMonth: 0,
    active: 0,
    inactive: 0,
    averageAge: 0
  };
  topDoctors: DoctorRanking[] = [];
  recentActivity: RecentActivity[] = [];
  monthlyData: MonthlyData[] = [];

  // États
  loading = false;
  error = '';
  useDemoData = false;

  // Filtres
  selectedPeriod = 'month';
  selectedReport = 'overview';
  filters: ReportFilters = {
    period: 'month'
  };

  private destroy$ = new Subject<void>();

  constructor(private reportsService: ReportsService) {}

  ngOnInit() {
    this.loadReports();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadReports() {
    this.loading = true;
    this.error = '';
    
    // Mettre à jour les filtres
    this.filters.period = this.selectedPeriod;

    // Charger les données depuis le backend
    this.loadMainStats();
    this.loadAppointmentStats();
    this.loadRevenueStats();
    this.loadPatientStats();
    this.loadTopDoctors();
    this.loadRecentActivity();
    this.loadMonthlyData();
  }

  private loadMainStats() {
    this.reportsService.getMainStats(this.filters)
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => {
          console.error('Erreur lors du chargement des statistiques principales:', error);
          this.useDemoData = true;
          return this.reportsService.getDemoData().pipe(
            map(data => data.mainStats)
          );
        })
      )
      .subscribe({
        next: (stats) => {
          this.mainStats = stats;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erreur:', error);
          this.error = 'Erreur lors du chargement des données';
          this.loading = false;
        }
      });
  }

  private loadAppointmentStats() {
    this.reportsService.getAppointmentStats(this.filters)
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => {
          console.error('Erreur lors du chargement des statistiques de rendez-vous:', error);
          return this.reportsService.getDemoData().pipe(
            map(data => data.appointmentStats)
          );
        })
      )
      .subscribe({
        next: (stats) => {
          this.appointmentStats = stats;
        },
        error: (error) => {
          console.error('Erreur:', error);
        }
      });
  }

  private loadRevenueStats() {
    this.reportsService.getRevenueStats(this.filters)
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => {
          console.error('Erreur lors du chargement des statistiques de revenus:', error);
          return this.reportsService.getDemoData().pipe(
            map(data => data.revenueStats)
          );
        })
      )
      .subscribe({
        next: (stats) => {
          this.revenueStats = stats;
        },
        error: (error) => {
          console.error('Erreur:', error);
        }
      });
  }

  private loadPatientStats() {
    this.reportsService.getPatientStats(this.filters)
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => {
          console.error('Erreur lors du chargement des statistiques de patients:', error);
          return this.reportsService.getDemoData().pipe(
            map(data => data.patientStats)
          );
        })
      )
      .subscribe({
        next: (stats) => {
          this.patientStats = stats;
        },
        error: (error) => {
          console.error('Erreur:', error);
        }
      });
  }

  private loadTopDoctors() {
    this.reportsService.getTopDoctors(this.filters)
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => {
          console.error('Erreur lors du chargement du classement des médecins:', error);
          return this.reportsService.getDemoData().pipe(
            map(data => data.topDoctors)
          );
        })
      )
      .subscribe({
        next: (doctors) => {
          this.topDoctors = doctors;
        },
        error: (error) => {
          console.error('Erreur:', error);
        }
      });
  }

  private loadRecentActivity() {
    this.reportsService.getRecentActivity(this.filters)
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => {
          console.error('Erreur lors du chargement de l\'activité récente:', error);
          return this.reportsService.getDemoData().pipe(
            map(data => data.recentActivity)
          );
        })
      )
      .subscribe({
        next: (activity) => {
          this.recentActivity = activity;
        },
        error: (error) => {
          console.error('Erreur:', error);
        }
      });
  }

  private loadMonthlyData() {
    this.reportsService.getMonthlyData(this.filters)
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => {
          console.error('Erreur lors du chargement des données mensuelles:', error);
          return this.reportsService.getDemoData().pipe(
            map(data => data.monthlyData)
          );
        })
      )
      .subscribe({
        next: (data) => {
          this.monthlyData = data;
        },
        error: (error) => {
          console.error('Erreur:', error);
        }
      });
  }

  generateReport() {
    this.loading = true;
    this.reportsService.generateFullReport(this.filters)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          console.log('Rapport généré:', result);
          this.loading = false;
          alert('Rapport généré avec succès!');
        },
        error: (error) => {
          console.error('Erreur lors de la génération du rapport:', error);
          this.loading = false;
          alert('Erreur lors de la génération du rapport');
        }
      });
  }

  exportReport() {
    this.loading = true;
    this.reportsService.exportReport(this.filters, 'pdf')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `rapport-${this.selectedPeriod}-${new Date().toISOString().split('T')[0]}.pdf`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          this.loading = false;
        },
        error: (error) => {
          console.error('Erreur lors de l\'export:', error);
          this.loading = false;
          alert('Erreur lors de l\'export du rapport');
        }
      });
  }

  onPeriodChange() {
    this.loadReports();
  }

  getTrendClass(trend: number): string {
    return trend >= 0 ? 'trend-positive' : 'trend-negative';
  }

  getTrendIcon(trend: number): string {
    return trend >= 0 ? '📈' : '📉';
  }

  calculateCompletionRate(): number {
    if (this.appointmentStats.total === 0) return 0;
    return Math.round((this.appointmentStats.completed / this.appointmentStats.total) * 100);
  }

  calculateCancellationRate(): number {
    if (this.appointmentStats.total === 0) return 0;
    return Math.round((this.appointmentStats.cancelled / this.appointmentStats.total) * 100);
  }

  getRevenueGrowth(): string {
    return this.revenueStats.growth >= 0 ? `+${this.revenueStats.growth}%` : `${this.revenueStats.growth}%`;
  }

  retryLoad() {
    this.error = '';
    this.loadReports();
  }

  getStatCardClass(color: string): string {
    switch(color) {
      case 'blue': return 'border-blue-500';
      case 'green': return 'border-green-500';
      case 'purple': return 'border-purple-500';
      case 'orange': return 'border-orange-500';
      case 'red': return 'border-red-500';
      case 'indigo': return 'border-indigo-500';
      default: return 'border-gray-500';
    }
  }

  getStatIconClass(color: string): string {
    switch(color) {
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'green': return 'bg-green-100 text-green-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      case 'orange': return 'bg-orange-100 text-orange-600';
      case 'red': return 'bg-red-100 text-red-600';
      case 'indigo': return 'bg-indigo-100 text-indigo-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  }
}
