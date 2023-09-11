export type VerifyUserKeyResponse = {
  userInterventionId: string;
  interventionId: string;
  sessionId: Nullable<string>;
  healthClinicId: Nullable<string>;
  multipleFillSessionAvailable: boolean;
};
