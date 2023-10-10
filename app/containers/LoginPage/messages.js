/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */

import { defineMessages } from 'react-intl';
import {
  TERMS_NOT_ACCEPTED_VIEW,
  CODE_VERIFICATION_VIEW,
  LOGIN_FORM_VIEW,
} from './constants';

export const scope = 'app.containers.LoginPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'Login',
  },
  [LOGIN_FORM_VIEW]: {
    id: `${scope}.LOGIN_FORM_VIEW`,
    defaultMessage: 'Log into CIAS',
  },
  [CODE_VERIFICATION_VIEW]: {
    id: `${scope}.CODE_VERIFICATION_VIEW`,
    defaultMessage: 'Log into CIAS',
  },
  [TERMS_NOT_ACCEPTED_VIEW]: {
    id: `${scope}.TERMS_NOT_ACCEPTED_VIEW`,
    defaultMessage: 'Provide missing details',
  },
  subHeader: {
    id: `${scope}.subHeader`,
    defaultMessage: `Fields with an asterisk<warningColor>*</warningColor> are required`,
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
  accountConfirmationSuccess: {
    id: `${scope}.accountConfirmationSuccess`,
    defaultMessage: 'Account has been successfully confirmed.',
  },
  accountConfirmationError: {
    id: `${scope}.accountConfirmationError`,
    defaultMessage:
      'There was some error during email confirmation. Please contact a support.',
  },
  codeVerificationGoBack: {
    id: `${scope}.codeVerificationGoBack`,
    defaultMessage: '< Go back',
  },
  codeVerificationDescription: {
    id: `${scope}.codeVerificationDescription`,
    defaultMessage:
      'It seems that this is your first login on that browser or the trust period has ended (30 days). <br /><br />We sent you a <b>verification code</b> on your <b>email</b>.',
  },
  codeVerificationPlaceholder: {
    id: `${scope}.codeVerificationPlaceholder`,
    defaultMessage: 'Enter verification code',
  },
  codeVerificationLabel: {
    id: `${scope}.codeVerificationLabel`,
    defaultMessage: 'Verification code',
  },
  codeVerificationRequired: {
    id: `${scope}.codeVerificationRequired`,
    defaultMessage: 'Verification code is required',
  },
  codeVerificationButton: {
    id: `${scope}.codeVerificationButton`,
    defaultMessage: 'Verify',
  },
  continue: {
    id: `${scope}.continue`,
    defaultMessage: 'Continue',
  },
  lastNameRequired: {
    id: `${scope}.lastNameRequired`,
    defaultMessage: 'Last name required',
  },
  firstNameRequired: {
    id: `${scope}.firstNameRequired`,
    defaultMessage: 'First name required',
  },
  termsRequired: {
    id: `${scope}.termsRequired`,
    defaultMessage: 'You need to accept terms and conditions',
  },
  lastNameLabel: {
    id: `${scope}.lastName`,
    defaultMessage: 'Last name',
  },
  firstNameLabel: {
    id: `${scope}.firstNameLabel`,
    defaultMessage: 'First name',
  },
  goBackToLoginPage: {
    id: `${scope}.goBackToLoginPage`,
    defaultMessage: 'Go back to login page',
  },
});
