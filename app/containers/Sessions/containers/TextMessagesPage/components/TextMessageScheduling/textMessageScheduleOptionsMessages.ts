import { defineMessages } from 'react-intl';

import { TextMessageScheduleOption } from 'models/TextMessage';

export const scope =
  'app.containers.TextMessageScheduling.TextMessageScheduleOptions';

export default defineMessages<TextMessageScheduleOption>({
  [TextMessageScheduleOption.AFTER_FILL]: {
    id: `${scope}.after_session_end`,
    defaultMessage: 'Send immediately after session completion',
  },
  [TextMessageScheduleOption.DAYS_AFTER_FILL]: {
    id: `${scope}.days_after_session_end`,
    defaultMessage: 'Send [X] days after session completed date',
  },
});
