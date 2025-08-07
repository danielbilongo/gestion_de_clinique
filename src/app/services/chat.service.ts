import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ChatMessageRequestDto, ChatMessageDto, UnreadMessageCounts } from '../models/chat.model';
import { AuthService } from './auth.service';
import { API_CONFIG } from '../config/api.config';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: WebSocket | null = null;
  private messagesSubject = new BehaviorSubject<ChatMessageDto[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  private unreadCountsSubject = new BehaviorSubject<UnreadMessageCounts>({});
  public unreadCounts$ = this.unreadCountsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // Initialiser la connexion WebSocket
  initializeWebSocket(): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      return;
    }

    this.socket = new WebSocket(API_CONFIG.WEBSOCKET.URL);

    this.socket.onopen = () => {
      console.log('WebSocket connecté');
      // Envoyer le token d'authentification
      const token = this.authService.getToken();
      if (token) {
        this.socket?.send(JSON.stringify({ type: 'auth', token }));
      }
    };

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.handleIncomingMessage(message);
    };

    this.socket.onclose = () => {
      console.log('WebSocket déconnecté');
      // Tentative de reconnexion après 5 secondes
      setTimeout(() => {
        this.initializeWebSocket();
      }, 5000);
    };

    this.socket.onerror = (error) => {
      console.error('Erreur WebSocket:', error);
    };
  }

  // Envoyer un message via WebSocket
  sendMessage(receiverId: number, content: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const message: ChatMessageRequestDto = {
        receiverId,
        content
      };
      this.socket.send(JSON.stringify({ type: 'message', data: message }));
    }
  }

  // Marquer les messages comme lus
  markAsRead(senderId: number): void {
    this.http.post(`${API_CONFIG.BASE_URL}${API_CONFIG.CHAT.MARK_READ.replace('{senderId}', senderId.toString())}`, {})
      .subscribe(() => {
        this.updateMessageReadStatus(senderId);
      });
  }

  // Récupérer une conversation
  getConversation(otherUserId: number): Observable<ChatMessageDto[]> {
    return this.http.get<ChatMessageDto[]>(`${API_CONFIG.BASE_URL}${API_CONFIG.CHAT.CONVERSATION.replace('{otherUserId}', otherUserId.toString())}`);
  }

  // Récupérer les messages non lus
  getUnreadMessages(): Observable<ChatMessageDto[]> {
    return this.http.get<ChatMessageDto[]>(`${API_CONFIG.BASE_URL}${API_CONFIG.CHAT.UNREAD}`);
  }

  // Récupérer le nombre de messages non lus par expéditeur
  getUnreadMessageCounts(): Observable<UnreadMessageCounts> {
    return this.http.get<UnreadMessageCounts>(`${API_CONFIG.BASE_URL}${API_CONFIG.CHAT.UNREAD}/counts`);
  }

  // Charger une conversation
  loadConversation(otherUserId: number): void {
    this.getConversation(otherUserId).subscribe(messages => {
      this.messagesSubject.next(messages);
    });
  }

  // Déconnecter le WebSocket
  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  // Vérifier si le WebSocket est connecté
  isConnected(): boolean {
    return this.socket !== null && this.socket.readyState === WebSocket.OPEN;
  }

  // Gérer les messages entrants
  private handleIncomingMessage(message: any): void {
    if (message.type === 'chat_message') {
      const currentMessages = this.messagesSubject.value;
      const newMessage: ChatMessageDto = message.data;
      this.messagesSubject.next([...currentMessages, newMessage]);
    } else if (message.type === 'unread_counts') {
      this.unreadCountsSubject.next(message.data);
    }
  }

  // Mettre à jour le statut de lecture des messages
  private updateMessageReadStatus(senderId: number): void {
    const currentMessages = this.messagesSubject.value;
    const updatedMessages = currentMessages.map(msg => 
      msg.senderId === senderId ? { ...msg, isRead: true } : msg
    );
    this.messagesSubject.next(updatedMessages);
  }
} 