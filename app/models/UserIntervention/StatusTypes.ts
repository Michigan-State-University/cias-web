import { colors } from 'theme';

export enum UserInterventionStatus {
  READY_TO_START = 'ready_to_start',
  IN_PROGRESS = 'in_progress',
  SCHEDULE_PENDING = 'schedule_pending',
  COMPLETED = 'completed',
  NO_ACCESS = 'no_access',
  PAUSED = 'paused',
}

export const statusTypeToColorMap = {
  [UserInterventionStatus.READY_TO_START]: colors.periwinkleGray50,
  [UserInterventionStatus.IN_PROGRESS]: colors.supernova,
  [UserInterventionStatus.COMPLETED]: colors.pistachio,
  [UserInterventionStatus.SCHEDULE_PENDING]: colors.orange,
  [UserInterventionStatus.NO_ACCESS]: colors.red,
  [UserInterventionStatus.PAUSED]: colors.rawUmber,
};

export const statusTypeToFontColorMap: Record<UserInterventionStatus, string> =
  {
    [UserInterventionStatus.READY_TO_START]: colors.bluewood,
    [UserInterventionStatus.IN_PROGRESS]: colors.bluewood,
    [UserInterventionStatus.COMPLETED]: colors.bluewood,
    [UserInterventionStatus.SCHEDULE_PENDING]: colors.bluewood,
    [UserInterventionStatus.NO_ACCESS]: colors.bluewood,
    [UserInterventionStatus.PAUSED]: colors.white,
  };
