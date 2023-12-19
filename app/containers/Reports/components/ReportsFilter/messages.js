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
  HENRY_FORD_HEALTH,
} from 'global/reducers/generatedReports/constants';

export const scope = 'app.containers.ReportsFilter';

export default defineMessages({
  filterLabel: {
    id: `${scope}.filterLabel`,
    defaultMessage: 'Show reports generated for:',
  },
  [THIRD_PARTY]: {
    id: `${scope}.third_party`,
    defaultMessage: '3rd Party Users',
  },
  [PARTICIPANTS]: {
    id: `${scope}.participant`,
    defaultMessage: 'Participants',
  },
  [HENRY_FORD_HEALTH]: {
    id: `${scope}.henry_ford_health`,
    defaultMessage: 'Henry Ford',
  },
  [SORT_BY_NEWEST]: {
    id: `${scope}.desc`,
    defaultMessage: 'Sort by Newest',
  },
  [SORT_BY_LATEST]: {
    id: `${scope}.asc`,
    defaultMessage: 'Sort by Oldest',
  },
  selectorAriaLabel: {
    id: `${scope}.selectorAriaLabel`,
    defaultMessage: 'Sort reports by date: ascending/descending',
  },
});
