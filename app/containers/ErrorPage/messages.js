/*
 * ErrorPage Messages
 *
 * This contains all the text for the ErrorPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ErrorPage';

export default defineMessages({
  helmetTitle: {
    id: `${scope}.helmetTitle`,
    defaultMessage: 'Error',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage:
      'Some error occurred in the App. Please refresh or go to the Main Page.',
  },
  errorCode: {
    id: `${scope}.errorCode`,
    defaultMessage: 'Error',
  },
  toMainPage: {
    id: `${scope}.toMainPage`,
    defaultMessage: 'Go to Main Page',
  },
  refresh: {
    id: `${scope}.refresh`,
    defaultMessage: 'Refresh Page',
  },
});
