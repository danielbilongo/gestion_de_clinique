
export interface RendezVous {
  id?: number;
  patient: string;
  medecin: string;
  dateHeureDebut: string;
  dateHeureFin: string;
  duree: number;
  salle: string;
  motif: string;
  statut: 'Planifié' | 'Annulé' | 'Terminé';
  notes?: string;
}