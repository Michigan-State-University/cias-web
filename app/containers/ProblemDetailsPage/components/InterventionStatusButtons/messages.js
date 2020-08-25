/*
 * InterventionStatusButtons Messages
 *
 * This contains all the text for the InterventionStatusButtons component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.InterventionStatusButtons';

export default defineMessages({
  publish: {
    id: `${scope}.publish`,
    defaultMessage: 'Publish Intervention',
  },
  close: {
    id: `${scope}.close`,
    defaultMessage: 'Close Intervention',
  },
  csv: {
    id: `${scope}.csv`,
    defaultMessage: 'Get CSV with results',
  },
});
