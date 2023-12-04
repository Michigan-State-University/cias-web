import { defineMessages } from 'react-intl';

import { TextMessageScheduleFrequency } from 'models/TextMessage';

export const scope =
  'app.containers.TextMessageScheduling.TextMessageScheduleFrequencies';

export default defineMessages<TextMessageScheduleFrequency>({
  [TextMessageScheduleFrequency.ONCE]: {
    id: `${scope}.once`,
    defaultMessage: 'Once',
  },
  [TextMessageScheduleFrequency.ONCE_DAY]: {
    id: `${scope}.once_a_day`,
    defaultMessage: 'Once a day',
  },
  [TextMessageScheduleFrequency.ONCE_WEEK]: {
    id: `${scope}.once_a_week`,
    defaultMessage: 'Once a week',
  },
  [TextMessageScheduleFrequency.ONCE_MONTH]: {
    id: `${scope}.once_a_month`,
    defaultMessage: 'Once a month',
  },
});
