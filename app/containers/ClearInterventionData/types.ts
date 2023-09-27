import { SensitiveDataState } from 'models/Intervention';

export type ClearInterventionDataModalState = {
  interventionId: string;
  initialSensitiveDataState: SensitiveDataState;
  initialClearSensitiveDataScheduledAt: Nullable<string>;
};

export type ClearInterventionDataFormValues = {
  delay: string;
};
