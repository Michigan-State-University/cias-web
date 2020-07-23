/*
 * AnswerInterventionPage Messages
 *
 * This contains all the text for the AnswerInterventionPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AnswerInterventionPage';

export default defineMessages({
  previousQuestion: {
    id: `${scope}.previousQuestion`,
    defaultMessage: '< Previous question',
  },
  nextQuestion: {
    id: `${scope}.nextQuestion`,
    defaultMessage: 'Continue',
  },
  submitAnswer: {
    id: `${scope}.submitAnswer`,
    defaultMessage: 'Finish intervention',
  },
  startIntervention: {
    id: `${scope}.startIntervention`,
    defaultMessage: 'Start intervention',
  },
  answerPlaceholder: {
    id: `${scope}.placeholder`,
    defaultMessage: 'Answer the question...',
  },
  completeIntervention: {
    id: `${scope}.completeIntervention`,
    defaultMessage: 'Thanks for completing intervention',
  },
});
