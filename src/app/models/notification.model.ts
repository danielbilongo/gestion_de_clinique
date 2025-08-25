export interface NotificationDto {
  id: string;               // Unique identifier for the notification
  objMessage: string;       // Ex: "RDV_REMINDER"
  message: string;          // Display text
  rdvId: number | null;     // Related appointment ID (can be null)
  timestamp: string;        // ISO date string
  recipientType: 'MEDECIN' | 'PATIENT' | 'SECRETAIRE' | 'ADMIN';
  recipientId: number;      // Recipient user ID
  read: boolean;            // Whether the notification has been read
  
  // Optional: Add more specific types for different notification types
  type?: 'APPOINTMENT' | 'SYSTEM' | 'MESSAGE';
  
  // Optional: Sender information if applicable
  senderId?: number;
  senderName?: string;
  
  // Optional: Additional data specific to the notification type
  data?: any;
}