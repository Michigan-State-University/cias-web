import { PhoneAttributes } from 'models/Phone';

export type InvitationListItemState = {
  resendLoading: false;
};

export enum InterventionInvitationTargetType {
  SESSION = 'session',
  INTERVENTION = 'intervention',
}

export type SendInterventionInvitationsDataItem = {
  emails: string[];
  healthClinicId?: string;
  targetId: string;
  targetType: InterventionInvitationTargetType;
};

export type SendInterventionInvitationsData =
  SendInterventionInvitationsDataItem[];

export type PredefinedParticipantData = {
  firstName: Nullable<string>;
  lastName: Nullable<string>;
  email: Nullable<string>;
  healthClinicId: Nullable<string>;
  externalId: Nullable<string>;
  phoneAttributes: Nullable<PhoneAttributes>;
  emailNotification: boolean;
  smsNotification: boolean;
};
