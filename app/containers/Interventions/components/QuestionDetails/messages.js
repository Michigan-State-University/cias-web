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
    defaultMessage: 'Next question',
  },
  previousQuestion: {
    id: `${scope}.previousQuestion`,
    defaultMessage: '< Previous question',
  },
});
