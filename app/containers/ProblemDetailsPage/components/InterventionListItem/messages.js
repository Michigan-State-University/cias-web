/*
 * InterventionListItem Messages
 *
 * This contains all the text for the InterventionListItem container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.InterventionListItem';

export default defineMessages({
  copy: {
    id: `${scope}.copy`,
    defaultMessage: 'Send copy to researcher',
  },
  duplicate: {
    id: `${scope}.duplicate`,
    defaultMessage: 'Duplicate session',
  },
  archive: {
    id: `${scope}.archive`,
    defaultMessage: 'Archive session',
  },
});
