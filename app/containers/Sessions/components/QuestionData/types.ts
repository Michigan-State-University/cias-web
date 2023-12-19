import {
  InterventionSharedTo,
  InterventionStatus,
  InterventionStatusMetadata,
} from 'models/Intervention';

import { LanguageDirection } from 'global/types/locale';

export type CommonQuestionProps = {
  isNarratorTab: boolean;
  interventionStatus: InterventionStatus;
  sharedTo: InterventionSharedTo;
  statusMetadata: InterventionStatusMetadata;
  editingPossible: boolean;
  dynamicElementsDirection: LanguageDirection;
};
