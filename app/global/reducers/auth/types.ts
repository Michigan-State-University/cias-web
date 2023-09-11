import { User } from 'models/User';

export type VerifyUserKeyResponse = {
  redirectData: {
    userInterventionId: string;
    interventionId: string;
    sessionId: Nullable<string>;
    healthClinicId: Nullable<string>;
    multipleFillSessionAvailable: boolean;
  };
  user: User;
};
