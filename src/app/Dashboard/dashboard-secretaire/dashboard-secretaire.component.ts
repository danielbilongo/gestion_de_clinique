import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';
import { FooterComponent } from "../../components/app-footer/footer.component";

@Component({
  selector: 'app-dashboard-secretaire',
  standalone: true,
  imports: [CommonModule, AppHeaderComponent, FooterComponent],
  templateUrl: './dashboard-secretaire.component.html',
  styleUrls: ['./dashboard-secretaire.component.css']
})
export class DashboardSecretaireComponent implements OnInit {
  rdvTotal = 125;
  patientsDuJour = 25;
  medecinsActifs = 8;
  rdvAujourdHui = 16;

  notifications = [
    { type: 'info', label: 'Nouveau patient', text: 'Paul Kamga ajouté ce matin.' },
    { type: 'alert', label: 'Annulation RDV', text: 'Dr Bilongo absent à 14:00.' },
    { type: 'info', label: 'Tâche', text: 'Imprimer factures de la semaine.' }
  ];

  prochainsRdv = [
    { heure: '09:00', patient: 'Paul Kamga', type: 'Consultation' },
    { heure: '10:30', patient: 'Marie Tchoumi', type: 'Suivi' },
    { heure: '14:00', patient: 'Jean Nguem', type: 'Urgence' }
  ];

  tachesDuJour = [
    'Vérifier les dossiers patients',
    'Confirmer les RDV de demain',
    'Envoyer les rappels SMS'
  ];

  roleDebug: string | null = null;

  ngOnInit() {
    const user = localStorage.getItem('user');
    this.roleDebug = user ? JSON.parse(user).role : null;
    console.log('ROLE COURANT (debug):', this.roleDebug);
  }
}
