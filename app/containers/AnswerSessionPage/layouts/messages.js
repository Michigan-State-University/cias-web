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
    defaultMessage: 'Enter your name phonetically',
  },
  amountPlaceholder: {
    id: `${scope}.amountPlaceholder`,
    defaultMessage: 'E.g. 121.12',
  },
});
