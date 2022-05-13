import { colors } from 'theme';

export enum UserInterventionStatus {
  READY_TO_START = 'ready_to_start',
  IN_PROGRESS = 'in_progress',
  SCHEDULE_PENDING = 'schedule_pending',
  COMPLETED = 'completed',
  NO_ACCESS = 'no_access',
}
export const statusTypeToColorMap = {
  [UserInterventionStatus.READY_TO_START]: colors.periwinkleGray50,
  [UserInterventionStatus.IN_PROGRESS]: colors.supernova,
  [UserInterventionStatus.COMPLETED]: colors.pistachio,
  [UserInterventionStatus.SCHEDULE_PENDING]: colors.orange,
  [UserInterventionStatus.NO_ACCESS]: colors.red,
};
