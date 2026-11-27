import { asEnumValue } from 'utils/asEnumValue';

export enum ParticipantUploadModerationStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  SKIPPED = 'skipped',
  FAILED = 'failed',
}

export enum ParticipantUploadModerationSkipReason {
  UNSUPPORTED_FORMAT = 'UNSUPPORTED_FORMAT',
  TOO_LARGE = 'TOO_LARGE',
  MODERATION_DISABLED = 'MODERATION_DISABLED',

  FILE_REMOVED_BY_SECURITY_SCAN = 'FILE_REMOVED_BY_SECURITY_SCAN',
}

export enum ParticipantUploadModerationCategory {
  ALCOHOL = 'Alcohol',
  DRUGS_AND_TOBACCO = 'Drugs & Tobacco',
  EXPLICIT = 'Explicit',
  GAMBLING = 'Gambling',
  HATE_SYMBOLS = 'Hate Symbols',
  NON_EXPLICIT_NUDITY = 'Non-Explicit Nudity of Intimate parts and Kissing',
  RUDE_GESTURES = 'Rude Gestures',
  SWIMWEAR_OR_UNDERWEAR = 'Swimwear or Underwear',
  VIOLENCE = 'Violence',
  VISUALLY_DISTURBING = 'Visually Disturbing',
}

export interface ParticipantUploadModerationLabel {
  name: string;

  confidence: number;
}

export interface ParticipantUploadModeration {
  moderationStatus: ParticipantUploadModerationStatus;
  moderationLabels: ParticipantUploadModerationLabel[];
  moderationSkipReason: Nullable<ParticipantUploadModerationSkipReason>;
  moderationModelVersion: Nullable<string>;
}

export enum ParticipantUploadModerationOutcome {
  PENDING = 'PENDING',
  CLEAR = 'CLEAR',
  FLAGGED = 'FLAGGED',
  UNCHECKED = 'UNCHECKED',
}

export const getModerationOutcome = ({
  moderationStatus,
  moderationLabels,
}: Partial<ParticipantUploadModeration>): ParticipantUploadModerationOutcome => {
  if (moderationStatus === ParticipantUploadModerationStatus.PENDING) {
    return ParticipantUploadModerationOutcome.PENDING;
  }

  if (moderationStatus !== ParticipantUploadModerationStatus.COMPLETED) {
    return ParticipantUploadModerationOutcome.UNCHECKED;
  }

  if (!Array.isArray(moderationLabels)) {
    return ParticipantUploadModerationOutcome.UNCHECKED;
  }

  return moderationLabels.length
    ? ParticipantUploadModerationOutcome.FLAGGED
    : ParticipantUploadModerationOutcome.CLEAR;
};

export const getModerationSkipReason = ({
  moderationStatus,
  moderationSkipReason,
}: Partial<ParticipantUploadModeration>): Nullable<ParticipantUploadModerationSkipReason> =>
  moderationStatus === ParticipantUploadModerationStatus.SKIPPED
    ? asEnumValue(ParticipantUploadModerationSkipReason, moderationSkipReason)
    : null;

export const getModerationCategory = (
  name: string,
): Nullable<ParticipantUploadModerationCategory> =>
  asEnumValue(ParticipantUploadModerationCategory, name);
