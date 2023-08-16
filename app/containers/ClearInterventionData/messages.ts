import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ManageCollectedData';

export default defineMessages({
  clearCollectedData: {
    id: `${scope}.clearCollectedData`,
    defaultMessage: 'Clear collected data',
  },
  clearDataConfirmationContent: {
    id: `${scope}.clearDataConfirmationContent`,
    defaultMessage:
      'Do you want to clear all collected data (both user responses and generated reports) in this intervention? ',
  },
  clearDataConfirmationNote: {
    id: `${scope}.clearDataConfirmationNote`,
    defaultMessage:
      'Please note: After performing this action users will be notified and the data will be removed in 5 days. Until then, users will be able to log in and download report files. This action is irreversible.',
  },
  clearDataConfirmationButtonTitle: {
    id: `${scope}.clearDataConfirmationButtonTitle`,
    defaultMessage: 'Clear data',
  },
});
