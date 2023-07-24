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
  enterName: {
    id: `${scope}.enterName`,
    defaultMessage: 'Enter your name',
  },
  nameHelp: {
    id: `${scope}.nameHelp`,
    defaultMessage:
      'You can call the participant by their name throughout the session. Click <a href="https://www.cias.app/_files/ugd/afc5c9_fc039ef55e38488b82f319a7b5112761.pdf" target="_blank">here</a> to see a step-by-step guide. For more help resources, visit <a href="https://www.cias.app/resources" target="_blank">www.cias.app/resources</a>.',
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
    defaultMessage: 'Please provide your email',
  },
  emailPlaceholder: {
    id: `${scope}.emailPlaceholder`,
    defaultMessage: 'Email...',
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
  goToDashboard: {
    id: `${scope}.goToDashboard`,
    defaultMessage: 'Go to dashboard',
  },
  goToSessionMap: {
    id: `${scope}.goToSessionMap`,
    defaultMessage: 'Go to session map',
  },
  wcagExternalLinkWarning: {
    id: `${scope}.wcagExternalLinkWarning`,
    defaultMessage:
      'Clicking this link will take you to a different website. You can click the CIAS tab in your browser to return back to CIAS at any time',
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
    defaultMessage: 'Question {questionIndex} and Answer {answerIndex}',
  },
  numberQuestionLabel: {
    id: `${scope}.numberQuestionLabel`,
    defaultMessage: 'Provide a numeric value:',
  },
  textBoxQuestionRemainingCharacters: {
    id: `${scope}.textBoxQuestionRemainingCharacters`,
    defaultMessage: 'Remaining characters: {remaining}',
  },
  goBackToModules: {
    id: `${scope}.backToModules`,
    defaultMessage: '← Back to modules view',
  },
  goToNextModule: {
    id: `${scope}.goToNextModule`,
    defaultMessage: 'Go to next module',
  },
  completeSession: {
    id: `${scope}.completeSession`,
    defaultMessage: 'Complete Session',
  },
  numericQuestionDigitsBetween: {
    id: `${scope}.numericQuestionDigitsBetween`,
    defaultMessage: 'Number between {minLength} and {maxLength} digits',
  },
  numericQuestionDigitsMinimum: {
    id: `${scope}.numericQuestionDigitsMinimum`,
    defaultMessage: 'Minimum {minLength} digits',
  },
  numericQuestionDigitsMaximum: {
    id: `${scope}.numericQuestionDigitsMaximum`,
    defaultMessage: 'Maximum {maxLength} digits',
  },
  firstName: {
    id: `${scope}.firstName`,
    defaultMessage: 'First Name',
  },
  firstNamePlaceholder: {
    id: `${scope}.firstNamePlaceholder`,
    defaultMessage: 'Enter your first name here',
  },
  lastName: {
    id: `${scope}.lastName`,
    defaultMessage: 'Last Name',
  },
  lastNamePlaceholder: {
    id: `${scope}.lastNamePlaceholder`,
    defaultMessage: 'Enter your last name here',
  },
  sex: {
    id: `${scope}.sex`,
    defaultMessage: 'Sex',
  },
  sexPlaceholder: {
    id: `${scope}.sexPlaceholder`,
    defaultMessage: 'Choose your sex',
  },
  dateOfBirth: {
    id: `${scope}.dateOfBirth`,
    defaultMessage: 'Date of Birth',
  },
  zipCode: {
    id: `${scope}.zipCode`,
    defaultMessage: 'ZIP Code',
  },
  zipCodePlaceholder: {
    id: `${scope}.zipCodePlaceholder`,
    defaultMessage: 'Enter your ZIP Code here',
  },
  phoneNumberPrefix: {
    id: `${scope}.phoneNumberPrefix`,
    defaultMessage: 'Phone number prefix',
  },
  phoneNumber: {
    id: `${scope}.phoneNumber`,
    defaultMessage: 'Phone number',
  },
  phoneType: {
    id: `${scope}.phoneType`,
    defaultMessage: 'Phone type',
  },
  phoneTypePlaceholder: {
    id: `${scope}.phoneTypePlaceholder`,
    defaultMessage: 'Choose phone type',
  },
  verifyErrorMessage: {
    id: `${scope}.verifyErrorMessage`,
    defaultMessage:
      'Unknown error occurred. Try again or contact the administrator',
  },
});
