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
    defaultMessage: 'You do not have access',
  },
  textLoggedIn: {
    id: `${scope}.textLoggedIn`,
    defaultMessage:
      'It seems that your current account does not have sufficient permissions. Go back to main page or log in with different account',
  },
  textNotLoggedIn: {
    id: `${scope}.textNotLoggedIn`,
    defaultMessage:
      'Please Log In or create an account by clicking on the button below to view this page',
  },
  defaultErrorCode: {
    id: `${scope}.defaultErrorCode`,
    defaultMessage: 'No access',
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
