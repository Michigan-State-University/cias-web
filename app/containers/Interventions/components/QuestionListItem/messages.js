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
});
