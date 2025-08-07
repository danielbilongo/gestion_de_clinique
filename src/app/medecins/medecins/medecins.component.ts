import { Component, OnInit } from '@angular/core';
import { Medecin } from '../../models/medecin.model';
import { MedecinService } from '../../services/medecin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-medecins',
  imports: [CommonModule, FormsModule],
  templateUrl: './medecins.component.html',
  styleUrl: './medecins.component.css'
})
export class MedecinsComponent implements OnInit {

  medecins: Medecin[] = [];
  search: string = '';

  get filteredMedecins(): Medecin[] {
    return this.medecins.filter(m =>
      m.nom.toLowerCase().includes(this.search.toLowerCase()) ||
      m.specialite?.toLowerCase().includes(this.search.toLowerCase()) ||
      m.email?.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  constructor(private service: MedecinService) {}

  ngOnInit() {
      this.service.getAll().subscribe(data => this.medecins = data);
  }

  delete(id: number) {

      this.service.delete(id).subscribe(() => {
      this.medecins = this.medecins.filter(m => m.id !== id);

    });
  }

}
