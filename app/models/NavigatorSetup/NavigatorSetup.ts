import { PhoneAttributes } from 'models/Phone';

import { NavigatorLink, ParticipantLink } from './Link';

export enum NotifyByOptions {
  EMAIL = 'email',
  SMS = 'sms',
}

export type ParticipantFile = {
  id: string;
  name: string;
  url: string;
  deleting?: boolean;
};

export type NoNavigatorsAvailableData = {
  noNavigatorAvailableMessage: string;
  phone: Nullable<PhoneAttributes>;
  contactEmail: string;
  isNavigatorNotificationOn: boolean;
  notifyBy: NotifyByOptions;
  participantLinks: ParticipantLink[];
};

export type HelpingMaterialsData = {
  navigatorLinks: NavigatorLink[];
  participantFiles: ParticipantFile[];
};

export type NavigatorSetup = {
  id: string;
} & NoNavigatorsAvailableData &
  HelpingMaterialsData;

// Fetched by participant
export type LiveChatSetup = Pick<
  NavigatorSetup,
  | 'id'
  | 'noNavigatorAvailableMessage'
  | 'phone'
  | 'contactEmail'
  | 'participantLinks'
  | 'participantFiles'
>;
