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
    defaultMessage: 'Archive',
  },
  duplicate: {
    id: `${scope}.duplicate`,
    defaultMessage: 'Duplicate',
  },
  assignOrganization: {
    id: `${scope}.assignOrganization`,
    defaultMessage: 'Assign Organization',
  },
  modalTitle: {
    id: `${scope}.modalTitle`,
    defaultMessage: 'Choose researchers to send',
  },
  isFromOrganization: {
    id: `${scope}.isFromOrganization`,
    defaultMessage: 'Reporting',
  },
  createdBy: {
    id: `${scope}.createdBy`,
    defaultMessage: 'Created by: ',
  },
  createdAt: {
    id: `${scope}.createdAt`,
    defaultMessage: 'Created at: ',
  },
  updatedAt: {
    id: `${scope}.modalTitle`,
    defaultMessage: 'Updated at: ',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email: ',
  },
  firstName: {
    id: `${scope}.firstName`,
    defaultMessage: 'First name: ',
  },
  lastName: {
    id: `${scope}.lastName`,
    defaultMessage: 'Last name: ',
  },
});
