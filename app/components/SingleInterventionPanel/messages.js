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
});
