/*
 * SessionCreateButton Messages
 *
 * This contains all the text for the SessionCreateButton component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.SessionCreateButton';

export default defineMessages({
  createNewSession: {
    id: `${scope}.createNewSession`,
    defaultMessage: 'Create a new Session',
  },
  selectSessionType: {
    id: `${scope}.selectSessionType`,
    defaultMessage: 'Select the type of new session',
  },
  create: {
    id: `${scope}.create`,
    defaultMessage: 'Create session',
  },
  classicSession: {
    id: `${scope}.classicSession`,
    defaultMessage: 'Classic session',
  },
  smsSession: {
    id: `${scope}.smsSession`,
    defaultMessage: 'SMS Session',
  },
  catSession: {
    id: `${scope}.catSession`,
    defaultMessage: 'CAT-MH™ Session',
  },
  classicSessionDescription: {
    id: `${scope}.classicSessionDescription`,
    defaultMessage:
      'This is a classic session in which you can arrange questions yourself, view them and edit them freely.',
  },
  smsSessionDescription: {
    id: `${scope}.smscSessionDescription`,
    defaultMessage:
      'This is a sms session in which you can arrange sms questions yourself, view them and edit them freely.',
  },
  catSessionDescription: {
    id: `${scope}.catSessionDescription`,
    defaultMessage:
      'The CAT-MH™ session contains predefined screens that you cannot view or edit. The questions are displayed to the participants according to the CAT-MH™ algorithm.',
  },
});
