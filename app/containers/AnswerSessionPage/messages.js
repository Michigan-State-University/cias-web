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
  NO_BRANCHING_TARGET,
  RANDOMIZATION_MISS_MATCH,
  FORBIDDEN_CAT_MH_BRANCHING,
} from 'containers/AnswerSessionPage/constants';

export const scope = 'app.containers.AnswerSessionPage';

export default defineMessages({
  nextQuestion: {
    id: `${scope}.nextQuestion`,
    defaultMessage: 'Continue',
  },
  skipQuestion: {
    id: `${scope}.skipQuestion`,
    defaultMessage: 'Skip question',
  },
  skipQuestionDisabledTooltip: {
    id: `${scope}.skipQuestionDisabledTooltip`,
    defaultMessage: "This question is required, so you can't skip it.",
  },
  skipQuestionModalHeader: {
    id: `${scope}.skipQuestionModalHeader`,
    defaultMessage: 'You did not answer',
  },
  skipQuestionModalMessage: {
    id: `${scope}.skipQuestionModalMessage`,
    defaultMessage: 'Are you sure you want to leave this question empty?',
  },
  confirmContinueModalHeader: {
    id: `${scope}.confirmContinueModalHeader`,
    defaultMessage: 'Is that all?',
  },
  confirmContinueModalMessage: {
    id: `${scope}.confirmContinueModalMessage`,
    defaultMessage: 'Are you sure you have marked all your events?',
  },
  confirmContinueModalConfirmText: {
    id: `${scope}.confirmContinueModalConfirmText`,
    defaultMessage: 'Yes, I am sure',
  },
  confirmContinueModalCancelText: {
    id: `${scope}.confirmContinueModalCancelText`,
    defaultMessage: 'No, let me correct',
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
  unknownWarning: {
    id: `${scope}.unknownWarning`,
    defaultMessage: `There was an unknown error that occurred during branching. Check if everything is set up correctly.`,
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
  [NO_BRANCHING_TARGET]: {
    id: `${scope}.${NO_BRANCHING_TARGET}`,
    defaultMessage: `There was a branching error, because branching target is missing (deleted) or not set.`,
  },
  [RANDOMIZATION_MISS_MATCH]: {
    id: `${scope}.${RANDOMIZATION_MISS_MATCH}`,
    defaultMessage: `Randomization was setup incorrectly and you were transitioned to next screen`,
  },
  [FORBIDDEN_CAT_MH_BRANCHING]: {
    id: `${scope}.${FORBIDDEN_CAT_MH_BRANCHING}`,
    defaultMessage: `There was a branching to CAT-MH™ session that is not available during preview. Participants will be branched correctly when filling out published intervention`,
  },
  emailValidationError: {
    id: `${scope}.emailValidationError`,
    defaultMessage: 'Please enter a valid email address in the correct format',
  },
  wcagWarning: {
    id: `${scope}.wcagWaring`,
    defaultMessage:
      'Please be aware that after clicking the button, audio may be played automatically and the content could change its position dynamically.',
  },
  showTranscriptToggle: {
    id: `${scope}.showTranscriptToggle`,
    defaultMessage: 'Show Transcript',
  },
  previewHeader: {
    id: `${scope}.previewHeader`,
    defaultMessage: 'Preview Session',
  },
  fillHeader: {
    id: `${scope}.fillHeader`,
    defaultMessage: 'Fill Session',
  },
  narratorAlt: {
    id: `${scope}.narratorAlt`,
    defaultMessage:
      'This is a Narrator that speaks and moves around the screen.',
  },
  ongoingBranching: {
    id: `${scope}.ongoingBranching`,
    defaultMessage:
      'You were branched to another session. You can see session map with questions from this preview or continue to another session.',
  },
  ongoingBranchingParticipantInfo: {
    id: `${scope}.ongoingBranchingParticipantInfo`,
    defaultMessage: 'This screen will not be visible for participants',
  },
  goToSessionMap: {
    id: `${scope}.goToSessionMap`,
    defaultMessage: 'Go to session map',
  },
  addEvent: {
    id: `${scope}.addEvent`,
    defaultMessage: 'Add event',
  },
  goToNextDay: {
    id: `${scope}.goToNextDay`,
    defaultMessage: 'Go to next day',
  },
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: `{isPreview, select,
      true {Preview Session}
      other {Answer Session}
    }`,
  },
});
