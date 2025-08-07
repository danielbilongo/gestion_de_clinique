import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages = [
    { from: 'Secrétaire', text: 'Bonjour, comment puis-je vous aider ?', time: '09:00' },
    { from: 'Médecin', text: 'Merci, pouvez-vous envoyer le dossier de Paul ?', time: '09:01' }
  ];
  newMessage = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ from: 'Secrétaire', text: this.newMessage, time: new Date().toLocaleTimeString().slice(0,5) });
      this.newMessage = '';
    }
  }
}
