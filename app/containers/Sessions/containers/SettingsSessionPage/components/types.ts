import { Session } from 'models/Session';

export type SessionSettingsFormValues = Pick<
  Session,
  'autofinishEnabled' | 'autofinishDelay'
>;

export enum AutofinishTimeUnit {
  HOURS = 'h',
  MINUTES = 'm',
}
