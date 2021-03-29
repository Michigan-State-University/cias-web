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
    defaultMessage:
      'Your email is: <span style="font-weight: 700;">{email}</span>',
  },
  dashboard: {
    id: `${scope}.dashboard`,
    defaultMessage: 'Go to dashboard',
  },
});
