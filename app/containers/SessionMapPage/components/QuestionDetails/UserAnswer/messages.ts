/*
 * UserAnswer Messages
 *
 * This contains all the text for the UserAnswer components.
 */
import { defineMessages } from 'react-intl';

import { QuestionTypes } from 'models/Question';

export const scope = 'app.containers.UserAnswer';

export default defineMessages({
  yourAnswer: {
    id: `${scope}.yourAnswer`,
    defaultMessage: 'Your answer',
  },
  [QuestionTypes.INFORMATION.valueOf()]: {
    id: `${scope}.${QuestionTypes.INFORMATION}`,
    defaultMessage:
      'This screen is only informational, so does not contain any answers',
  },
  [QuestionTypes.EXTERNAL_LINK.valueOf()]: {
    id: `${scope}.${QuestionTypes.EXTERNAL_LINK}`,
    defaultMessage:
      'This is an external link screen that does not contain any answers.',
  },
  [QuestionTypes.FEEDBACK.valueOf()]: {
    id: `${scope}.${QuestionTypes.FEEDBACK}`,
    defaultMessage:
      'This is a feedback screen that does not contain any answers.',
  },
  [QuestionTypes.FINISH.valueOf()]: {
    id: `${scope}.${QuestionTypes.FINISH}`,
    defaultMessage:
      'This is a finish screen that does not contain any answers.',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Name: {name}',
  },
  spelling: {
    id: `${scope}.spelling`,
    defaultMessage: 'Spelling: {spelling}',
  },
  currency: {
    id: `${scope}.currency`,
    defaultMessage: 'Currency:',
  },
  amount: {
    id: `${scope}.amount`,
    defaultMessage: 'Amount: {amount}',
  },
  yes: {
    id: `${scope}.yes`,
    defaultMessage: 'Yes',
  },
  no: {
    id: `${scope}.no`,
    defaultMessage: 'No',
  },
  phonePrefix: {
    id: `${scope}.phonePrefix`,
    defaultMessage: 'Phone prefix:',
  },
  phoneNumber: {
    id: `${scope}.phoneNumber`,
    defaultMessage: 'Phone number: {number}',
  },
});
