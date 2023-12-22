import { defineMessages } from 'react-intl';

import { InterventionNotAvailableReason } from './types';

export const scope =
  'app.components.InterventionNotAvailableInfo.InterventionNotAvailableReasons';

export default defineMessages<InterventionNotAvailableReason>({
  [InterventionNotAvailableReason.INTERVENTION_DRAFT]: {
    id: `${scope}.INTERVENTION_DRAFT`,
    defaultMessage: 'This study is not available yet',
  },
  [InterventionNotAvailableReason.INTERVENTION_CLOSED]: {
    id: `${scope}.INTERVENTION_CLOSED`,
    defaultMessage: 'This study has been closed',
  },
  [InterventionNotAvailableReason.INTERVENTION_PAUSED]: {
    id: `${scope}.INTERVENTION_PAUSED`,
    defaultMessage:
      'This study has been temporarily paused. Please try again later.',
  },
  [InterventionNotAvailableReason.SESSION_CLOSED]: {
    id: `${scope}.SESSION_CLOSED`,
    defaultMessage: 'This module has been closed',
  },
});
