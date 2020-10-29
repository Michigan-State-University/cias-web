/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HomePage';

export default defineMessages({
  createIntervention: {
    id: `${scope}.createIntervention`,
    defaultMessage: 'Create intervention',
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
  placeholder: {
    id: `${scope}.placeholder`,
    defaultMessage: 'e-Intervention Name',
  },
  adjust: {
    id: `${scope}.adjust`,
    defaultMessage: 'Edit',
  },
  copy: {
    id: `${scope}.copy`,
    defaultMessage: 'Send copy to researcher',
  },
  duplicate: {
    id: `${scope}.duplicate`,
    defaultMessage: 'Duplicate intervention',
  },
  archive: {
    id: `${scope}.archive`,
    defaultMessage: 'Archive intervention',
  },
  modalTitle: {
    id: `${scope}.modalTitle`,
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
});
