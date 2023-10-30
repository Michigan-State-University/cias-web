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
      'Do you want to clear all collected data in this intervention (both user responses and generated reports)?',
  },
  clearDataConfirmationNote: {
    id: `${scope}.clearDataConfirmationNote`,
    defaultMessage:
      'Set above value to 0 if you want this action done immediately. You can also give users some time to download their reports before being deleted. This action is irreversible.',
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
      'All sensitive data associated with this intervention will be deleted <primaryColorBold>{time}</primaryColorBold>.',
  },
  removedTitle: {
    id: `${scope}.removedTitle`,
    defaultMessage: 'Data deleted',
  },
  removedContent: {
    id: `${scope}.removedContent`,
    defaultMessage: 'Sensitive data has already been cleared.',
  },
  deleteDataIn: {
    id: `${scope}.deleteDataIn`,
    defaultMessage: 'Delete data in',
  },
  days: {
    id: `${scope}.days`,
    defaultMessage: 'days',
  },
  clearDataConfirmationTitle: {
    id: `${scope}.clearDataConfirmationTitle`,
    defaultMessage: 'Are you sure?',
  },
  clearDataConfirmationDescription: {
    id: `${scope}.clearDataConfirmationDescription`,
    defaultMessage:
      'All collected data in this intervention will be cleared. This action is irreversible.',
  },
});
