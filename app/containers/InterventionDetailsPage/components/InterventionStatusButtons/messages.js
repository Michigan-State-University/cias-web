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
    defaultMessage: 'Publish Intervention',
  },
  close: {
    id: `${scope}.close`,
    defaultMessage: 'Close Intervention',
  },
  csv: {
    id: `${scope}.csv`,
    defaultMessage: 'Get CSV with results',
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
});
