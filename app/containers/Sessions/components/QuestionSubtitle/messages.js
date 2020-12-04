import { defineMessages } from 'react-intl';

export const scope = 'app.containers.QuestionTitle';

export default defineMessages({
  placeholder: {
    id: `${scope}.placeholder`,
    defaultMessage: 'Type subtitle here...',
  },
  nextQuestion: {
    id: `${scope}.nextQuestion`,
    defaultMessage: 'Next screen',
  },
});
