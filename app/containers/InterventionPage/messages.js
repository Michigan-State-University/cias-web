/*
 * InterventionPage Messages
 *
 * This contains all the text for the InterventionPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.InterventionPage';

export default defineMessages({
  createIntervention: {
    id: `${scope}.createIntervention`,
    defaultMessage: 'Create a new intervention',
  },
  myInterventions: {
    id: `${scope}.myInterventions`,
    defaultMessage: 'My Dashboard',
  },
  teamName: {
    id: `${scope}.teamName`,
    defaultMessage: '<b>Team</b>: {teamName}',
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
  hideArchived: {
    id: `${scope}.hideArchived`,
    defaultMessage: `Hide Archived`,
  },
});
