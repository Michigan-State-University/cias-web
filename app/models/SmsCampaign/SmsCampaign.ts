export enum SmsCampaignKind {
  INVITATION = 'invitation',
  MANUAL_REMINDER = 'manual_reminder',
  SCHEDULED_REMINDER = 'scheduled_reminder',
}

export enum SmsCampaignStatus {
  SCHEDULED = 'scheduled',
  SENDING = 'sending',
  SENT = 'sent',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  SKIPPED = 'skipped',
}

export enum SmsCampaignLinkType {
  WEBSITE = 'website',
  VIDEO = 'video',
}

export type SmsCampaignLink = {
  url: string;
  variable: string;
  linkType: SmsCampaignLinkType;
};

export type SmsCampaign = {
  id: string;
  kind: SmsCampaignKind;
  status: SmsCampaignStatus;
  body: string;
  links: SmsCampaignLink[];
  scheduledAt: Nullable<string>;
  sentAt: Nullable<string>;
  acceptedCount: number;
  failedCount: number;
  /** `null` for a scheduled reminder until it starts — recipients are resolved at send time. */
  recipientsCount: Nullable<number>;
  /** `true` while the parent invitation is still sending and the date may still shift. */
  scheduledAtProvisional: boolean;
};

/** Counter and limit parameters — link lengths depend on the environment's WEB_URL. */
export type SmsCampaignMeta = {
  personalLinkExpectedLength: number;
  trackedLinkExpectedLength: number;
  /** [single-segment length, multi-segment length] */
  gsm7SegmentLengths: [number, number];
  ucs2SegmentLengths: [number, number];
  maxBodyLength: number;
  maxSegments: number;
  maxReminderDaysAfter: number;
};

export type SmsCampaignScheduledReminderData = {
  body: string;
  daysAfter: number;
  links: SmsCampaignLink[];
};

/** The kinds a researcher can compose; `scheduled_reminder` is created by the backend. */
export type SmsCampaignComposableKind =
  | SmsCampaignKind.INVITATION
  | SmsCampaignKind.MANUAL_REMINDER;

export type SmsCampaignData = {
  kind: SmsCampaignComposableKind;
  body: string;
  links: SmsCampaignLink[];
  /** Omitted when there is no reminder — the key must be absent, not null. */
  scheduledReminder?: SmsCampaignScheduledReminderData;
};

export const IN_PROGRESS_SMS_CAMPAIGN_STATUSES = [
  SmsCampaignStatus.SCHEDULED,
  SmsCampaignStatus.SENDING,
];
