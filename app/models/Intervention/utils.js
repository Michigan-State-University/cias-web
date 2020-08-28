/* eslint-disable no-unused-vars */
import pick from 'lodash/pick';

import {
  bodyAnimationType,
  speechType,
  headAnimationType,
  readQuestionBlockType,
  reflectionType,
  pauseType,
} from 'models/Narrator/BlockTypes';
import { getFromQuestionTTS } from 'containers/Interventions/containers/EditInterventionPage/utils';

import Question from './Question';
import Intervention from './Intervention';

import {
  multiQuestion,
  gridQuestion,
  informationQuestion,
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
 * @param  {string} interventionId
 */
export const findInterventionIndex = (interventions, interventionId) =>
  interventions.findIndex(value => value.id === interventionId);

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
        text: [],
        audio_urls: [],
        sha256: [],
        animation: 'rest',
        ...sharedProperties,
      };
    case reflectionType:
      return {
        question_id: '',
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
        animation: 'rest',
        text: getFromQuestionTTS(question),
        audio_urls: [],
        sha256: [],
        ...sharedProperties,
      };
    case pauseType:
      return {
        animation: 'standStill',
        pauseDuration: 2,
        ...sharedProperties,
      };
    default:
      return undefined;
  }
};
