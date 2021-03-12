/*
 * ReportsFilter Messages
 *
 * This contains all the text for the ReportsFilter.
 */

import { defineMessages } from 'react-intl';
import {
  THIRD_PARTY,
  PARTICIPANTS,
  SORT_BY_NEWEST,
  SORT_BY_LATEST,
} from 'global/reducers/generatedReports/constants';

export const scope = 'app.containers.ReportsFilter';

export default defineMessages({
  filterLabel: {
    id: `${scope}.filterLabel`,
    defaultMessage: 'Show reports generated for:',
  },
  [THIRD_PARTY]: {
    id: `${scope}.${THIRD_PARTY}`,
    defaultMessage: '3rd Party Users',
  },
  [PARTICIPANTS]: {
    id: `${scope}.${PARTICIPANTS}`,
    defaultMessage: 'Participants',
  },
  [SORT_BY_NEWEST]: {
    id: `${scope}.${SORT_BY_NEWEST}`,
    defaultMessage: 'Sort by Newest',
  },
  [SORT_BY_LATEST]: {
    id: `${scope}.${SORT_BY_LATEST}`,
    defaultMessage: 'Sort by Oldest',
  },
});
