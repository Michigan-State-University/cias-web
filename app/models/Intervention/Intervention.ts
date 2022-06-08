import { InterventionInvite } from './InterventionInvite';

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

type UserWithAccess = {
  id: string;
  email: string;
  loading?: boolean;
};

export interface Intervention {
  createdAt: string;
  csvGeneratedAt: Nullable<string>;
  csvLink: Nullable<string>;
  googleLanguageId: number;
  hasCatSessions: boolean;
  id: string;
  imageAlt: Nullable<string>;
  languageCode: string;
  languageName: string;
  logoUrl: Nullable<string>;
  name: string;
  organizationId: Nullable<string>;
  publishedAt: Nullable<string>;
  sessionsSize: number;
  sharedTo: InterventionSharedTo;
  status: InterventionStatus;
  updatedAt: string;
  user: { id: string; firstName: string; email: string; lastName: string };
  userId: string;
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
  files: FileInfo[];
  liveChatEnabled?: boolean;
}

export interface FileInfo {
  id: string;
  name: string;
  url: string;
}
