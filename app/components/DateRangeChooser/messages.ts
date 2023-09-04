import { defineMessages } from 'react-intl';

export const scope = 'app.components.DateRangeChooser';

export default defineMessages({
  dateFrom: {
    id: `${scope}.dateFrom`,
    defaultMessage: 'Date from',
  },
  dateTo: {
    id: `${scope}.dateTo`,
    defaultMessage: 'Date to',
  },
});
