/*
 * ProblemPage Messages
 *
 * This contains all the text for the ProblemPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ProblemPage';

export default defineMessages({
  createProblem: {
    id: `${scope}.createProblem`,
    defaultMessage: 'Create a new intervention',
  },
  myProblems: {
    id: `${scope}.myProblems`,
    defaultMessage: 'My Dashboard',
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
