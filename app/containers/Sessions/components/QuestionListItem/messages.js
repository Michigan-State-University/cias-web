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
    defaultMessage: `Deleting Henry Ford Initial Screen <bold>doesn’t affect HF Question screens</bold>. We don't delete them, but they won't be sent to HF. They will <bold>work as Single Answer screens</bold>.`,
  },
  confirmDeletingScreen: {
    id: `${scope}.confirmDeletingScreen`,
    defaultMessage: 'Yes, delete',
  },
});
