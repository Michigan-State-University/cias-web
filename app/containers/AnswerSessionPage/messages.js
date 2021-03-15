/*
 * AnswerSessionPage Messages
 *
 * This contains all the text for the AnswerSessionPage container.
 */

import { defineMessages } from 'react-intl';
import {
  OTHER_FORMULA_ERROR,
  REFLECTION_MISS_MATCH,
  ZERO_DIVISION_FORMULA_ERROR,
} from 'containers/AnswerSessionPage/constants';

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
  continueSession: {
    id: `${scope}.continueSession`,
    defaultMessage: 'Continue session',
  },
  startPreview: {
    id: `${scope}.startPreview`,
    defaultMessage: 'Start preview',
  },
  continuePreview: {
    id: `${scope}.continuePreview`,
    defaultMessage: 'Continue preview',
  },
  sessionFinished: {
    id: `${scope}.sessionFinished`,
    defaultMessage: 'Session already finished',
  },
  refetchQuestion: {
    id: `${scope}.refetchQuestion`,
    defaultMessage: 'Reload Question',
  },
  nextQuestionError: {
    id: `${scope}.nextQuestionError`,
    defaultMessage:
      'There was some issue loading next question, please click the button to reload or try again later.',
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
  [ZERO_DIVISION_FORMULA_ERROR]: {
    id: `${scope}.${ZERO_DIVISION_FORMULA_ERROR}`,
    defaultMessage: `Formula failed and you were transitioned to the next screen because there was division by 0.`,
  },
  [OTHER_FORMULA_ERROR]: {
    id: `${scope}.${OTHER_FORMULA_ERROR}`,
    defaultMessage: `Formula failed and you were transitioned to the next screen because of some mathematical error.`,
  },
  [REFLECTION_MISS_MATCH]: {
    id: `${scope}.${REFLECTION_MISS_MATCH}`,
    defaultMessage: `There was a reflection error, because variables or score are not set up properly.`,
  },
  emailValidationError: {
    id: `${scope}.emailValidationError`,
    defaultMessage: 'The email entered in wrong format',
  },
});
