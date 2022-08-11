import { InterventionSharedTo, InterventionStatus } from 'models/Intervention';

export type CommonQuestionProps = {
  isNarratorTab: boolean;
  interventionStatus: InterventionStatus;
  sharedTo: InterventionSharedTo;
};
