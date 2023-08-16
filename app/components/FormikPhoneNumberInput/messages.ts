import { defineMessages } from 'react-intl';

export const scope = 'app.components.FormikPhoneNumberInput';

export default defineMessages({
  phoneNumberLabel: {
    id: `${scope}.phoneNumberLabel`,
    defaultMessage: 'Phone number',
  },
  phoneNumberPrefixLabel: {
    id: `${scope}.phoneNumberPrefixLabel`,
    defaultMessage: 'Phone prefix',
  },
  countryCode: {
    id: `${scope}.countryCode`,
    defaultMessage: 'Code',
  },
  phoneNumber: {
    id: `${scope}.phoneNumber`,
    defaultMessage: 'Enter phone number',
  },
  phoneNumberRequired: {
    id: `${scope}.phoneNumberRequired`,
    defaultMessage: 'Phone number is required',
  },
  phoneNumberCodeRequired: {
    id: `${scope}.phoneNumberCodeRequired`,
    defaultMessage: 'Code is required',
  },
  phoneNumberInvalid: {
    id: `${scope}.phoneNumberInvalid`,
    defaultMessage: 'Phone number is invalid',
  },
});
