import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppHeaderComponent } from "../../components/app-header/app-header.component";

@Component({
  selector: 'app-rendezvous',
  standalone: true,
  imports: [CommonModule, FormsModule, AppHeaderComponent],
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent {
  rendezvous = [
    { id: 1, patient: 'Paul Kamga', date: '2024-06-10', heure: '09:00', motif: 'Consultation' },
    { id: 2, patient: 'Marie Tchoumi', date: '2024-06-10', heure: '10:30', motif: 'Suivi' }
  ];
  search = '';
  selectedRdv: any = null;
  showForm = false;
  isEdit = false;

  get filteredRdv() {
    return this.rendezvous.filter(r => r.patient.toLowerCase().includes(this.search.toLowerCase()));
  }

  addRdv() {
    this.selectedRdv = { patient: '', date: '', heure: '', motif: '' };
    this.isEdit = false;
    this.showForm = true;
  }
  editRdv(r: any) {
    this.selectedRdv = { ...r };
    this.isEdit = true;
    this.showForm = true;
  }
  saveRdv() {
    if (this.isEdit) {
      const idx = this.rendezvous.findIndex(r => r.id === this.selectedRdv.id);
      if (idx > -1) this.rendezvous[idx] = { ...this.selectedRdv };
    } else {
      this.selectedRdv.id = Date.now();
      this.rendezvous.push({ ...this.selectedRdv });
    }
    this.showForm = false;
  }
  deleteRdv(id: number) {
    this.rendezvous = this.rendezvous.filter(r => r.id !== id);
  }
  cancel() {
    this.showForm = false;
  }
}