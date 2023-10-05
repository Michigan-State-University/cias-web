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
import { QuestionTypes } from 'models/Question';

export const scope = 'app.containers.AnswerSessionPage';

export default defineMessages({
  nextQuestion: {
    id: `${scope}.nextQuestion`,
    defaultMessage: 'Continue',
  },
  skipQuestion: {
    id: `${scope}.skipQuestion`,
    defaultMessage: 'Skip',
  },
  skipIconAlt: {
    id: `${scope}.skipIconAlt`,
    defaultMessage: 'Forward triangle icon',
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
  [`confirmContinueModalMessage${QuestionTypes.TLFB_EVENTS}`]: {
    id: `${scope}.confirmContinueModalMessage${QuestionTypes.TLFB_EVENTS}`,
    defaultMessage: 'Are you sure you have marked all your events?',
  },
  [`confirmContinueModalMessage${QuestionTypes.TLFB_QUESTION}`]: {
    id: `${scope}.confirmContinueModalMessage${QuestionTypes.TLFB_QUESTION}`,
    defaultMessage:
      'Are you sure you marked all the days you used these substances?',
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
  fillHeader: {
    id: `${scope}.fillHeader`,
    defaultMessage: 'Click below to start',
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
    defaultMessage: 'Add another event',
  },
  saveEvents: {
    id: `${scope}.saveEvents`,
    defaultMessage: 'Save events',
  },
  goToNextDay: {
    id: `${scope}.goToNextDay`,
    defaultMessage: 'Go to the next day',
  },
  saveAnswer: {
    id: `${scope}.saveAnswer`,
    defaultMessage: 'Save',
  },
  tlfbDataError: {
    id: `${scope}.tlfbDataError`,
    defaultMessage:
      'There was an error with fetching calender data. Please refresh the page',
  },
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: `{isPreview, select,
      true {Preview Session}
      other {Answer Session}
    }`,
  },
  exit: {
    id: `${scope}.exit`,
    defaultMessage: `Exit`,
  },
  exitButtonTitle: {
    id: `${scope}.exitButtonTitle`,
    defaultMessage: `Quickly close the intervention`,
  },
  exitIconAlt: {
    id: `${scope}.exitIconAlt`,
    defaultMessage: `Quick Exit button icon`,
  },
  monthSelectorModalTitle: {
    id: `${scope}.monthSelectorModalTitle`,
    defaultMessage: `Month navigation`,
  },
  monthSelectorModalText: {
    id: `${scope}.monthSelectorModalText`,
    defaultMessage: `This study covers a period of more than one month. Using the arrows,
    you can conveniently switch between them to complete all the months.`,
  },
  monthSelectorModalButton: {
    id: `${scope}.monthSelectorModalButton`,
    defaultMessage: `I understand`,
  },
  catMhErrorModalTitle: {
    id: `${scope}.catMhErrorModalTitle`,
    defaultMessage: `Oops! You can’t fill this session`,
  },
  goBackToHomePage: {
    id: `${scope}.goBackToHomePage`,
    defaultMessage: `Go back to home page`,
  },
  settings: {
    id: `${scope}.settings`,
    defaultMessage: `Settings`,
  },
  settingsIconAlt: {
    id: `${scope}.settingsIconAlt`,
    defaultMessage: `Settings icon`,
  },
  textReadingControls: {
    id: `${scope}.textReadingControls`,
    defaultMessage: `Text Reading Controls`,
  },
  speakerIconAlt: {
    id: `${scope}.speakerIconAlt`,
    defaultMessage: `Speaker Icon`,
  },
  textReadingControlsDescription: {
    id: `${scope}.textReadingControlsDescription`,
    defaultMessage: `Toggle on if you want the ability to click{icon}to hear any of the text read aloud.`,
  },
  cc: {
    id: `${scope}.cc`,
    defaultMessage: `Closed Captioning{icon}`,
  },
  ccIconAlt: {
    id: `${scope}.ccIconAlt`,
    defaultMessage: `Closed Captioning icon`,
  },
  ccDescription: {
    id: `${scope}.ccDescription`,
    defaultMessage: `Toggle on if you want to see a transcript of any audio.`,
  },
  featureUnavailable: {
    id: `${scope}.featureUnavailable`,
    defaultMessage: `In preview mode, you can not interact with this feature.`,
  },
  accessiBeIconAlt: {
    id: `${scope}.accessiBeIconAlt`,
    defaultMessage: `AccessiBe icon`,
  },
  liveChatIconAlt: {
    id: `${scope}.liveChatIconAlt`,
    defaultMessage: `Live chat icon`,
  },
  backButton: {
    id: `${scope}.backButton`,
    defaultMessage: `Back`,
  },
  backButtonDisabledCatMh: {
    id: `${scope}.backButtonDisabledCatMh`,
    defaultMessage: 'Back navigation cannot be used in this session',
  },
  backButtonDisabledFirstScreen: {
    id: `${scope}.backButtonDisabledFirstScreen`,
    defaultMessage:
      'Back navigation cannot be used on the first screen in a session',
  },
  backButtonDisabledLastScreen: {
    id: `${scope}.backButtonDisabledLastScreen`,
    defaultMessage:
      'Back navigation cannot be used on the last screen in a session',
  },
  previousScreenNotFound: {
    id: `${scope}.previousScreenNotFound`,
    defaultMessage:
      'Previous screen was not found. This is probably the first screen in the session.',
  },
  verifyErrorMessage: {
    id: `${scope}.verifyErrorMessage`,
    defaultMessage:
      'Unknown error occurred. Try again or contact the administrator',
  },
  goToDashboard: {
    id: `${scope}.goToDashboard`,
    defaultMessage: 'Go to Dashboard',
  },
  submitAnswerError: {
    id: `${scope}.submitAnswerError`,
    defaultMessage: "Couldn't submit the answer",
  },
});
