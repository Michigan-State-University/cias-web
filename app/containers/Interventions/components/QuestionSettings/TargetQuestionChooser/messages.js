/*
 * TargetQuestionChooser Messages
 *
 * This contains all the text for the TargetQuestionChooser container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.TargetQuestionChooser';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Next Screen',
  },
  interventionListHeader: {
    id: `${scope}.interventionListHeader`,
    defaultMessage: 'Your interventions',
  },
  selectedInterventionBadge: {
    id: `${scope}.selectedInterventionBadge`,
    defaultMessage: 'Current',
  },
});
