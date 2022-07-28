import { PhoneAttributes } from 'models/Phone';

export enum NotifyByOptions {
  EMAIL = 'email',
  SMS = 'sms',
}

export type ParticipantLink = {
  id: string;
  displayName: string;
  url: string;
  deleting?: boolean;
};

export type ParticipantFile = {
  id: string;
  name: string;
  url: string;
};

export type NoNavigatorsAvailableData = {
  contactEmail: string;
  id: string;
  noNavigatorAvailableMessage: string;
  notifyBy: NotifyByOptions;
  participantLinks: ParticipantLink[];
  phone: Nullable<PhoneAttributes>;
  isNavigatorNotificationOn: boolean;
};

export type HelpingMaterialsData = {
  participantFiles: ParticipantFile[];
};

export type NavigatorSetupData = NoNavigatorsAvailableData &
  HelpingMaterialsData;
