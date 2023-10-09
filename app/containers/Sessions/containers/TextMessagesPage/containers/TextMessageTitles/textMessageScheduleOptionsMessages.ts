import { defineMessages } from 'react-intl';

import { TextMessageScheduleOption } from 'models/TextMessage';

export const scope =
  'app.containers.TextMessageTitles.TextMessageScheduleOptions';

export default defineMessages<TextMessageScheduleOption>({
  after_session_end: {
    id: `${scope}.after_session_end`,
    defaultMessage: 'Send after the session is completed',
  },
  days_after_session_end: {
    id: `${scope}.days_after_session_end`,
    defaultMessage: 'Send {days} days after the session is completed',
  },
});
