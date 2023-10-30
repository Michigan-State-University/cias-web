/*
 * TextMessageScheduling
 *
 * This contains all the text for the TextMessageScheduling.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.TextMessageScheduling';

export default defineMessages({
  send: {
    id: `${scope}.send`,
    defaultMessage: 'Send',
  },
  number: {
    id: `${scope}.number`,
    defaultMessage: 'Number',
  },
  frequency: {
    id: `${scope}.frequency`,
    defaultMessage: 'Frequency:',
  },
  sendDays: {
    id: `${scope}.sendDays`,
    defaultMessage: 'days after the session is completed',
  },
  finishBy: {
    id: `${scope}.finishBy`,
    defaultMessage: 'finish by ',
  },
  provideDate: {
    id: `${scope}.provideDate`,
    defaultMessage: 'Provide completion date',
  },
});
