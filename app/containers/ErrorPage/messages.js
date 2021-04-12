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
    defaultMessage: 'An error has occurred in the system.',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: `<b>An error has occurred in the system.</b><br>Our software development team has received a message about this error.<br>Please click here if you’d like to provide our team with any additional information.<br><br>To continue, please refresh or go to the main page.`,
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
