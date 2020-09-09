/*
 * SingleInterventionPanel Messages
 *
 * This contains all the text for the SingleInterventionPanel component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.SingleInterventionPanel';

export default defineMessages({
  draft: {
    id: `${scope}.draft`,
    defaultMessage: 'Draft',
  },
  notPublished: {
    id: `${scope}.notPublished`,
    defaultMessage: 'Not published yet',
  },
  newIntervention: {
    id: `${scope}.newIntervention`,
    defaultMessage: 'Create new e-Intervention',
  },
  sessions: {
    id: `${scope}.sessions`,
    defaultMessage: 'Sessions ({sessionCount})',
  },
  exportCSV: {
    id: `${scope}.exportCSV`,
    defaultMessage: 'Export CSV',
  },
  sendCopy: {
    id: `${scope}.sendCopy`,
    defaultMessage: 'Send copy to researcher',
  },
  archive: {
    id: `${scope}.archive`,
    defaultMessage: 'Archive e-intervention',
  },
  duplicate: {
    id: `${scope}.duplicate`,
    defaultMessage: 'Duplicate',
  },
  modalTitle: {
    id: `${scope}.modalTitle`,
    defaultMessage: 'Choose researchers to send',
  },
});
