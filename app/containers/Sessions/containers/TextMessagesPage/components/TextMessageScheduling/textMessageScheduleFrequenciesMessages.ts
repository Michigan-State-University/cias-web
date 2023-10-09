import { defineMessages } from 'react-intl';

import { TextMessageScheduleFrequency } from 'models/TextMessage';

export const scope =
  'app.containers.TextMessageScheduling.TextMessageScheduleFrequencies';

export default defineMessages<TextMessageScheduleFrequency>({
  once: {
    id: `${scope}.once`,
    defaultMessage: 'Once',
  },
  once_a_day: {
    id: `${scope}.once_a_day`,
    defaultMessage: 'Once a day',
  },
  once_a_week: {
    id: `${scope}.once_a_week`,
    defaultMessage: 'Once a week',
  },
  once_a_month: {
    id: `${scope}.once_a_month`,
    defaultMessage: 'Once a month',
  },
});
