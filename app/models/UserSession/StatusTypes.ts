import { colors } from 'theme';

export enum UserSessionStatus {
  READY_TO_START = 'ready_to_start',
  IN_PROGRESS = 'inProgress',
  COMPLETED = 'completed',
  NOT_AVAILABLE = 'notAvailable',
}
export const statusTypeToColorMap = {
  [UserSessionStatus.READY_TO_START]: colors.periwinkleGray50,
  [UserSessionStatus.IN_PROGRESS]: colors.supernova,
  [UserSessionStatus.COMPLETED]: colors.pistachio,
  [UserSessionStatus.NOT_AVAILABLE]: colors.bluewood,
};

export const statusTypeToFontColorMap = {
  [UserSessionStatus.READY_TO_START]: colors.bluewood,
  [UserSessionStatus.IN_PROGRESS]: colors.bluewood,
  [UserSessionStatus.COMPLETED]: colors.bluewood,
  [UserSessionStatus.NOT_AVAILABLE]: colors.white,
};
