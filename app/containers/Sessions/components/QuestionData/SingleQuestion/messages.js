import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Single';

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
