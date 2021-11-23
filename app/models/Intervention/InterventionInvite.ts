export interface InterventionInvite {
  id: string;
  email: string;
  healthClinicId?: string;
}

// ! TODO: Change it after @bartosz-kepka-htd merges his PR
export interface InterventionInviteDTO {
  email: string;
  health_clinic_id?: string;
}
