import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { Medecin } from '../models/medecin.model';
import { Patient } from '../models/patient.model';
import { Secretaire } from '../models/secretaire.model';
import { API_CONFIG } from '../config/api.config';
import { AuthService } from './auth.service';

export interface User {
  id: number;
  nom: string;
  role: string;
  email: string;
  statut: string;
  password?: string;
  photo?: string;
  // Champs spécifiques selon le rôle
  specialite?: string; // Pour médecin
  telephone?: string;
  adresse?: string;
  dateNaissance?: string;
  numeroSecuriteSociale?: string; // Pour patient
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Récupérer tous les utilisateurs (médecins, secrétaires, patients)
  getAllUsers(): Observable<User[]> {
    const headers = this.getAuthHeaders();
    
    return forkJoin({
      medecins: this.http.get<Medecin[]>(`${API_CONFIG.BASE_URL}${API_CONFIG.MEDECIN.ALL}`, { headers }),
      secretaires: this.http.get<Secretaire[]>(`${API_CONFIG.BASE_URL}${API_CONFIG.SECRETAIRE.ALL}`, { headers }),
      patients: this.http.get<Patient[]>(`${API_CONFIG.BASE_URL}${API_CONFIG.PATIENT.ALL}`, { headers })
    }).pipe(
      map(result => {
        const users: User[] = [];
        
        // Convertir les médecins
        result.medecins.forEach(medecin => {
          users.push({
            id: medecin.id || 0,
            nom: medecin.nom,
            role: 'Médecin',
            email: medecin.email,
            statut: 'Active', // Vous pouvez ajuster selon votre logique
            specialite: medecin.specialite,
            telephone: medecin.telephone,
            photo: medecin.photo || 'assets/images/users/default-doctor.svg'
          });
        });

        // Convertir les secrétaires
        result.secretaires.forEach(secretaire => {
          users.push({
            id: secretaire.id || 0,
            nom: secretaire.nom,
            role: 'Secrétaire',
            email: secretaire.email,
            statut: 'Active',
            telephone: secretaire.telephone,
            photo: secretaire.photo || 'assets/images/users/default-secretary.svg'
          });
        });

        // Convertir les patients
        result.patients.forEach(patient => {
          users.push({
            id: patient.id || 0,
            nom: patient.nom,
            role: 'Patient',
            email: patient.email || '',
            statut: 'Active',
            telephone: patient.telephone,
            adresse: patient.adresse,
            dateNaissance: patient.dateNaissance,
            numeroSecuriteSociale: patient.numeroSecuriteSociale,
            photo: patient.photo || 'assets/images/users/default-patient.svg'
          });
        });

        return users;
      })
    );
  }

  // Créer un utilisateur selon son rôle
  createUser(user: User): Observable<any> {
    const headers = this.getAuthHeaders();
    
    switch (user.role) {
      case 'Médecin':
        const medecinData: Partial<Medecin> = {
          nom: user.nom,
          email: user.email,
          specialite: user.specialite,
          telephone: user.telephone,
          photo: user.photo
        };
        return this.http.post(`${API_CONFIG.BASE_URL}${API_CONFIG.MEDECIN.CREATE}`, medecinData, { headers });
        
      case 'Secrétaire':
        const secretaireData: Partial<Secretaire> = {
          nom: user.nom,
          email: user.email,
          telephone: user.telephone,
          photo: user.photo
        };
        return this.http.post(`${API_CONFIG.BASE_URL}${API_CONFIG.SECRETAIRE.CREATE}`, secretaireData, { headers });
        
      case 'Patient':
        const patientData: Partial<Patient> = {
          nom: user.nom,
          email: user.email,
          telephone: user.telephone,
          adresse: user.adresse,
          dateNaissance: user.dateNaissance,
          numeroSecuriteSociale: user.numeroSecuriteSociale,
          photo: user.photo
        };
        return this.http.post(`${API_CONFIG.BASE_URL}${API_CONFIG.PATIENT.CREATE}`, patientData, { headers });
        
      default:
        throw new Error('Type d\'utilisateur non supporté');
    }
  }

  // Mettre à jour un utilisateur
  updateUser(user: User): Observable<any> {
    const headers = this.getAuthHeaders();
    
    switch (user.role) {
      case 'Médecin':
        const medecinData: Partial<Medecin> = {
          id: user.id,
          nom: user.nom,
          email: user.email,
          specialite: user.specialite,
          telephone: user.telephone,
          photo: user.photo
        };
        return this.http.put(`${API_CONFIG.BASE_URL}${API_CONFIG.MEDECIN.UPDATE.replace('{id}', user.id.toString())}`, medecinData, { headers });
        
      case 'Secrétaire':
        const secretaireData: Partial<Secretaire> = {
          id: user.id,
          nom: user.nom,
          email: user.email,
          telephone: user.telephone,
          photo: user.photo
        };
        return this.http.put(`${API_CONFIG.BASE_URL}${API_CONFIG.SECRETAIRE.UPDATE.replace('{id}', user.id.toString())}`, secretaireData, { headers });
        
      case 'Patient':
        const patientData: Partial<Patient> = {
          id: user.id,
          nom: user.nom,
          email: user.email,
          telephone: user.telephone,
          adresse: user.adresse,
          dateNaissance: user.dateNaissance,
          numeroSecuriteSociale: user.numeroSecuriteSociale,
          photo: user.photo
        };
        return this.http.put(`${API_CONFIG.BASE_URL}${API_CONFIG.PATIENT.UPDATE.replace('{id}', user.id.toString())}`, patientData, { headers });
        
      default:
        throw new Error('Type d\'utilisateur non supporté');
    }
  }

  // Supprimer un utilisateur
  deleteUser(user: User): Observable<any> {
    const headers = this.getAuthHeaders();
    
    switch (user.role) {
      case 'Médecin':
        return this.http.delete(`${API_CONFIG.BASE_URL}${API_CONFIG.MEDECIN.DELETE.replace('{id}', user.id.toString())}`, { headers });
        
      case 'Secrétaire':
        return this.http.delete(`${API_CONFIG.BASE_URL}${API_CONFIG.SECRETAIRE.DELETE.replace('{id}', user.id.toString())}`, { headers });
        
      case 'Patient':
        return this.http.delete(`${API_CONFIG.BASE_URL}${API_CONFIG.PATIENT.DELETE.replace('{id}', user.id.toString())}`, { headers });
        
      default:
        throw new Error('Type d\'utilisateur non supporté');
    }
  }
}
