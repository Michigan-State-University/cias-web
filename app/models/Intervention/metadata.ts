import { InterventionStatus } from './Intervention';

export type InterventionStatusMetadata = {
  isEditable: boolean;
};

export const STATUS_METADATA: Record<
  InterventionStatus,
  InterventionStatusMetadata
> = {
  [InterventionStatus.DRAFT]: {
    isEditable: true,
  },
  [InterventionStatus.PUBLISHED]: {
    isEditable: false,
  },
  [InterventionStatus.CLOSED]: {
    isEditable: false,
  },
  [InterventionStatus.ARCHIVED]: {
    isEditable: false,
  },
};
