import { defineMessages } from 'react-intl';

export const scope = 'app.components.TimeRanges';

export default defineMessages({
  timeRangesTitle: {
    id: `${scope}.timeRangesTitle`,
    defaultMessage: 'Choose preferred time for receiving text messages',
  },
  noon: {
    id: `${scope}.noon`,
    defaultMessage: 'noon',
  },
  timeRangeOption: {
    id: `${scope}.timeRangeOption`,
    defaultMessage:
      '{label, select, early_morning {Early morning} mid_morning {Mid-morning} afternoon {Afternoon} early_evening {Early evening} night {Night} other {Other}} ({from} to {to})',
  },
});
