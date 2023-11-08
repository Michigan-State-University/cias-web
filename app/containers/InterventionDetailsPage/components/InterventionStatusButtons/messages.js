/*
 * InterventionStatusButtons Messages
 *
 * This contains all the text for the InterventionStatusButtons component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.InterventionStatusButtons';

export default defineMessages({
  publish: {
    id: `${scope}.publish`,
    defaultMessage: 'Publish',
  },
  pause: {
    id: `${scope}.pause`,
    defaultMessage: 'Temporarily pause',
  },
  reactivate: {
    id: `${scope}.reactivate`,
    defaultMessage: 'Reactivate',
  },
  close: {
    id: `${scope}.close`,
    defaultMessage: 'Close',
  },
  archive: {
    id: `${scope}.archive`,
    defaultMessage: 'Archive',
  },
  csv: {
    id: `${scope}.csv`,
    defaultMessage: 'Generate CSV',
  },
  csvNew: {
    id: `${scope}.csvNew`,
    defaultMessage: 'Generate new CSV',
  },
  csvDownload: {
    id: `${scope}.csvDownload`,
    defaultMessage: 'Download CSV',
  },
  confirmationTile: {
    id: `${scope}.confirmationTile`,
    defaultMessage: 'Are you sure you want to publish the intervention?',
  },
  irreversibleInfo: {
    id: `${scope}.irreversible`,
    defaultMessage: 'This operation is irreversible.',
  },
  editInfo: {
    id: `${scope}.editInfo`,
    defaultMessage:
      'You will no longer be able to edit content (including access settings)',
  },
  dataDeletedInfo: {
    id: `${scope}.dataDeleted`,
    defaultMessage: 'Test data will be deleted',
  },
  dataCollectedInfo: {
    id: `${scope}.dataCollected`,
    defaultMessage: 'Participant data will be collected',
  },
  editParticipantsInfo: {
    id: `${scope}.editParticipants`,
    defaultMessage: 'You can still edit participants',
  },
  duplicateInfo: {
    id: `${scope}.duplicateInfo`,
    defaultMessage:
      'You can duplicate the intervention as a draft (e.g. if you need to edit content) ',
  },
  closeConfirmationHeader: {
    id: `${scope}.closeConfirmationHeader`,
    defaultMessage: 'Close Session',
  },
  closeConfirmationMessage: {
    id: `${scope}.closeConfirmationMessage`,
    defaultMessage:
      "Are you sure you want to close the intervention? It will no longer be possible to gather Participant's data.",
  },
  interventionStatusButtonTitle: {
    id: `${scope}.interventionStatusButtonTitle`,
    defaultMessage: 'Intervention status',
  },
  interventionArchiveHeader: {
    id: `${scope}.interventionArchiveHeader`,
    defaultMessage: 'Archive Intervention',
  },
  interventionArchiveMessage: {
    id: `${scope}.interventionArchiveMessage`,
    defaultMessage: 'Are you sure you want to archive this Intervention?',
  },
});
