export interface Patient {
  id?: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  sexe: 'Homme' | 'Femme';
  telephone: string;
  email?: string;
  adresse?: string;
  numeroSecuriteSociale?: string;
  photo?: string;
}