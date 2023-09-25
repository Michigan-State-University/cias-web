import { Session } from 'models/Session';

import { SelectOption } from 'components/Select/types';
import { HealthClinic } from '../../../../models/Organization';

export enum InviteParticipantModalView {
  PARTICIPANT_LIST = 'PARTICIPANT_LIST',
  INVITE_EMAIL_PARTICIPANTS = 'INVITE_EMAIL_PARTICIPANTS',
  INVITE_PREDEFINED_PARTICIPANT = 'INVITE_PREDEFINED_PARTICIPANT',
  MANAGE_PREDEFINED_PARTICIPANT = 'MANAGE_PREDEFINED_PARTICIPANT',
}

export enum ParticipantInvitationType {
  EMAIL = 'EMAIL',
  PREDEFINED = 'PREDEFINED',
}

export type CopyLinkFormValues = {
  sessionOption: Nullable<SelectOption<string>>;
  healthClinicOption: Nullable<SelectOption<string>>;
};

export type InviteEmailParticipantsFormValues = {
  sessionOption: Nullable<SelectOption<string>>;
  healthClinicOption: Nullable<SelectOption<string>>;
  emails: string[];
};

export type NormalizedSessions = Record<Session['id'], Session>;

export type HealthClinicInfo = {
  healthClinicName: string;
  healthSystemName: string;
};

export type NormalizedHealthClinicsInfos = Record<
  HealthClinic['id'],
  HealthClinicInfo
>;
