import { defineMessages } from 'react-intl';

export const scope = 'app.containers.VerifyUserKeyPage';

export default defineMessages({
  studyNotAvailableTitle: {
    id: `${scope}.studyNotAvailableTitle`,
    defaultMessage: 'Study unavailable',
  },
  studyNotAvailableDescription: {
    id: `${scope}.studyNotAvailableDescription`,
    defaultMessage: 'This study is not available yet',
  },
  toMainPage: {
    id: `${scope}.toMainPage`,
    defaultMessage: 'Go to Main Page',
  },
});
