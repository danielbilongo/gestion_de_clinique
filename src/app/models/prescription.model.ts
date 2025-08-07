

export interface Prescription {
  id?: number;
  PatientId: number;
  medecinId: number;
  date: Date;
  medicaments: string;
  instructions: string;

}
