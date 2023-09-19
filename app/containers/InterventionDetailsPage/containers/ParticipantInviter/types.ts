import { SelectOption } from 'components/Select/types';

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
