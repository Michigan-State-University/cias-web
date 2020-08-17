/*
 * Problem Messages
 *
 * This contains all the text for the Problem saga.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Problem';

export default defineMessages({
  csvError: {
    id: `${scope}.csvError`,
    defaultMessage: 'Unable to generate the file',
  },
});
