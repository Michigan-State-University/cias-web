/*
 * VariableChooser Messages
 *
 * This contains all the text for the VariableChooser container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.VariableChooser';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Next Screen',
  },
  noVariables: {
    id: `${scope}.noVariables`,
    defaultMessage: 'No Variables defined yet',
  },
  noSessions: {
    id: `${scope}.noSessions`,
    defaultMessage: 'No Sessions to choose',
  },
  noInterventions: {
    id: `${scope}.noInterventions`,
    defaultMessage: 'No Interventions to choose',
  },
  selectedInterventionBadge: {
    id: `${scope}.selectedInterventionBadge`,
    defaultMessage: 'Current',
  },
});
