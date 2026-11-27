import { asEnumValue } from 'utils/asEnumValue';

import { ParticipantUploadModeration } from './ParticipantUploadModeration';

export enum ParticipantUploadScanStatus {
  PENDING = 'pending',
  CLEAN = 'clean',
  DELETED = 'deleted',
}

export enum ParticipantUploadDeletionReason {
  MALWARE_DETECTED = 'MALWARE_DETECTED',
  SCANNER_CANNOT_INSPECT = 'SCANNER_CANNOT_INSPECT',

  SCANNER_CONFIGURATION_ERROR = 'SCANNER_CONFIGURATION_ERROR',
}

export interface ParticipantUpload extends Partial<ParticipantUploadModeration> {
  id: string;
  questionId: string;
  userSessionId: string;
  originalFilename: string;
  description: Nullable<string>;
  contentTypeDetected: string;
  byteSize: number;
  scanStatus: ParticipantUploadScanStatus;

  inlinePreview: boolean;
  deletionReason: Nullable<ParticipantUploadDeletionReason>;
}

export interface ParticipantUploadConfig {
  allowedContentTypes: string[];
  acceptedExtensions: string[];
  inlinePreviewContentTypes: string[];
  maxSizeBytes: number;
  maxFilesPerQuestion: number;
}

export const isUploadPending = ({ scanStatus }: ParticipantUpload) =>
  scanStatus === ParticipantUploadScanStatus.PENDING;

export const isUploadRemoved = ({ scanStatus }: ParticipantUpload) =>
  scanStatus === ParticipantUploadScanStatus.DELETED;

export const getUploadDeletionReason = ({
  deletionReason,
}: ParticipantUpload): ParticipantUploadDeletionReason =>
  asEnumValue(ParticipantUploadDeletionReason, deletionReason) ??
  ParticipantUploadDeletionReason.SCANNER_CANNOT_INSPECT;

export const isUploadClean = ({ scanStatus }: ParticipantUpload) =>
  scanStatus === ParticipantUploadScanStatus.CLEAN;
