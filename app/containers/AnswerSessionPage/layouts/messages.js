import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Answer.layouts';

export default defineMessages({
  textPlaceholder: {
    id: `${scope}.textPlaceholder`,
    defaultMessage: 'Enter your response here',
  },
  numberPlaceholder: {
    id: `${scope}.numberPlaceholder`,
    defaultMessage: 'ex: 1, 2, 100',
  },
  numberValidationError: {
    id: `${scope}.numberValidationError`,
    defaultMessage: 'Only numerical values are allowed. E.g. 1, 2, 100.',
  },
  endUserValue: {
    id: `${scope}.endUserValue`,
    defaultMessage: 'You',
  },
  chooseDate: {
    id: `${scope}.chooseDate`,
    defaultMessage: 'Choose date',
  },
  enterName: {
    id: `${scope}.enterName`,
    defaultMessage: 'Enter your name',
  },
  enterNamePhonetically: {
    id: `${scope}.enterNamePhonetically`,
    defaultMessage: 'Spell your name how it sounds',
  },
  amountPlaceholder: {
    id: `${scope}.amountPlaceholder`,
    defaultMessage: 'E.g. 121.12',
  },
  provideEmail: {
    id: `${scope}.provideEmail`,
    defaultMessage: 'Provide your email',
  },
  emailPlaceholder: {
    id: `${scope}.emailPlaceholder`,
    defaultMessage: 'Email...',
  },
  reportHeader: {
    id: `${scope}.reportHeader`,
    defaultMessage:
      'Would you like to receive a report generated from your responses?',
  },
  reportYesOption: {
    id: `${scope}.reportYesOption`,
    defaultMessage: 'Yes',
  },
  reportNoOption: {
    id: `${scope}.reportNoOption`,
    defaultMessage: 'No',
  },
  participantReportUserEmail: {
    id: `${scope}.participantReportUserEmail`,
    defaultMessage: 'Your email is: <b>{email}</b>',
  },
  dashboard: {
    id: `${scope}.dashboard`,
    defaultMessage: 'Go to dashboard',
  },
  wcagThirdPartyWarning: {
    id: `${scope}.wcagThirdPartyWarning`,
    defaultMessage:
      'Please note that selecting a Person in here means that someone outside the system will receive a report based on Your answers in this Session.',
  },
  wcagExternalLinkWarning: {
    id: `${scope}.wcagExternalLinkWarning`,
    defaultMessage: 'Please verify the validity of the External Link.',
  },
  sliderLabel: {
    id: `${scope}.sliderLabel`,
    defaultMessage: 'Select a value on a slider:',
  },
  feedbackLabel: {
    id: `${scope}.feedbackLabel`,
    defaultMessage: 'This is your feedback value presented on a slider scale:',
  },
  currencyCodeLabel: {
    id: `${scope}.currencyCodeLabel`,
    defaultMessage: 'Currency',
  },
  currencyAmountLabel: {
    id: `${scope}.currencyAmountLabel`,
    defaultMessage: 'Amount',
  },
  gridLabel: {
    id: `${scope}.gridLabel`,
    defaultMessage:
      'Question {questionIndex}: {questionText}; Answer {answerIndex}: {answerText}.',
  },
  numberQuestionLabel: {
    id: `${scope}.numberQuestionLabel`,
    defaultMessage: 'Provide a numeric value:',
  },
});
