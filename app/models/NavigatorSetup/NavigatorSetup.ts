import { PhoneAttributes } from 'models/Phone';
import { AppFile } from 'models/File';

import { NavigatorLink, ParticipantLink } from './Link';

export enum FileFor {
  PARTICIPANTS = 'participants',
  NAVIGATORS = 'navigators',
}

export type NoNavigatorsAvailableData = {
  noNavigatorAvailableMessage: string;
  phone: Nullable<PhoneAttributes>;
  messagePhone: Nullable<PhoneAttributes>;
  contactEmail: string;
  contactMessage: string;
  participantLinks: ParticipantLink[];
};

export type HelpingMaterialsData = {
  navigatorLinks: NavigatorLink[];
  navigatorFiles: AppFile[];
  participantFiles: AppFile[];
  filledScriptTemplate: Nullable<AppFile>;
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
  | 'contactMessage'
  | 'messagePhone'
>;

// Fetched by navigator
export type NavigatorHelpingMaterials = Pick<
  HelpingMaterialsData,
  'filledScriptTemplate' | 'navigatorLinks' | 'navigatorFiles'
>;
