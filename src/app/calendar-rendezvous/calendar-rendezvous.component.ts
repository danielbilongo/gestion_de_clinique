import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar-rendezvous',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-rendezvous.component.html',
  styleUrls: ['./calendar-rendezvous.component.css']
})
export class CalendarRendezvousComponent implements OnInit {
  events = [
    { title: 'Consultation Paul Kamga', date: '2024-06-10' },
    { title: 'Suivi Marie Tchoumi', date: '2024-06-11' },
    { title: 'Urgence Jean Nguem', date: '2024-06-12' }
  ];

  ngOnInit() {
    // L'intégration FullCalendar JS/TS se fait ici (voir doc officielle)
  }
}
