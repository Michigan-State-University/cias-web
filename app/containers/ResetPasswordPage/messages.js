/*
 * ResetPasswordPage Messages
 *
 * This contains all the text for the ResetPasswordPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ResetPasswordPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'Reset password',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Reset password',
  },
  validEmail: {
    id: `${scope}.validEmail`,
    defaultMessage: 'Provide valid email',
  },
  emailRequired: {
    id: `${scope}.emailRequired`,
    defaultMessage: 'Email is required',
  },
  emailPlaceholder: {
    id: `${scope}.emailPlaceholder`,
    defaultMessage: 'Enter e-mail address',
  },
  emailLabel: {
    id: `${scope}.emailLabel`,
    defaultMessage: 'E-mail address',
  },
  resetPassword: {
    id: `${scope}.resetPassword`,
    defaultMessage: 'Send a link',
  },
  return: {
    id: `${scope}.return`,
    defaultMessage: 'Back to login',
  },
  linkSent: {
    id: `${scope}.linkSent`,
    defaultMessage: 'Reset link was sent! Check your e-mail address.',
  },
});
