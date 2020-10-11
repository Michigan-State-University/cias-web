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
      'You will not be able to edit sessions in the intervention.',
  },
  dataInfo: {
    id: `${scope}.dataInfo`,
    defaultMessage: 'Entire test data will be wiped out.',
  },
  accessInfo: {
    id: `${scope}.accessInfo`,
    defaultMessage:
      'You will not be able to change intervention access settings.',
  },
});
