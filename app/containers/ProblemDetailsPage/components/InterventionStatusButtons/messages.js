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
    defaultMessage: 'THIS OPERATION IS IRREVERSIBLE',
  },
  editInfo: {
    id: `${scope}.editInfo`,
    defaultMessage: 'YOU WILL NOT BE ABLE TO EDIT SESSIONS IN THE INTERVENTION',
  },
  dataInfo: {
    id: `${scope}.dataInfo`,
    defaultMessage: 'ENTIRE TEST DATA WILL BE WIPED OUT',
  },
  accessInfo: {
    id: `${scope}.accessInfo`,
    defaultMessage:
      'YOU WILL NOT BE ABLE TO CHANGE INTERVENTION ACCESS SETTINGS',
  },
});
