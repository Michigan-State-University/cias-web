import { CharacterType } from 'models/Character';
import { AppFile } from 'models/File';
import { Session } from 'models/Session';

import { Editor } from './Editor';
import { InterventionClinicLocation } from './ClinicLocation';

export enum InterventionStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  PAUSED = 'paused',
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

export type InterventionExportFile = {
  url: string;
  filename: string;
  generatedAt: string;
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
  starred: boolean;
  exportedData: Nullable<InterventionExportFile>;
}

export type InterventionLogo = {
  url: string;
  alt: Nullable<string>;
};

export type InterventionGeneratedFile = {
  filename: string;
  generatedAt: string;
};

export interface Intervention extends SimpleIntervention {
  csv: Nullable<InterventionGeneratedFile>;
  hasCatSessions: boolean;
  languageCode: string;
  languageName: string;
  logo: Nullable<InterventionLogo>;
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
  additionalText: Nullable<string>;
  originalText: Nullable<{ additionalText: string }>;
  usersWithAccess: Nullable<UserWithAccess[]>;
  files: AppFile[];
  liveChatEnabled?: boolean;
  quickExit: boolean;
  warningScreenEnabled: boolean;
  currentNarrator: CharacterType;
  conversationsPresent: boolean;
  conversationsTranscript: Nullable<InterventionGeneratedFile>;
  sessions: Session[];
  hfhsAccess: boolean;
  clinicLocations: InterventionClinicLocation[];
}

export interface FileInfo {
  id: string;
  name: string;
  url: string;
}
