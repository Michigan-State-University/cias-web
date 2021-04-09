/*
 * SetNewPasswordPage Messages
 *
 * This contains all the text for the SetNewPasswordPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SetNewPasswordPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'Set password',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Set a new password',
  },
  passwordRequired: {
    id: `${scope}.passwordRequired`,
    defaultMessage: 'Password is required',
  },
  passwordLength: {
    id: `${scope}.passwordLength`,
    defaultMessage: 'Password must have at least {length} characters',
  },
  passwordInvalid: {
    id: `${scope}.passwordInvalid`,
    defaultMessage:
      "Password must contain capital letter, small letter, digit and special character (for example !@#$%^&*\"-+=`~:;|',.?\\\\/[]()<>'{}')",
  },
  passwordMatch: {
    id: `${scope}.passwordMatch`,
    defaultMessage: 'Password must match',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Enter password',
  },
  passwordLabel: {
    id: `${scope}.passwordLabel`,
    defaultMessage: 'Password',
  },
  confirmPasswordLabel: {
    id: `${scope}.confirmPasswordLabel`,
    defaultMessage: 'Password confirmation',
  },
  confirmPassword: {
    id: `${scope}.confirmPassword`,
    defaultMessage: 'Retype your password',
  },
  resetPassword: {
    id: `${scope}.resetPassword`,
    defaultMessage: 'Set password',
  },
  passwordChanged: {
    id: `${scope}.passwordChanged`,
    defaultMessage: 'New password was successfully set!',
  },
});
