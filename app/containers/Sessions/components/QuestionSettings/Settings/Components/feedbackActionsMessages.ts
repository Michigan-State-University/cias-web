import { defineMessages } from 'react-intl';

import { EFeedbackAction } from 'models/Narrator/FeedbackActions';

export const scope = 'app.containers.DefaultSettings.FeedbackActions';

export default defineMessages<EFeedbackAction>({
  SHOW_SPECTRUM: {
    id: `${scope}.SHOW_SPECTRUM`,
    defaultMessage: 'Show Spectrum',
  },
  SHOW_USER_VALUE: {
    id: `${scope}.SHOW_USER_VALUE`,
    defaultMessage: 'Show End-User Value',
  },
  SHOW_LOWER_VALUE: {
    id: `${scope}.SHOW_LOWER_VALUE`,
    defaultMessage: 'Show Lower Value',
  },
  SHOW_HIGHER_VALUE: {
    id: `${scope}.SHOW_HIGHER_VALUE`,
    defaultMessage: 'Show Higher Value',
  },
  NO_ACTION: {
    id: `${scope}.NO_ACTION`,
    defaultMessage: 'Manual positioning',
  },
});
