import { defineMessages } from 'react-intl';

import {
  ParticipantUploadDeletionReason,
  ParticipantUploadModerationCategory,
  ParticipantUploadModerationSkipReason,
} from 'models/ParticipantUpload';

export const scope = 'app.containers.ParticipantUploadPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'Participant file',
  },
  loading: {
    id: `${scope}.loading`,
    defaultMessage: 'Opening the file…',
  },
  download: {
    id: `${scope}.download`,
    defaultMessage: 'Download file',
  },
  noPreview: {
    id: `${scope}.noPreview`,
    defaultMessage:
      'This file type is not shown in the browser. Download it to open it.',
  },
  pending: {
    id: `${scope}.pending`,
    defaultMessage:
      'This file is still being checked by the security scanner and cannot be opened yet. Try again in a few minutes.',
  },
  missing: {
    id: `${scope}.missing`,
    defaultMessage:
      'This file is no longer available, or the link points to a file that never existed. Ask the participant to attach it again if you still need it.',
  },
  loadError: {
    id: `${scope}.loadError`,
    defaultMessage: 'The file could not be opened. Please try again.',
  },
});

export const deletionReasonMessages =
  defineMessages<ParticipantUploadDeletionReason>({
    [ParticipantUploadDeletionReason.MALWARE_DETECTED]: {
      id: `${scope}.MALWARE_DETECTED`,
      defaultMessage: 'The scanner found a threat in the file.',
    },
    [ParticipantUploadDeletionReason.SCANNER_CANNOT_INSPECT]: {
      id: `${scope}.SCANNER_CANNOT_INSPECT`,
      defaultMessage: 'The scanner could not inspect the file.',
    },

    [ParticipantUploadDeletionReason.SCANNER_CONFIGURATION_ERROR]: {
      id: `${scope}.SCANNER_CONFIGURATION_ERROR`,
      defaultMessage:
        'The scanner could not run because of a configuration problem on our side.',
    },
  });

export const moderationMessages = defineMessages({
  heading: {
    id: `${scope}.moderation.heading`,
    defaultMessage: 'Automated content check',
  },
  moderationPending: {
    id: `${scope}.moderation.pending`,
    defaultMessage:
      'The content of this file is still being checked. The file itself is ready — reload the page in a moment to see the result.',
  },
  moderationClear: {
    id: `${scope}.moderation.clear`,
    defaultMessage:
      'This image was checked automatically and no sensitive content was detected.',
  },
  moderationFlagged: {
    id: `${scope}.moderation.flagged`,
    defaultMessage:
      'The automated check detected the following content in this image:',
  },
  moderationUnchecked: {
    id: `${scope}.moderation.unchecked`,
    defaultMessage:
      'The content of this file was not checked, so nothing is known about it.',
  },

  moderationFailed: {
    id: `${scope}.moderation.failed`,
    defaultMessage: 'The automated check ran into an error and did not finish.',
  },
  moderationNoReason: {
    id: `${scope}.moderation.noReason`,
    defaultMessage: 'The check was not run for this file.',
  },
  unknownCategory: {
    id: `${scope}.moderation.unknownCategory`,
    defaultMessage: 'Other sensitive content',
  },
  labelConfidence: {
    id: `${scope}.moderation.labelConfidence`,
    defaultMessage: '{category} ({confidence}% confidence)',
  },
  modelVersion: {
    id: `${scope}.moderation.modelVersion`,
    defaultMessage: 'Moderation model {version}',
  },
});

export const moderationSkipReasonMessages =
  defineMessages<ParticipantUploadModerationSkipReason>({
    [ParticipantUploadModerationSkipReason.UNSUPPORTED_FORMAT]: {
      id: `${scope}.moderation.UNSUPPORTED_FORMAT`,
      defaultMessage:
        'The automated check only reads JPEG and PNG images, and this file is of another type.',
    },
    [ParticipantUploadModerationSkipReason.TOO_LARGE]: {
      id: `${scope}.moderation.TOO_LARGE`,
      defaultMessage: 'The image is too large for the automated check.',
    },

    [ParticipantUploadModerationSkipReason.FILE_REMOVED_BY_SECURITY_SCAN]: {
      id: `${scope}.moderation.FILE_REMOVED_BY_SECURITY_SCAN`,
      defaultMessage:
        'The file was removed by the security scanner before its content could be checked.',
    },
    [ParticipantUploadModerationSkipReason.MODERATION_DISABLED]: {
      id: `${scope}.moderation.MODERATION_DISABLED`,
      defaultMessage:
        'Automated content checking is turned off for this deployment.',
    },
  });

export const moderationCategoryMessages =
  defineMessages<ParticipantUploadModerationCategory>({
    [ParticipantUploadModerationCategory.ALCOHOL]: {
      id: `${scope}.moderation.category.Alcohol`,
      defaultMessage: 'Alcohol',
    },
    [ParticipantUploadModerationCategory.DRUGS_AND_TOBACCO]: {
      id: `${scope}.moderation.category.DrugsAndTobacco`,
      defaultMessage: 'Drugs & tobacco',
    },
    [ParticipantUploadModerationCategory.EXPLICIT]: {
      id: `${scope}.moderation.category.Explicit`,
      defaultMessage: 'Explicit content',
    },
    [ParticipantUploadModerationCategory.GAMBLING]: {
      id: `${scope}.moderation.category.Gambling`,
      defaultMessage: 'Gambling',
    },
    [ParticipantUploadModerationCategory.HATE_SYMBOLS]: {
      id: `${scope}.moderation.category.HateSymbols`,
      defaultMessage: 'Hate symbols',
    },
    [ParticipantUploadModerationCategory.NON_EXPLICIT_NUDITY]: {
      id: `${scope}.moderation.category.NonExplicitNudity`,
      defaultMessage: 'Non-explicit nudity or kissing',
    },
    [ParticipantUploadModerationCategory.RUDE_GESTURES]: {
      id: `${scope}.moderation.category.RudeGestures`,
      defaultMessage: 'Rude gestures',
    },
    [ParticipantUploadModerationCategory.SWIMWEAR_OR_UNDERWEAR]: {
      id: `${scope}.moderation.category.SwimwearOrUnderwear`,
      defaultMessage: 'Swimwear or underwear',
    },
    [ParticipantUploadModerationCategory.VIOLENCE]: {
      id: `${scope}.moderation.category.Violence`,
      defaultMessage: 'Violence',
    },
    [ParticipantUploadModerationCategory.VISUALLY_DISTURBING]: {
      id: `${scope}.moderation.category.VisuallyDisturbing`,
      defaultMessage: 'Visually disturbing content',
    },
  });
