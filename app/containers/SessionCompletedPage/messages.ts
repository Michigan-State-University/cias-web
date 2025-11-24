import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SessionCompletedPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'Session Completed',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Thank you',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage:
      'Your responses have been recorded and you can close the browser.',
  },
});
