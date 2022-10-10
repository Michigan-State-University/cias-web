import { defineMessages } from 'react-intl';

export const scope = 'app.containers.QuestionListItem';

export default defineMessages({
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete',
  },
  copy: {
    id: `${scope}.copy`,
    defaultMessage: 'Duplicate internally',
  },
  duplicateHere: {
    id: `${scope}.duplicateHere`,
    defaultMessage: 'Duplicate here',
  },
  pasteQuestion: {
    id: `${scope}.pasteQuestion`,
    defaultMessage: 'Paste question in this group',
  },
  deleteModalTitle: {
    id: `${scope}.deleteModalTitle`,
    defaultMessage: 'Do you want to delete this screen?',
  },
  deleteModalContent: {
    id: `${scope}.deleteModalContent`,
    defaultMessage: 'This operation is irreversible!',
  },
  deleteHFInitialScreenModalContent: {
    id: `${scope}.deleteHFInitialScreenModalContent`,
    defaultMessage:
      'Deleting this screen will disable sending data to Henry Ford.',
  },
  confirmDeletingScreen: {
    id: `${scope}.confirmDeletingScreen`,
    defaultMessage: 'Yes, delete',
  },
});
