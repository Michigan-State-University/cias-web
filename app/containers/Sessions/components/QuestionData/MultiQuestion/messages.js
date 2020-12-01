import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Multi';

export default defineMessages({
  placeholder: {
    id: `${scope}.placeholder`,
    defaultMessage: 'Answer {index}',
  },
  addAnswer: {
    id: `${scope}.addAnswer`,
    defaultMessage: 'Add new answer',
  },
});
