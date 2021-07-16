/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HomePage';

export default defineMessages({
  createSession: {
    id: `${scope}.createSession`,
    defaultMessage: 'Create session',
  },
  noInterventions: {
    id: `${scope}.noInterventions`,
    defaultMessage: `You don't have any interventions`,
  },
  filter: {
    id: `${scope}.filter`,
    defaultMessage: `Filter by name`,
  },
  noFilterResults: {
    id: `${scope}.noFilterResults`,
    defaultMessage: `There are no interventions with this criteria`,
  },
  showArchived: {
    id: `${scope}.showArchived`,
    defaultMessage: `Show Archived`,
  },
  back: {
    id: `${scope}.back`,
    defaultMessage: 'Back to dashboard',
  },
  backToOrganization: {
    id: `${scope}.backToOrganization`,
    defaultMessage: 'Back to organization dashboard setup',
  },
  placeholder: {
    id: `${scope}.placeholder`,
    defaultMessage: 'e-Intervention Name',
  },
  adjust: {
    id: `${scope}.adjust`,
    defaultMessage: 'Edit',
  },
  translate: {
    id: `${scope}.translate`,
    defaultMessage: 'Translate',
  },
  copy: {
    id: `${scope}.copy`,
    defaultMessage: 'Send copy to researcher',
  },
  duplicate: {
    id: `${scope}.duplicate`,
    defaultMessage: 'Duplicate',
  },
  archive: {
    id: `${scope}.archive`,
    defaultMessage: 'Archive',
  },
  sendCopyModalTitle: {
    id: `${scope}.sendCopyModalTitle`,
    defaultMessage: 'Choose researchers to send',
  },
  participantShareModalTitle: {
    id: `${scope}.participantShareModalTitle`,
    defaultMessage: 'Send an email with the invitation',
  },
  anyone: {
    id: `${scope}.anyone`,
    defaultMessage: 'Anyone with the link can access sessions',
  },
  registered: {
    id: `${scope}.registered`,
    defaultMessage:
      'Anyone who is a registered participant can access sessions',
  },
  invited: {
    id: `${scope}.invited`,
    defaultMessage: 'Only selected registered participants can access sessions',
  },
  sessionDeleteHeader: {
    id: `${scope}.sessionDeleteHeader`,
    defaultMessage: 'Delete Session',
  },
  sessionDeleteMessage: {
    id: `${scope}.sessionDeleteMessage`,
    defaultMessage:
      'Are you sure you want to delete this session? It will no longer be possible to recover it later.',
  },
  interventionLanguage: {
    id: `${scope}.interventionLanguage`,
    defaultMessage: '<b>Language</b>: {language}',
  },
  interventionSettingsIconTooltip: {
    id: `${scope}.interventionSettingsIconTooltip`,
    defaultMessage: 'Open Intervention Settings',
  },
  interventionSettingsModalTitle: {
    id: `${scope}.interventionSettingsModalTitle`,
    defaultMessage: 'Intervention Settings',
  },
  interventionSettingsLanguageLabel: {
    id: `${scope}.interventionSettingsLanguageLabel`,
    defaultMessage: 'Intervention Language:',
  },
});
