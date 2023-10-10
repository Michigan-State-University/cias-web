import { defineMessages } from 'react-intl';

import { TextMessageScheduleOption } from 'models/TextMessage';

export const scope =
  'app.containers.TextMessageTitles.TextMessageScheduleOptions';

export default defineMessages<TextMessageScheduleOption>({
  [TextMessageScheduleOption.AFTER_FILL]: {
    id: `${scope}.after_session_end`,
    defaultMessage: 'Send after the session is completed',
  },
  [TextMessageScheduleOption.DAYS_AFTER_FILL]: {
    id: `${scope}.days_after_session_end`,
    defaultMessage: 'Send {days} days after the session is completed',
  },
});
