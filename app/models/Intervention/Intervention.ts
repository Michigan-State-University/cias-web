import { CharacterType } from 'models/Character';
import { AppFile } from 'models/File';
import { Session } from 'models/Session';

import { InterventionInvite } from './InterventionInvite';
import { Editor } from './Editor';

export enum InterventionStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  CLOSED = 'closed',
  ARCHIVED = 'archived',
}

export enum InterventionSharedTo {
  ANYONE = 'anyone',
  REGISTERED = 'registered',
  INVITED = 'invited',
}

export enum InterventionType {
  DEFAULT = 'Intervention',
  FIXED = 'Intervention::FixedOrder',
  FLEXIBLE = 'Intervention::FlexibleOrder',
}

export enum CatMhLicenseType {
  LIMITED = 'limited',
  UNLIMITED = 'unlimited',
}

export enum SensitiveDataState {
  COLLECTED = 'collected',
  MARKED_TO_REMOVE = 'marked_to_remove',
  REMOVED = 'removed',
}

type UserWithAccess = {
  id: string;
  email: string;
  loading?: boolean;
};

export interface SimpleIntervention {
  createdAt: string;
  hasCollaborators: boolean;
  currentEditor: Nullable<Editor>;
  id: string;
  googleLanguageId: number;
  name: string;
  organizationId: Nullable<string>;
  sessionsSize: number;
  updatedAt: string;
  userId: string;
  status: InterventionStatus;
  user: { id: string; firstName: string; email: string; lastName: string };
  sensitiveDataState: SensitiveDataState;
  clearSensitiveDataScheduledAt: Nullable<string>;
}

export interface Intervention extends SimpleIntervention {
  csvGeneratedAt: Nullable<string>;
  csvFilename: Nullable<string>;
  hasCatSessions: boolean;
  imageAlt: Nullable<string>;
  languageCode: string;
  languageName: string;
  logoUrl: Nullable<string>;
  publishedAt: Nullable<string>;
  sharedTo: InterventionSharedTo;
  firstSessionLanguage?: string;
  catMhApplicationId: string;
  catMhOrganizationId: number;
  catMhPool: number;
  createdCatMhSessionCount: number;
  isAccessRevoked: boolean;
  licenseType: CatMhLicenseType;
  type: InterventionType;
  emails?: InterventionInvite[];
  additionalText: Nullable<string>;
  originalText: Nullable<{ additionalText: string }>;
  usersWithAccess: Nullable<UserWithAccess[]>;
  files: AppFile[];
  liveChatEnabled?: boolean;
  quickExit: boolean;
  currentNarrator: CharacterType;
  conversationsPresent: boolean;
  conversationsTranscriptGeneratedAt: Nullable<string>;
  conversationsTranscriptFilename: Nullable<string>;
  sessions: Session[];
}
