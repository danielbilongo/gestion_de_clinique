import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent {
  patients = [
    { id: 1, nom: 'Paul Kamga', age: 45, tel: '699123456', pathologie: 'Hypertension' },
    { id: 2, nom: 'Marie Tchoumi', age: 32, tel: '677654321', pathologie: 'Diabète' }
  ];
  search = '';
  selectedPatient: any = null;
  showForm = false;
  isEdit = false;

  get filteredPatients() {
    return this.patients.filter(p => p.nom.toLowerCase().includes(this.search.toLowerCase()));
  }

  addPatient() {
    this.selectedPatient = { nom: '', age: '', tel: '', pathologie: '' };
    this.isEdit = false;
    this.showForm = true;
  }
  editPatient(p: any) {
    this.selectedPatient = { ...p };
    this.isEdit = true;
    this.showForm = true;
  }
  savePatient() {
    if (this.isEdit) {
      const idx = this.patients.findIndex(p => p.id === this.selectedPatient.id);
      if (idx > -1) this.patients[idx] = { ...this.selectedPatient };
    } else {
      this.selectedPatient.id = Date.now();
      this.patients.push({ ...this.selectedPatient });
    }
    this.showForm = false;
  }
  deletePatient(id: number) {
    this.patients = this.patients.filter(p => p.id !== id);
  }
  cancel() {
    this.showForm = false;
  }
}
