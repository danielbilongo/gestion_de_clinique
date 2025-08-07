import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prescription } from '../models/prescription.model';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  constructor(private http: HttpClient) { }

  // Récupérer toutes les prescriptions
  getAll(): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(`${API_CONFIG.BASE_URL}${API_CONFIG.PRESCRIPTION.ALL}`);
  }

  // Créer une prescription
  create(prescription: Prescription): Observable<Prescription> {
    return this.http.post<Prescription>(`${API_CONFIG.BASE_URL}${API_CONFIG.PRESCRIPTION.CREATE}`, prescription);
  }

  // Mettre à jour une prescription
  update(id: number, prescription: Prescription): Observable<Prescription> {
    return this.http.put<Prescription>(`${API_CONFIG.BASE_URL}${API_CONFIG.PRESCRIPTION.UPDATE.replace('{id}', id.toString())}`, prescription);
  }

  // Supprimer une prescription
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_CONFIG.BASE_URL}${API_CONFIG.PRESCRIPTION.DELETE.replace('{id}', id.toString())}`);
  }

  // Trouver une prescription par ID
  findById(id: number): Observable<Prescription> {
    return this.http.get<Prescription>(`${API_CONFIG.BASE_URL}${API_CONFIG.PRESCRIPTION.BY_ID.replace('{id}', id.toString())}`);
  }

  // Récupérer les prescriptions par rendez-vous
  getByRendezvousId(rendezvousId: number): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(`${API_CONFIG.BASE_URL}${API_CONFIG.PRESCRIPTION.BY_RDV.replace('{rendezvousId}', rendezvousId.toString())}`);
  }

  // Télécharger le PDF d'une prescription
  downloadPdf(id: number): Observable<Blob> {
    return this.http.get(`${API_CONFIG.BASE_URL}${API_CONFIG.PRESCRIPTION.DOWNLOAD_PDF.replace('{id}', id.toString())}`, {
      responseType: 'blob'
    });
  }

  // Méthodes de compatibilité
  getAllPrescriptions(): Observable<Prescription[]> {
    return this.getAll();
  }

  createPrescription(prescription: Prescription): Observable<Prescription> {
    return this.create(prescription);
  }

  updatePrescription(id: number, prescription: Prescription): Observable<Prescription> {
    return this.update(id, prescription);
  }

  deletePrescription(id: number): Observable<void> {
    return this.delete(id);
  }

  getPrescriptionById(id: number): Observable<Prescription> {
    return this.findById(id);
  }

  getPrescriptionsByRendezvousId(rendezvousId: number): Observable<Prescription[]> {
    return this.getByRendezvousId(rendezvousId);
  }

  downloadPrescriptionPdf(id: number): Observable<Blob> {
    return this.downloadPdf(id);
  }
}
