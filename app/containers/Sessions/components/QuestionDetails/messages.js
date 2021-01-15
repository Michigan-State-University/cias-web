/*
 * QuestionDetails Messages
 *
 * This contains all the text for the QuestionDetails component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.QuestionDetails';

export default defineMessages({
  nextQuestion: {
    id: `${scope}.nextQuestion`,
    defaultMessage: 'Next screen',
  },
  groupPlaceholder: {
    id: `${scope}.groupPlaceholder`,
    defaultMessage: 'Group placeholder',
  },
});
