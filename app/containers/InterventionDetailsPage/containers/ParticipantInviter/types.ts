import { Session } from 'models/Session';
import { HealthClinic } from 'models/Organization';
import { CountryCode } from 'libphonenumber-js/types';

import { SelectOption } from 'components/Select/types';

export enum InviteParticipantModalView {
  PARTICIPANT_LIST = 'PARTICIPANT_LIST',
  INVITE_EMAIL_PARTICIPANTS = 'INVITE_EMAIL_PARTICIPANTS',
  INVITE_PREDEFINED_PARTICIPANT = 'INVITE_PREDEFINED_PARTICIPANT',
  MANAGE_PREDEFINED_PARTICIPANT = 'MANAGE_PREDEFINED_PARTICIPANT',
  UPLOAD_EMAILS = 'UPLOAD_EMAILS',
  UPLOAD_PREDEFINED_PARTICIPANTS = 'UPLOAD_PREDEFINED_PARTICIPANTS',
}

export type InviteParticipantModalViewState =
  | {
      view: InviteParticipantModalView.MANAGE_PREDEFINED_PARTICIPANT;
      participantId: string;
    }
  | {
      view: Exclude<
        InviteParticipantModalView,
        InviteParticipantModalView.MANAGE_PREDEFINED_PARTICIPANT
      >;
    };

export enum ParticipantInvitationType {
  EMAIL = 'EMAIL',
  PREDEFINED = 'PREDEFINED',
  PREDEFINED_CSV_UPLOAD = 'PREDEFINED_CSV_UPLOAD',
}

export type CopyLinkFormValues = {
  sessionOption: Nullable<SelectOption<string>>;
  healthClinicOption: Nullable<SelectOption<string>>;
};

export type SequentialInterventionInviteEmailParticipantsFormValues = {
  isModularIntervention: false;
  selectFirstSession: boolean;
  sessionOption: Nullable<SelectOption<string>>;
};

export type ModularInterventionInviteEmailParticipantsFormValues = {
  isModularIntervention: true;
};

export type InterventionTypeDependentInviteEmailParticipantsFormValues =
  | SequentialInterventionInviteEmailParticipantsFormValues
  | ModularInterventionInviteEmailParticipantsFormValues;

export type NonReportingInterventionInviteEmailParticipantsFormValues = {
  isReportingIntervention: false;
  emails: string[];
};

export type ReportingInterventionInviteEmailParticipantsFormValues = {
  isReportingIntervention: true;
  clinics: {
    healthClinicOption: Nullable<SelectOption<string>>;
    emails: string[];
  }[];
};

export type ReportingDependentInviteEmailParticipantsFormValues =
  | NonReportingInterventionInviteEmailParticipantsFormValues
  | ReportingInterventionInviteEmailParticipantsFormValues;

export type InviteEmailParticipantsFormValues =
  InterventionTypeDependentInviteEmailParticipantsFormValues &
    ReportingDependentInviteEmailParticipantsFormValues;

export type PredefinedParticipantFormValues = {
  healthClinicOption: Nullable<SelectOption<string>>;
  firstName: string;
  lastName: string;
  email: string;
  externalId: string;
  iso: Nullable<SelectOption<CountryCode>>;
  number: string;
  smsNotification: boolean;
  emailNotification: boolean;
};

export type NormalizedSessions = Record<Session['id'], Session>;

export type HealthClinicInfo = {
  healthClinicName: string;
  healthSystemName: string;
  deleted: boolean;
};

export type NormalizedHealthClinicsInfos = Record<
  HealthClinic['id'],
  HealthClinicInfo
>;

export type EmailsCsvRow = {
  email: string;
  healthClinicId?: string;
  healthClinicName?: string;
};

export type UploadedEmailsCsvData = {
  data: string[];
}[];

export type ParsedEmailsCsv = { email: string; healthClinicId?: string }[];

export enum PredefinedParticipantFormMode {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}

export type PredefinedParticipantCsvRow = {
  firstName?: string;
  lastName?: string;
  email?: string;
  externalId?: string;
  phoneCountryCode?: string;
  phoneNumber?: string;
  emailNotification?: string;
  smsNotification?: string;
  healthClinicId?: string;
  healthClinicName?: string;
};

export type UploadedPredefinedParticipantsCsvData = {
  data: PredefinedParticipantCsvRow;
}[];

export type ParsedPredefinedParticipantCsvRow = {
  firstName: string;
  lastName: string;
  email: string;
  externalId: string;
  iso: Nullable<SelectOption<CountryCode>>;
  number: string;
  emailNotification: boolean;
  smsNotification: boolean;
  healthClinicOption: SelectOption<string> | null;
};

export type InvitePredefinedParticipantsFormValues = {
  participants: ParsedPredefinedParticipantCsvRow[];
};
