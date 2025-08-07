import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from '../../services/prescription.service';
import { Prescription } from '../../models/prescription.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
})
export class PrescriptionComponent implements OnInit {
  prescriptions: Prescription[] = [];
  search: string = '';

  get filteredPrescriptions(): Prescription[] {
    return this.prescriptions.filter(p =>
      p.date?.toLowerCase().includes(this.search.toLowerCase()) ||
      p.PatientId?.toString().includes(this.search) ||
      p.medecinId?.toString().includes(this.search) ||
      p.medicaments?.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  constructor(private prescriptionService: PrescriptionService) {}

  ngOnInit(): void {
    this.prescriptionService.getAll().subscribe(data => this.prescriptions = data);
  }
}