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
  clearDataConfirmationContent: {
    id: `${scope}.clearDataConfirmationContent`,
    defaultMessage:
      'Do you want to clear all personal user data gathered in this intervention? (e.g. answers, emails, phone numbers, fax numbers, addresses, etc.)',
  },
  clearDataConfirmationNote: {
    id: `${scope}.clearDataConfirmationNote`,
    defaultMessage: 'Please note: This action is irreversible. ',
  },
  clearDataConfirmationButtonTitle: {
    id: `${scope}.clearDataConfirmationButtonTitle`,
    defaultMessage: 'Delete user data',
  },
});
