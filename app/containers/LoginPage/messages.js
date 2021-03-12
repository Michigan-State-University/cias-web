/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LoginPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'Login',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Log into CIAS',
  },
  loginButton: {
    id: `${scope}.loginButton`,
    defaultMessage: 'Log in',
  },
  emailPlaceholder: {
    id: `${scope}.emailPlaceholder`,
    defaultMessage: 'Enter e-mail address',
  },
  passwordPlaceholder: {
    id: `${scope}.passwordPlaceholder`,
    defaultMessage: 'Enter password',
  },
  register: {
    id: `${scope}.register`,
    defaultMessage: 'Create participant account',
  },
  or: {
    id: `${scope}.or`,
    defaultMessage: 'or',
  },
  emailLabel: {
    id: `${scope}.emailLabel`,
    defaultMessage: 'E-mail address',
  },
  passwordLabel: {
    id: `${scope}.passwordLabel`,
    defaultMessage: 'Password',
  },
  validEmail: {
    id: `${scope}.validEmail`,
    defaultMessage: 'Provide valid email',
  },
  emailRequired: {
    id: `${scope}.emailRequired`,
    defaultMessage: 'Email is required',
  },
  passwordRequired: {
    id: `${scope}.passwordRequired`,
    defaultMessage: 'Password is required',
  },
  forgotPassword: {
    id: `${scope}.forgotPassword`,
    defaultMessage: 'Forgot your password?',
  },
  accountConfirmation: {
    success: {
      id: `${scope}.accountConfirmationSuccess`,
      defaultMessage: 'Account has been successfully confirmed.',
    },
    error: {
      id: `${scope}.accountConfirmationError`,
      defaultMessage:
        'There was some error during email confirmation. Please contact a support.',
    },
  },
});
