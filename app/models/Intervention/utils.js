/* eslint-disable no-unused-vars */
import pick from 'lodash/pick';

import { feedbackActions } from 'models/Narrator/FeedbackActions';
import {
  bodyAnimationType,
  speechType,
  headAnimationType,
  readQuestionBlockType,
  reflectionType,
  pauseType,
  feedbackBlockType,
  reflectionFormulaType,
} from 'models/Narrator/BlockTypes';
import { getFromQuestionTTS } from 'global/reducers/questions/utils';
import { DEFAULT_PAUSE_DURATION } from 'utils/constants';

import Question from './Question';
import Intervention from './Intervention';

import {
  multiQuestion,
  gridQuestion,
  informationQuestion,
  feedbackQuestion,
  finishQuestion,
} from './QuestionTypes';

/**
 * @param  {Array<Question>} questions
 * @param  {string} questionId
 */
export const findQuestionById = (questions, questionId) =>
  questions.find(value => value.id === questionId);

/**
 * @param  {Array<Question>} questions
 * @param  {string} questionId
 */
export const findQuestionIndex = (questions, questionId) =>
  questions.findIndex(value => value.id === questionId);

/**
 * @param  {Array<Intervention>} interventions
 * @param  {string} sessionId
 */
export const findInterventionIndex = (interventions, sessionId) =>
  interventions.findIndex(value => value.id === sessionId);

/**
 * @param  {Array<Question>} questions
 * @param  {{structure: 'flat' | 'group', include: Array<string>, noEmpty: boolean}} options
 */
export const getAllVariables = (questions, options) => {
  const defaultParams = { structure: 'flat', include: [], noEmpty: true };
  const { structure, include, noEmpty } = { ...defaultParams, ...options };
  const variables = [];

  questions.forEach(question => {
    let questionVariables;

    switch (question.type) {
      case multiQuestion.id:
        questionVariables = getMultiVariables(question);
        break;
      case gridQuestion.id:
        questionVariables = getGridVariables(question);
        break;
      case informationQuestion.id:
      case feedbackQuestion.id:
      case finishQuestion.id:
        questionVariables = [];
        break;
      default:
        questionVariables = [getDefaultVariable(question)];
        break;
    }

    if (noEmpty)
      questionVariables = questionVariables.filter(val => val && val.trim());

    switch (structure) {
      case 'group':
        variables.push({
          variables: questionVariables,
          ...pick(question, include),
        });
        break;
      case 'flat':
      default:
        if (include && include.length) {
          variables.push(
            ...questionVariables.map(variable => ({
              ...pick(question, include),
              variable,
            })),
          );
        } else variables.push(...questionVariables);

        break;
    }
  });

  return variables;
};

const getDefaultVariable = question => question.body.variable.name;

const getMultiVariables = question =>
  question.body.data.map(answer => answer.variable.name);

const getGridVariables = question =>
  question.body.data[0].payload.rows.map(row => row.variable.name);

export const instantiateBlockForType = (type, endPosition, question) => {
  const sharedProperties = {
    type,
    endPosition,
  };
  switch (type) {
    case bodyAnimationType:
      return {
        animation: null,
        ...sharedProperties,
      };

    case speechType:
      return {
        action: feedbackActions.noAction,
        text: [],
        audio_urls: [],
        sha256: [],
        animation: 'rest',
        ...sharedProperties,
      };

    case reflectionType:
      return {
        action: feedbackActions.noAction,
        question_id: '',
        reflections: [],
        animation: 'rest',
        ...sharedProperties,
      };

    case reflectionFormulaType:
      return {
        action: feedbackActions.noAction,
        payload: '',
        reflections: [],
        animation: 'rest',
        ...sharedProperties,
      };

    case headAnimationType:
      return {
        animation: null,
        ...sharedProperties,
      };

    case readQuestionBlockType:
      return {
        action: feedbackActions.noAction,
        animation: 'rest',
        text: getFromQuestionTTS(question),
        audio_urls: [],
        sha256: [],
        ...sharedProperties,
      };
    case pauseType:
      return {
        pauseDuration: DEFAULT_PAUSE_DURATION,
        ...sharedProperties,
        animation: 'standStill',
      };

    case feedbackBlockType:
      return {
        animation: 'standStill',
        action: feedbackActions.showSpectrum,
        ...sharedProperties,
      };
    default:
      return undefined;
  }
};

export const NotAnswerableQuestions = [
  informationQuestion.id,
  finishQuestion.id,
  feedbackQuestion.id,
];

export const DisabledNarratorSettingsByQuestionType = {
  voice: [feedbackQuestion.id],
  animation: [feedbackQuestion.id],
};
