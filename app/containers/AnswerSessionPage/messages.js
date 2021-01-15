/*
 * AnswerSessionPage Messages
 *
 * This contains all the text for the AnswerSessionPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AnswerSessionPage';

export default defineMessages({
  nextQuestion: {
    id: `${scope}.nextQuestion`,
    defaultMessage: 'Continue',
  },
  submitAnswer: {
    id: `${scope}.submitAnswer`,
    defaultMessage: 'Finish session',
  },
  startSession: {
    id: `${scope}.startSession`,
    defaultMessage: 'Start session',
  },
  startPreview: {
    id: `${scope}.startPreview`,
    defaultMessage: 'Start preview',
  },
  previewDisabled: {
    id: `${scope}.previewDisabled`,
    defaultMessage: 'Preview not possible',
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
