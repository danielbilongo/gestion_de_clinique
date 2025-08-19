import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

export interface DashboardStats {
  totalPatients: number;
  totalAppointments: number;
  totalRevenue: number;
  totalUsers: number;
  activeAppointments: number;
  pendingAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  newPatientsThisMonth: number;
  revenueThisMonth: number;
  systemHealth: SystemHealth;
}

export interface SystemHealth {
  databaseUsage: number;
  serverStatus: 'online' | 'offline' | 'warning';
  lastBackup: string;
  activeUsers: number;
  systemLoad: number;
}

export interface RecentActivity {
  id: string;
  type: 'user_created' | 'user_updated' | 'appointment_created' | 'payment_received' | 'system_alert';
  title: string;
  description: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'error' | 'success';
  icon: string;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
}

export interface UserSummary {
  id: string;
  name: string;
  role: 'admin' | 'medecin' | 'secretaire';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  avatar?: string;
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${API_CONFIG.BASE_URL}/api`;

  constructor(private http: HttpClient) {}

  // Récupérer les statistiques principales du dashboard
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/dashboard/stats`)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du chargement des statistiques:', error);
          return of(this.getDemoDashboardStats());
        })
      );
  }

  // Récupérer l'activité récente
  getRecentActivity(): Observable<RecentActivity[]> {
    return this.http.get<RecentActivity[]>(`${this.apiUrl}/dashboard/recent-activity`)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du chargement de l\'activité récente:', error);
          return of(this.getDemoRecentActivity());
        })
      );
  }

  // Récupérer les actions rapides
  getQuickActions(): Observable<QuickAction[]> {
    return this.http.get<QuickAction[]>(`${this.apiUrl}/dashboard/quick-actions`)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du chargement des actions rapides:', error);
          return of(this.getDemoQuickActions());
        })
      );
  }

  // Récupérer les utilisateurs récents
  getRecentUsers(): Observable<UserSummary[]> {
    return this.http.get<UserSummary[]>(`${this.apiUrl}/dashboard/recent-users`)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du chargement des utilisateurs récents:', error);
          return of(this.getDemoRecentUsers());
        })
      );
  }

  // Récupérer les alertes
  getAlerts(): Observable<Alert[]> {
    return this.http.get<Alert[]>(`${this.apiUrl}/dashboard/alerts`)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du chargement des alertes:', error);
          return of(this.getDemoAlerts());
        })
      );
  }

  // Marquer une alerte comme lue
  markAlertAsRead(alertId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/dashboard/alerts/${alertId}/read`, {});
  }

  // Récupérer la santé du système
  getSystemHealth(): Observable<SystemHealth> {
    return this.http.get<SystemHealth>(`${this.apiUrl}/dashboard/system-health`)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du chargement de la santé du système:', error);
          return of(this.getDemoSystemHealth());
        })
      );
  }

  // Données de démonstration
  private getDemoDashboardStats(): DashboardStats {
    return {
      totalPatients: 1250,
      totalAppointments: 320,
      totalRevenue: 253000,
      totalUsers: 15,
      activeAppointments: 45,
      pendingAppointments: 23,
      completedAppointments: 285,
      cancelledAppointments: 12,
      newPatientsThisMonth: 45,
      revenueThisMonth: 253000,
      systemHealth: this.getDemoSystemHealth()
    };
  }

  private getDemoRecentActivity(): RecentActivity[] {
    return [
      {
        id: '1',
        type: 'user_created',
        title: 'Nouveau Compte Médecin',
        description: 'Dr. Louis Kamdem ajouté par Admin',
        timestamp: 'Il y a 2h',
        severity: 'success',
        icon: '👨‍⚕️'
      },
      {
        id: '2',
        type: 'user_updated',
        title: 'Mise à jour du profil',
        description: 'Secrétaire Mme. Marie - profil mis à jour',
        timestamp: 'Il y a 4h',
        severity: 'info',
        icon: '👩‍💼'
      },
      {
        id: '3',
        type: 'appointment_created',
        title: 'Nouveau rendez-vous',
        description: 'Patient M. Dupont - RDV confirmé pour 14h30',
        timestamp: 'Il y a 6h',
        severity: 'success',
        icon: '📅'
      },
      {
        id: '4',
        type: 'payment_received',
        title: 'Paiement reçu',
        description: '25,000 FCFA - Consultation Dr. Louis',
        timestamp: 'Il y a 8h',
        severity: 'success',
        icon: '💳'
      },
      {
        id: '5',
        type: 'system_alert',
        title: 'Alerte système',
        description: 'Base de données à 80% de capacité',
        timestamp: 'Il y a 12h',
        severity: 'warning',
        icon: '⚠️'
      }
    ];
  }

  private getDemoQuickActions(): QuickAction[] {
    return [
      {
        id: '1',
        title: 'Ajouter Utilisateur',
        description: 'Créer un nouveau compte',
        icon: '👤',
        route: '/admin/users',
        color: '#1fa183'
      },
      {
        id: '2',
        title: 'Gérer Rendez-vous',
        description: 'Voir tous les RDV',
        icon: '📅',
        route: '/rendez-vous',
        color: '#2a80ec'
      },
      {
        id: '3',
        title: 'Rapports',
        description: 'Générer des rapports',
        icon: '📊',
        route: '/admin/reports',
        color: '#14d260'
      },
      {
        id: '4',
        title: 'Paramètres',
        description: 'Configuration système',
        icon: '⚙️',
        route: '/admin/settings',
        color: '#e07f1b'
      }
    ];
  }

  private getDemoRecentUsers(): UserSummary[] {
    return [
      {
        id: '1',
        name: 'Dr. Louis Kamdem',
        role: 'medecin',
        status: 'active',
        lastLogin: 'Il y a 2h',
        avatar: '👨‍⚕️'
      },
      {
        id: '2',
        name: 'Mme. Marie Dupont',
        role: 'secretaire',
        status: 'active',
        lastLogin: 'Il y a 4h',
        avatar: '👩‍💼'
      },
      {
        id: '3',
        name: 'Dr. John Smith',
        role: 'medecin',
        status: 'active',
        lastLogin: 'Il y a 6h',
        avatar: '👨‍⚕️'
      },
      {
        id: '4',
        name: 'M. Pierre Martin',
        role: 'admin',
        status: 'active',
        lastLogin: 'Il y a 8h',
        avatar: '👨‍💻'
      }
    ];
  }

  private getDemoAlerts(): Alert[] {
    return [
      {
        id: '1',
        type: 'warning',
        title: 'Base de données',
        message: 'Utilisation à 80% de capacité',
        timestamp: 'Il y a 12h',
        read: false
      },
      {
        id: '2',
        type: 'info',
        title: 'Mise à jour système',
        message: 'Nouvelle version disponible',
        timestamp: 'Il y a 1j',
        read: true
      },
      {
        id: '3',
        type: 'success',
        title: 'Sauvegarde',
        message: 'Sauvegarde automatique réussie',
        timestamp: 'Il y a 2j',
        read: true
      }
    ];
  }

  private getDemoSystemHealth(): SystemHealth {
    return {
      databaseUsage: 80,
      serverStatus: 'online',
      lastBackup: 'Il y a 2h',
      activeUsers: 8,
      systemLoad: 65
    };
  }
} 