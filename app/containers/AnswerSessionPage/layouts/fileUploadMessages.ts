import { defineMessages } from 'react-intl';

import {
  ParticipantUploadDeletionReason,
  ParticipantUploadErrorCode,
  ParticipantUploadFailure,
  UPLOAD_FAILED,
} from 'models/ParticipantUpload';

export const scope = 'app.containers.Answer.layouts.FileUploadQuestionLayout';

export default defineMessages({
  acceptedFormats: {
    id: `${scope}.acceptedFormats`,
    defaultMessage: 'Accepted file types: {formats}.',
  },
  maxSize: {
    id: `${scope}.maxSize`,
    defaultMessage: 'Maximum file size: {maxSize}.',
  },
  uploadLabel: {
    id: `${scope}.uploadLabel`,
    defaultMessage: 'Attach a file from your device',
  },
  descriptionLabel: {
    id: `${scope}.descriptionLabel`,
    defaultMessage: 'File description (optional)',
  },
  descriptionPlaceholder: {
    id: `${scope}.descriptionPlaceholder`,
    defaultMessage: 'Briefly describe the file you are attaching',
  },
  scanInProgress: {
    id: `${scope}.scanInProgress`,
    defaultMessage:
      'Checking the file for security. This usually takes under a minute.',
  },
  scanTakingLong: {
    id: `${scope}.scanTakingLong`,
    defaultMessage:
      'The security check is taking longer than usual. You can leave this screen open — the result will appear here.',
  },
  scanClean: {
    id: `${scope}.scanClean`,
    defaultMessage: 'File attached',
  },
  removeFile: {
    id: `${scope}.removeFile`,
    defaultMessage: 'Remove file',
  },
  limitReached: {
    id: `${scope}.limitReached`,
    defaultMessage:
      'You have attached the maximum number of files for this question. Remove a file to attach a different one.',
  },
});

export const fileUploadErrorMessages = defineMessages<
  ParticipantUploadFailure | ParticipantUploadDeletionReason
>({
  [UPLOAD_FAILED]: {
    id: `${scope}.UPLOAD_FAILED`,
    defaultMessage: 'The file could not be uploaded. Please try again.',
  },
  [ParticipantUploadErrorCode.FILE_TYPE_NOT_ALLOWED]: {
    id: `${scope}.FILE_TYPE_NOT_ALLOWED`,
    defaultMessage:
      'This file type is not accepted. Please attach one of the listed file types.',
  },
  [ParticipantUploadErrorCode.FILE_TOO_LARGE]: {
    id: `${scope}.FILE_TOO_LARGE`,
    defaultMessage: 'This file is too large.',
  },
  [ParticipantUploadErrorCode.TOO_MANY_FILES]: {
    id: `${scope}.TOO_MANY_FILES`,
    defaultMessage:
      'You have already attached the maximum number of files for this question.',
  },
  [ParticipantUploadErrorCode.FILE_MISSING]: {
    id: `${scope}.FILE_MISSING`,
    defaultMessage:
      'The file did not reach us in one piece. Please attach it again.',
  },
  [ParticipantUploadErrorCode.SESSION_FINISHED]: {
    id: `${scope}.SESSION_FINISHED`,
    defaultMessage: 'This session is finished, so its files cannot be changed.',
  },
  [ParticipantUploadErrorCode.FILE_PENDING_SCAN]: {
    id: `${scope}.FILE_PENDING_SCAN`,
    defaultMessage: 'The file is still being checked for security.',
  },
  [ParticipantUploadErrorCode.FILE_REMOVED_BY_SECURITY_SCAN]: {
    id: `${scope}.FILE_REMOVED_BY_SECURITY_SCAN`,
    defaultMessage: 'This file was removed by the security scanner.',
  },
  [ParticipantUploadDeletionReason.MALWARE_DETECTED]: {
    id: `${scope}.MALWARE_DETECTED`,
    defaultMessage:
      '{filename} was rejected: the security scanner found a threat in it. Please attach a different file.',
  },
  [ParticipantUploadDeletionReason.SCANNER_CANNOT_INSPECT]: {
    id: `${scope}.SCANNER_CANNOT_INSPECT`,
    defaultMessage:
      '{filename} was rejected: the security scanner could not check it. Please attach the file again, or try a different format.',
  },

  [ParticipantUploadDeletionReason.SCANNER_CONFIGURATION_ERROR]: {
    id: `${scope}.SCANNER_CONFIGURATION_ERROR`,
    defaultMessage:
      '{filename} could not be checked because of a problem on our side. Please attach the file again.',
  },
});
