import { defineMessages } from 'react-intl';

import {
  bodyAnimationType,
  speechType,
  reflectionType,
  headAnimationType,
  readQuestionBlockType,
  pauseType,
  feedbackBlockType,
  reflectionFormulaType,
} from 'models/Narrator/BlockTypes';

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
    'Question::Single': {
      id: `${scope}.Question::Single`,
      defaultMessage: 'Single answer',
    },
    'Question::Multiple': {
      id: `${scope}.Question::Multiple`,
      defaultMessage: 'Multi answer',
    },
    'Question::TextBox': {
      id: `${scope}.Question::TextBox`,
      defaultMessage: 'Free Response',
    },
    'Question::Number': {
      id: `${scope}.Question::Number`,
      defaultMessage: 'Number',
    },
    'Question::Grid': {
      id: `${scope}.Question::Grid`,
      defaultMessage: 'Grid',
    },
    'Question::AnalogueScale': {
      id: `${scope}.Question::AnalogueScale`,
      defaultMessage: 'Slider',
    },
    'Question::Information': {
      id: `${scope}.Question::Information`,
      defaultMessage: 'Information Only',
    },
    'Question::Url': {
      id: `${scope}.Question::Url`,
      defaultMessage: 'External Link',
    },
    'Question::FollowUpContact': {
      id: `${scope}.Question::FollowUpContact`,
      defaultMessage: 'FollowUpContact',
    },
    'Question::Feedback': {
      id: `${scope}.Question::Feedback`,
      defaultMessage: 'Feedback',
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
});
