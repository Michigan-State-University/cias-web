import { defineMessages } from 'react-intl';

export const scope = 'app.components.InterventionNotAvailableInfo';

export default defineMessages({
  studyNotAvailableTitle: {
    id: `${scope}.studyNotAvailableTitle`,
    defaultMessage: 'Study unavailable',
  },
  moduleNotAvailableTitle: {
    id: `${scope}.moduleNotAvailableTitle`,
    defaultMessage: 'Module unavailable',
  },
  toMainPage: {
    id: `${scope}.toMainPage`,
    defaultMessage: 'Go to Main Page',
  },
});
