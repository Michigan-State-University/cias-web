enum InterventionStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  CLOSED = 'closed',
  ARCHIVED = 'archived',
}

enum InterventionSharedTo {
  ANYONE = 'anyone',
  REGISTERED = 'registered',
  INVITED = 'invited',
}

export interface InterventionDto {
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
}
