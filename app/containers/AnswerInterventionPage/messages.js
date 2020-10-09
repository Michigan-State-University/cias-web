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
    defaultMessage: '< Previous screen',
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
  previewDisabled: {
    id: `${scope}.previewDisabled`,
    defaultMessage: 'Preview not possible',
  },
  completeIntervention: {
    id: `${scope}.completeIntervention`,
    defaultMessage: 'Thanks for completing intervention',
  },
  noEntranceHeader: {
    id: `${scope}.noEntranceText`,
    defaultMessage: `You can't open this session!`,
  },
  noEntranceText: {
    id: `${scope}.noEntranceText`,
    defaultMessage: `The session is not published yet or you were not given an access to it. Please, contact the support if this issue should not have occurred.`,
  },
});
