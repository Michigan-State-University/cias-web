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
  stopFeatureInfo: {
    id: `${scope}.stopFeatureInfo`,
    defaultMessage: `Participants can stop all scheduled messages by responding "STOP" or resume with "START". Click <a href='https://support.twilio.com/hc/en-us/articles/223183068-Twilio-international-phone-number-availability-and-their-capabilities#sms_enabled' target='_blank'>here</a> to see supported countries.`,
  },
});
