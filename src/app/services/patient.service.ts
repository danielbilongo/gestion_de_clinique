import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Patient } from '../models/patient.model';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  // Inject HttpClient pour effectuer les appels HTTP
  constructor(private http: HttpClient) { }

  // Préparer les headers avec Content-Type JSON
  private getDefaultHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  /**
   * Récupérer tous les patients
   */
  getAll(): Observable<Patient[]> {
    const headers = this.getDefaultHeaders();
    return this.http.get<Patient[]>(`${API_CONFIG.BASE_URL}${API_CONFIG.PATIENT.ALL}`, { headers })
      .pipe(
        catchError(error => this.handleError<Patient[]>('getAll', [], error))
      );
  }

  /**
   * Créer un nouveau patient
   * @param patient Patient à créer
   */
  create(patient: Patient): Observable<Patient> {
    const headers = this.getDefaultHeaders();
    return this.http.post<Patient>(`${API_CONFIG.BASE_URL}${API_CONFIG.PATIENT.CREATE}`, patient, { headers })
      .pipe(
        catchError(error => this.handleError<Patient>('create', undefined, error))
      );
  }

  /**
   * Mettre à jour un patient existant
   * @param id ID du patient à mettre à jour
   * @param patient Patient avec les données mises à jour
   */
  update(id: number, patient: Patient): Observable<Patient> {
    const headers = this.getDefaultHeaders();
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.PATIENT.UPDATE.replace('{id}', id.toString())}`;
    return this.http.put<Patient>(url, patient, { headers })
      .pipe(
        catchError(error => this.handleError<Patient>('update', undefined, error))
      );
  }

  /**
   * Supprimer un patient par ID
   * @param id ID du patient à supprimer
   */
  delete(id: number): Observable<void> {
    const headers = this.getDefaultHeaders();
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.PATIENT.DELETE.replace('{id}', id.toString())}`;
    return this.http.delete<void>(url, { headers })
      .pipe(
        catchError(error => this.handleError<void>('delete', undefined, error))
      );
  }

  /**
   * Trouver un patient par ID
   * @param id ID du patient à retrouver
   */
  findById(id: number): Observable<Patient> {
    const headers = this.getDefaultHeaders();
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.PATIENT.BY_ID.replace('{id}', id.toString())}`;
    return this.http.get<Patient>(url, { headers })
      .pipe(
        catchError(error => this.handleError<Patient>('findById', undefined, error))
      );
  }

  // Méthodes de compatibilité
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

  /**
   * Gestion centralisée des erreurs HTTP
   * @param operation Nom de l’opération ayant échoué
   * @param result Valeur optionnelle de retour pour garder le flux
   * @param error L’erreur interceptée
   */
  private handleError<T>(operation = 'operation', result?: T, error?: HttpErrorResponse): Observable<T> {
    console.error(`${operation} failed:`, error); // Affiche erreur dans la console
    // Ici vous pouvez ajouter une gestion d’erreur plus avancée (notifications, logging, etc.)
    return of(result as T); // Retourne une valeur par défaut pour que l’app ne plante pas
  }
}
