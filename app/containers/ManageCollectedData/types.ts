import { SelectModalOption } from 'components/SelectModal';

export enum ManageCollectedDataOptionId {
  CLEAR_DATA = 'clearData',
  DELETE_REPORTS = 'deleteReports',
}

export type ManageCollectedDataOption =
  SelectModalOption<ManageCollectedDataOptionId>;
