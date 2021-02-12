import { defineMessages } from 'react-intl';

export const scope = 'app.containers.QuestionListItem';

export default defineMessages({
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete',
  },
  copy: {
    id: `${scope}.copy`,
    defaultMessage: 'Copy',
  },
  duplicate: {
    id: `${scope}.duplicate`,
    defaultMessage: 'Duplicate',
  },
  pasteQuestion: {
    id: `${scope}.pasteQuestion`,
    defaultMessage: 'Paste question in this group',
  },
});
