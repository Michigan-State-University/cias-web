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
  myIntervention: {
    id: `${scope}.myIntervention`,
    defaultMessage: 'My e-Interventions',
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
    defaultMessage: 'Adjust',
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
});
