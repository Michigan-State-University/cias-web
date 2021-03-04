/*
 * ForbiddenPage Messages
 *
 * This contains all the text for the ForbiddenPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ForbiddenPage';

export default defineMessages({
  defaultHeader: {
    id: `${scope}.header`,
    defaultMessage: 'You do not have access to view this resource.',
  },
  textLoggedIn: {
    id: `${scope}.textLoggedIn`,
    defaultMessage:
      'It seems that your current account does not have sufficient permissions. Go back to main page or log in to different account.',
  },
  textNotLoggedIn: {
    id: `${scope}.textNotLoggedIn`,
    defaultMessage: 'It seems that you are not logged in. Please log in.',
  },
  defaultErrorCode: {
    id: `${scope}.defaultErrorCode`,
    defaultMessage: 'Forbidden',
  },
  toMainPage: {
    id: `${scope}.toMainPage`,
    defaultMessage: 'Go to Main Page',
  },
  toLogin: {
    id: `${scope}.toLogin`,
    defaultMessage: 'Log in',
  },
  back: {
    id: `${scope}.back`,
    defaultMessage: 'Go Back',
  },
});
