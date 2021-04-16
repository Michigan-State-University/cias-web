import { defineMessages } from 'react-intl';

export const scope = 'app.containers.QuestionListItem';

export default defineMessages({
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete',
  },
  copy: {
    id: `${scope}.copy`,
    defaultMessage: 'Share copy',
  },
  duplicate: {
    id: `${scope}.duplicate`,
    defaultMessage: 'Duplicate',
  },
  pasteQuestion: {
    id: `${scope}.pasteQuestion`,
    defaultMessage: 'Paste question in this group',
  },
  deleteModalTitle: {
    id: `${scope}.deleteModalTitle`,
    defaultMessage: 'Are you sure you want to delete this Screen?',
  },
  deleteModalContent: {
    id: `${scope}.deleteModalContent`,
    defaultMessage: 'This operation is irreversible!',
  },
});
