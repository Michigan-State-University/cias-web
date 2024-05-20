import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SmsSettingsTab.acceptedAnswers';

export default defineMessages({
  acceptedAnswersLabel: {
    id: `${scope}.acceptedAnswersLabel`,
    defaultMessage: 'Accepted Answers',
  },
  specified: {
    id: `${scope}.specified`,
    defaultMessage: 'Specified',
  },
  range: {
    id: `${scope}.range`,
    defaultMessage: 'Range',
  },
  predefinedValues: {
    id: `${scope}.predefinedValues`,
    defaultMessage: 'Provide desired values divided by commas',
  },
  rangeFromAcceptedValues: {
    id: `${scope}.rangeFromAcceptedValues`,
    defaultMessage: 'From',
  },
  rangeToAcceptedValues: {
    id: `${scope}.rangeToAcceptedValues`,
    defaultMessage: 'To',
  },
  answerIfWrong: {
    id: `${scope}.answerIfWrong`,
    defaultMessage: 'Error message if value is not within specified range',
  },
});
