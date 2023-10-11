import { defineMessages } from 'react-intl';

export const scope = 'app.global.Validators';

export default defineMessages({
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email has invalid format',
  },
  required: {
    id: `${scope}.required`,
    defaultMessage: 'This field is required',
  },
  numeric: {
    id: `${scope}.numeric`,
    defaultMessage: 'Only numeric values are allowed',
  },
  naturalNumber: {
    id: `${scope}.naturalNumber`,
    defaultMessage: 'Only natural number values are allowed',
  },
  nonNegativeInteger: {
    id: `${scope}.nonNegativeInteger`,
    defaultMessage: 'Non-negative integer value is required',
  },
  unreservedURLCharacters: {
    id: `${scope}.unreservedURLCharacters`,
    defaultMessage:
      'This field can contain letters, numbers, hyphens [-], underscores [_], periods [.], and tildes [~] only',
  },
  zipCode: {
    id: `${scope}.zipCode`,
    defaultMessage: "ZIP Code's format is incorrect",
  },
  name: {
    id: `${scope}.name`,
    defaultMessage:
      'This field can contain letters, hyphens [-], quotes [\'] ["] [`] and spaces [ ] only',
  },
});
