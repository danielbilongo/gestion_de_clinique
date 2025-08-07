import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from '../../../components/app-header/app-header.component';

@Component({
  selector: 'app-dashboard-medecin',
  standalone: true,
  imports: [CommonModule, AppHeaderComponent],
  templateUrl: './dashboard-medecin.component.html',
  styleUrls: ['./dashboard-medecin.component.css']
})
export class DashboardMedecinComponent {
  medecin = 'Bilongo';
  totalPatients = 22;
  rdvToday = 3;
  upcomingRdv = 5;

  prochainsRdv = [
    { heure: '09:00', patient: 'Paul Kamga', type: 'Consultation' },
    { heure: '10:30', patient: 'Marie Tchoumi', type: 'Suivi' },
    { heure: '14:00', patient: 'Jean Nguem', type: 'Urgence' }
  ];

  patientsRisque = [
    { nom: 'Paul Kamga', info: 'Hypertension' },
    { nom: 'Jean Nguem', info: 'Diabète' }
  ];

  activiteRecente = [
    { icon: '💊', desc: 'Prescription envoyée à Marie Tchoumi', time: 'il y a 2h' },
    { icon: '📄', desc: 'Compte-rendu ajouté pour Paul Kamga', time: 'hier' },
    { icon: '💬', desc: 'Message reçu de la secrétaire', time: 'hier' }
  ];
}
