import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RendezVous } from '../models/rendezvous.model';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {
  getUpcoming() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  // Récupérer tous les rendez-vous
  getAll(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${API_CONFIG.BASE_URL}${API_CONFIG.RENDEZVOUS.ALL}`);
  }

  // Récupérer un rendez-vous par ID
  getById(id: number): Observable<RendezVous> {
    return this.http.get<RendezVous>(`${API_CONFIG.BASE_URL}${API_CONFIG.RENDEZVOUS.BY_ID.replace('{id}', id.toString())}`);
  }

  // Créer un rendez-vous
  create(rdv: RendezVous): Observable<RendezVous> {
    return this.http.post<RendezVous>(`${API_CONFIG.BASE_URL}${API_CONFIG.RENDEZVOUS.CREATE}`, rdv);
  }

  // Mettre à jour un rendez-vous
  update(id: number, rdv: RendezVous): Observable<RendezVous> {
    return this.http.put<RendezVous>(`${API_CONFIG.BASE_URL}${API_CONFIG.RENDEZVOUS.UPDATE.replace('{id}', id.toString())}`, rdv);
  }

  // Supprimer un rendez-vous par ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_CONFIG.BASE_URL}${API_CONFIG.RENDEZVOUS.DELETE.replace('{rendezvousId}', id.toString())}`);
  }

  // Annuler un rendez-vous (supposé être une suppression spéciale)
  cancel(id: number): Observable<any> {
    return this.http.delete(`${API_CONFIG.BASE_URL}${API_CONFIG.RENDEZVOUS.CANCEL.replace('{id}', id.toString())}`);
  }
}
