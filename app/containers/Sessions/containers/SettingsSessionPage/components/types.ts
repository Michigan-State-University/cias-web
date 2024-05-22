import { Session } from 'models/Session';

import { SelectOption } from 'components/Select/types';

export type SessionSettingsSubmitFormValues = Pick<
  Session,
  'autofinishEnabled' | 'autofinishDelay' | 'autocloseEnabled' | 'autocloseAt' | 'type'
>;

export type AutofinishFormValues = {
  autofinishEnabled: boolean;
  autofinishDelay: number;
  timeUnit: SelectOption<AutofinishTimeUnit>;
};

export type AutocloseFormValues = {
  autocloseEnabled: boolean;
  autocloseAtDate: Nullable<Date>;
};

export enum AutofinishTimeUnit {
  HOURS = 'h',
  MINUTES = 'm',
}
