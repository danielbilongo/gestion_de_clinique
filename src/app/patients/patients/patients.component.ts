import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../services/patient.service';
import { AppHeaderComponent } from "../../components/app-header/app-header.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
  imports: [AppHeaderComponent, FormsModule, CommonModule]
})
export class PatientsComponent implements OnInit {

  patients: Patient[] = [];
  search = '';
  selectedPatient: Patient | null = null;
  showForm = false;
  isEdit = false;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  // Charger la liste des patients depuis le backend et vérifier les IDs
  loadPatients(): void {
    this.patientService.getAll().subscribe({
      next: patients => {
        this.patients = patients;
        console.log('Patients chargés:', this.patients);
      },
      error: err => console.error('Erreur chargement patients', err)
    });
  }

  // Filtrer les patients selon la recherche
  get filteredPatients(): Patient[] {
    const term = this.search.toLowerCase();
    return this.patients.filter(p => p.nom.toLowerCase().includes(term));
  }

  // Préparer formulaire ajout (sans id, qui sera généré par le backend)
  addPatient(): void {
    this.selectedPatient = {
      nom: '',
      prenom: '',
      dateNaissance: '',
      sexe: 'Homme',
      telephone: '',
      email: '',
      adresse: '',
      photo: ''
    };
    this.isEdit = false;
    this.showForm = true;
  }

  // Préparer formulaire modification avec copie du patient existant
  editPatient(patient: Patient): void {
    this.selectedPatient = { ...patient };
    this.isEdit = true;
    this.showForm = true;
  }

  // Sauvegarder un patient (création ou mise à jour avec validation d'id)
  savePatient(): void {
    if (!this.selectedPatient) {
      console.error('Aucun patient sélectionné');
      return;
    }

    if (this.isEdit) {
      if (this.selectedPatient.id === undefined || this.selectedPatient.id === null || this.selectedPatient.id <= 0) {
        console.error('Impossible de mettre à jour : ID patient manquant ou invalide');
        return;
      }
      this.patientService.update(this.selectedPatient.id, this.selectedPatient).subscribe({
        next: () => {
          this.loadPatients();
          this.showForm = false;
          this.selectedPatient = null;
        },
        error: err => console.error('Erreur mise à jour patient', err)
      });
    } else {
      this.patientService.create(this.selectedPatient).subscribe({
        next: () => {
          this.loadPatients();
          this.showForm = false;
          this.selectedPatient = null;
        },
        error: err => console.error('Erreur création patient', err)
      });
    }
  }

  // Supprimer un patient après vérification de l'id valide
  deletePatient(id?: number): void {
    if (id === undefined || id === null || id <= 0) {
      console.error('Impossible de supprimer : ID patient manquant ou invalide');
      return;
    }

    if (!confirm('Voulez-vous vraiment supprimer ce patient ?')) {
      return;
    }

    this.patientService.delete(id).subscribe({
      next: () => this.loadPatients(),
      error: err => console.error('Erreur suppression patient', err)
    });
  }

  // Annuler ajout/modification
  cancel(): void {
    this.showForm = false;
    this.selectedPatient = null;
  }
}
