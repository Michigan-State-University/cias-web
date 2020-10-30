import { defineMessages } from 'react-intl';

import {
  bodyAnimationType,
  feedbackBlockType,
  headAnimationType,
  pauseType,
  readQuestionBlockType,
  reflectionFormulaType,
  reflectionType,
  speechType,
} from 'models/Narrator/BlockTypes';
import {
  feedbackQuestion,
  finishQuestion,
  gridQuestion,
  informationQuestion,
  multiQuestion,
  numberQuestion,
  singleQuestion,
  textboxQuestion,
  urlQuestion,
  visualAnalogueScaleQuestion,
} from 'models/Intervention/QuestionTypes';

export const scope = 'app.GlobalMessages';

export default defineMessages({
  variables: {
    variableNamePlaceholder: {
      id: `${scope}.variableNamePlaceholder`,
      defaultMessage: 'Variable name...',
    },
    variableScorePlaceholder: {
      id: `${scope}.variableScorePlaceholder`,
      defaultMessage: 'Score',
    },
    value: {
      id: `${scope}.value`,
      defaultMessage: 'Value:',
    },
    emptyValue: {
      id: `${scope}.emptyBadge`,
      defaultMessage: 'No assigned value',
    },
    emptyVariable: {
      id: `${scope}.emptyBadge`,
      defaultMessage: 'No assigned variable',
    },
  },
  blockTypes: {
    [bodyAnimationType]: {
      id: `${scope}.${bodyAnimationType}`,
      defaultMessage: 'Body Animation',
    },
    [speechType]: {
      id: `${scope}.${speechType}`,
      defaultMessage: 'Speech',
    },
    [reflectionType]: {
      id: `${scope}.${reflectionType}`,
      defaultMessage: 'Speech',
    },
    [reflectionFormulaType]: {
      id: `${scope}.${reflectionFormulaType}`,
      defaultMessage: 'Speech',
    },
    [headAnimationType]: {
      id: `${scope}.${headAnimationType}`,
      defaultMessage: 'Head Animation',
    },
    [readQuestionBlockType]: {
      id: `${scope}.${readQuestionBlockType}`,
      defaultMessage: 'Read question',
    },
    [pauseType]: {
      id: `${scope}.${pauseType}`,
      defaultMessage: 'Pause',
    },
    [feedbackBlockType]: {
      id: `${scope}.${feedbackBlockType}`,
      defaultMessage: 'Show Spectrum',
    },
  },
  questionTypes: {
    [singleQuestion.id]: {
      id: `${scope}.${singleQuestion.id}`,
      defaultMessage: 'Single answer',
    },
    [multiQuestion.id]: {
      id: `${scope}.${multiQuestion.id}`,
      defaultMessage: 'Multi answer',
    },
    [textboxQuestion.id]: {
      id: `${scope}.${[textboxQuestion.id]}`,
      defaultMessage: 'Free Response',
    },
    [numberQuestion.id]: {
      id: `${scope}.${numberQuestion.id}`,
      defaultMessage: 'Number',
    },
    [gridQuestion.id]: {
      id: `${scope}.${gridQuestion.id}`,
      defaultMessage: 'Grid',
    },
    [visualAnalogueScaleQuestion.id]: {
      id: `${scope}.${visualAnalogueScaleQuestion.id}`,
      defaultMessage: 'Slider',
    },
    [informationQuestion.id]: {
      id: `${scope}.${informationQuestion.id}`,
      defaultMessage: 'Information Only',
    },
    [urlQuestion.id]: {
      id: `${scope}.${urlQuestion.id}`,
      defaultMessage: 'External Link',
    },
    'Question::FollowUpContact': {
      id: `${scope}.Question::FollowUpContact`,
      defaultMessage: 'FollowUpContact',
    },
    [feedbackQuestion.id]: {
      id: `${scope}.${feedbackQuestion.id}`,
      defaultMessage: 'Feedback',
    },
    [finishQuestion.id]: {
      id: `${scope}.${finishQuestion.id}`,
      defaultMessage: 'Finish',
    },
  },
  statuses: {
    draft: {
      id: `${scope}.draft`,
      defaultMessage: 'Draft',
    },
    published: {
      id: `${scope}.published`,
      defaultMessage: 'Published',
    },
    closed: {
      id: `${scope}.closed`,
      defaultMessage: 'Closed',
    },
    archived: {
      id: `${scope}.archived`,
      defaultMessage: 'Archived',
    },
  },
  createProblemError: {
    id: `${scope}.createProblemError`,
    defaultMessage: `Couldn't create an intervention`,
  },
  editProblemError: {
    id: `${scope}.editProblemError`,
    defaultMessage: `Couldn't edit an intervention`,
  },
  archiveProblemError: {
    id: `${scope}.archiveProblemError`,
    defaultMessage: `Couldn't archive an intervention`,
  },
  errors: {
    unknownRequestError: {
      id: `${scope}.errors.unknownRequestError`,
      defaultMessage: `Some error occurred. Please try again or contact a support.`,
    },
  },
});
