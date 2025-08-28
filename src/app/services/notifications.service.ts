import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface Notification {
  id: number;
  objMessage: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  // ✅ Toujours une valeur initiale : 0
  private unreadCountSubject = new BehaviorSubject<number>(0);
  unreadCount$ = this.unreadCountSubject.asObservable();

  constructor() {
    // Exemple de données initiales
    const initialNotifications: Notification[] = [
      {
        id: 1,
        objMessage: 'Nouveau rendez-vous',
        message: 'Vous avez un rendez-vous demain à 10h.',
        timestamp: new Date(),
        isRead: false,
        type: 'info'
      },
      {
        id: 2,
        objMessage: 'Message reçu',
        message: 'Un patient vous a envoyé un message.',
        timestamp: new Date(),
        isRead: true,
        type: 'success'
      }
    ];

    // ✅ J’initialise la liste et le compteur directement
    this.notificationsSubject.next(initialNotifications);
    this.updateUnreadCount(initialNotifications);
  }

  /** 🔔 Ajouter une notification */
  addNotification(notification: Notification) {
    const current = this.notificationsSubject.value;
    const updated = [notification, ...current];
    this.notificationsSubject.next(updated);
    this.updateUnreadCount(updated);
  }

  /** ✅ Marquer une notification comme lue */
  markAsRead(id: number) {
    const updated = this.notificationsSubject.value.map(n =>
      n.id === id ? { ...n, isRead: true } : n
    );
    this.notificationsSubject.next(updated);
    this.updateUnreadCount(updated);
  }

  /** ✅ Tout marquer comme lu */
  markAllAsRead() {
    const updated = this.notificationsSubject.value.map(n => ({ ...n, isRead: true }));
    this.notificationsSubject.next(updated);
    this.updateUnreadCount(updated);
  }

  /** 🔄 Met à jour le compteur */
  private updateUnreadCount(notifs: Notification[]) {
    const unread = notifs.filter(n => !n.isRead).length;
    this.unreadCountSubject.next(unread); // ✅ Jamais null, toujours un nombre
  }
}
