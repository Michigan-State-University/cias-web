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
  clearData: {
    id: `${scope}.clearData`,
    defaultMessage: 'Clear data',
  },
  markedToRemoveTitle: {
    id: `${scope}.markedToRemoveTitle`,
    defaultMessage: 'Data delete in progress',
  },
  markedToRemoveContentFirst: {
    id: `${scope}.markedToRemoveContentFirst`,
    defaultMessage: 'Clearing process was triggered successfully.',
  },
  markedToRemoveContentSecond: {
    id: `${scope}.markedToRemoveContentSecond`,
    defaultMessage:
      ' All sensitive data associated with this intervention will be deleted <primaryColorBold>{time}</primaryColorBold>.',
  },
  removedTitle: {
    id: `${scope}.removedTitle`,
    defaultMessage: 'Data deleted',
  },
  removedContent: {
    id: `${scope}.removedContent`,
    defaultMessage: 'Sensitive data has already been cleared.',
  },
});
