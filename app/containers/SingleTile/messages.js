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
  translate: {
    id: `${scope}.translate`,
    defaultMessage: 'Translate',
  },
  exportCSV: {
    id: `${scope}.exportCSV`,
    defaultMessage: 'Export CSV',
  },
  shareExternally: {
    id: `${scope}.shareExternally`,
    defaultMessage: 'Share externally',
  },
  archive: {
    id: `${scope}.archive`,
    defaultMessage: 'Archive',
  },
  duplicateHere: {
    id: `${scope}.duplicateHere`,
    defaultMessage: 'Duplicate here',
  },
  assignOrganization: {
    id: `${scope}.assignOrganization`,
    defaultMessage: 'Assign Organization',
  },
  sendCopyModalTitle: {
    id: `${scope}.sendCopyModalTitle`,
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
  interventionArchiveHeader: {
    id: `${scope}.interventionArchiveHeader`,
    defaultMessage: 'Archive Intervention',
  },
  interventionArchiveMessage: {
    id: `${scope}.interventionArchiveMessage`,
    defaultMessage: 'Are you sure you want to archive this Intervention?',
  },
  catMhSettingsOption: {
    id: `${scope}.catMhSettingsOption`,
    defaultMessage: 'CAT-MH™ Access',
  },
  catMhSettingsModalTitle: {
    id: `${scope}.catMhSettingsModalTitle`,
    defaultMessage: 'Access to CAT-MH™',
  },
});
