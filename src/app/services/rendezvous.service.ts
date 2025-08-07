import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RendezVous } from '../models/rendezvous.model';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {
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

  // Supprimer un rendez-vous
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_CONFIG.BASE_URL}${API_CONFIG.RENDEZVOUS.DELETE.replace('{id}', id.toString())}`);
  }

  // Annuler un rendez-vous
  cancel(id: number): Observable<any> {
    return this.http.delete(`${API_CONFIG.BASE_URL}${API_CONFIG.RENDEZVOUS.CANCEL.replace('{id}', id.toString())}`);
  }

  // Récupérer les rendez-vous à venir
  getUpcoming(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${API_CONFIG.BASE_URL}${API_CONFIG.RENDEZVOUS.UPCOMING}`);
  }

  // Récupérer les rendez-vous entre deux dates
  getBetweenDates(start: string, end: string, medecinId?: number): Observable<RendezVous[]> {
    let params = new HttpParams()
      .set('start', start)
      .set('end', end);
    
    if (medecinId) {
      params = params.set('medecinId', medecinId.toString());
    }
    
    return this.http.get<RendezVous[]>(`${API_CONFIG.BASE_URL}${API_CONFIG.RENDEZVOUS.BETWEEN_DATES}`, { params });
  }

  // Rechercher des rendez-vous
  search(searchDTO: any): Observable<RendezVous[]> {
    return this.http.post<RendezVous[]>(`${API_CONFIG.BASE_URL}${API_CONFIG.RENDEZVOUS.SEARCH}`, searchDTO);
  }

  // Méthodes de compatibilité
  getAllRendezVous(): Observable<RendezVous[]> {
    return this.getAll();
  }

  getRendezVousById(id: number): Observable<RendezVous> {
    return this.getById(id);
  }

  createRendezVous(rdv: RendezVous): Observable<RendezVous> {
    return this.create(rdv);
  }

  updateRendezVous(id: number, rdv: RendezVous): Observable<RendezVous> {
    return this.update(id, rdv);
  }

  deleteRendezVous(id: number): Observable<void> {
    return this.delete(id);
  }

  cancelRendezVous(id: number): Observable<any> {
    return this.cancel(id);
  }

  getUpcomingRendezVousForMedecin(medecinId: number): Observable<RendezVous[]> {
    return this.getUpcoming();
  }

  getRendezVousBetweenDates(startDate: string, endDate: string): Observable<RendezVous[]> {
    return this.getBetweenDates(startDate, endDate);
  }

  searchRendezVous(searchDto: any): Observable<RendezVous[]> {
    return this.search(searchDto);
  }
}