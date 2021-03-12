/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.NotFoundPage';

export default defineMessages({
  defaultHeader: {
    id: `${scope}.header`,
    defaultMessage: 'Looks like you’re lost.',
  },
  defaultText: {
    id: `${scope}.defaultText`,
    defaultMessage: 'We can’t find the page you’re looking for.',
  },
  defaultErrorCode: {
    id: `${scope}.defaultErrorCode`,
    defaultMessage: 'Not Found',
  },
  back: {
    id: `${scope}.back`,
    defaultMessage: 'Go Back',
  },
  toMainPage: {
    id: `${scope}.toMainPage`,
    defaultMessage: 'Go to Main Page',
  },
  toLogin: {
    id: `${scope}.toLogin`,
    defaultMessage: 'Log in',
  },
});
