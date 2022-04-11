/*
 * Select messages
 *
 * This file contains all the texts for the Select component and its variants.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Select';

export default defineMessages({
  popular: {
    id: `${scope}.popular`,
    defaultMessage: 'Popular',
  },
  other: {
    id: `${scope}.other`,
    defaultMessage: 'Other',
  },
});
