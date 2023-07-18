import {
  InterventionSharedTo,
  InterventionStatus,
  InterventionStatusMetadata,
} from 'models/Intervention';

export type CommonQuestionProps = {
  isNarratorTab: boolean;
  interventionStatus: InterventionStatus;
  sharedTo: InterventionSharedTo;
  statusMetadata: InterventionStatusMetadata;
  editingPossible: boolean;
};
