import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private http: HttpClient) { }

  // Récupérer tous les patients
  getAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${API_CONFIG.BASE_URL}${API_CONFIG.PATIENT.ALL}`);
  }

  // Créer un patient
  create(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${API_CONFIG.BASE_URL}${API_CONFIG.PATIENT.CREATE}`, patient);
  }

  // Mettre à jour un patient
  update(id: number, patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${API_CONFIG.BASE_URL}${API_CONFIG.PATIENT.UPDATE.replace('{id}', id.toString())}`, patient);
  }

  // Supprimer un patient
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_CONFIG.BASE_URL}${API_CONFIG.PATIENT.DELETE.replace('{id}', id.toString())}`);
  }

  // Trouver un patient par ID
  findById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${API_CONFIG.BASE_URL}${API_CONFIG.PATIENT.BY_ID.replace('{id}', id.toString())}`);
  }

  // Méthode de compatibilité
  findAll(): Observable<Patient[]> {
    return this.getAll();
  }

  createPatient(patient: Patient): Observable<Patient> {
    return this.create(patient);
  }

  updatePatient(id: number, patient: Patient): Observable<Patient> {
    return this.update(id, patient);
  }

  deletePatient(id: number): Observable<void> {
    return this.delete(id);
  }
}


