export type VerifyUserKeyResponse = {
  interventionId: string;
  sessionId: Nullable<string>;
  healthClinicId: Nullable<string>;
  multipleFillSessionAvailable: boolean;
};
