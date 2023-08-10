import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ManageCollectedData';

export default defineMessages({
  manageCollectedData: {
    id: `${scope}.manageCollectedData`,
    defaultMessage: 'Manage collected data',
  },
  clearDataTitle: {
    id: `${scope}.clearDataTitle`,
    defaultMessage: 'Clear personal data',
  },
  clearDataDescription: {
    id: `${scope}.clearDataDescription`,
    defaultMessage:
      'Remove all personal user data gathered in this intervention',
  },
  deleteReportsTitle: {
    id: `${scope}.deleteReportsTitle`,
    defaultMessage: 'Delete generated reports',
  },
  deleteReportsDescription: {
    id: `${scope}.deleteReportsDescription`,
    defaultMessage: 'Remove all generated report files in this intervention',
  },
});
