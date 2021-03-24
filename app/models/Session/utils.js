/* eslint-disable no-unused-vars */
import pick from 'lodash/pick';
import sortBy from 'lodash/sortBy';

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

import Session from './Session';
import Question from './Question';

import {
  multiQuestion,
  gridQuestion,
  informationQuestion,
  feedbackQuestion,
  finishQuestion,
  currencyQuestion,
  phoneQuestion,
  dateQuestion,
  thirdPartyQuestion,
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
 * @param  {Array<Session>} sessions
 * @param  {string} sessionId
 */
export const findInterventionIndex = (sessions, sessionId) =>
  sessions.findIndex(value => value.id === sessionId);

/**
 * @param  {Question} currentQuestion
 * @param  {Array<Question>} questions
 * @param  {Array<any>} groups
 * @param  {boolean} includeCurrentQuestion
 */
export const getPreviousQuestions = (
  currentQuestion,
  questions,
  groups,
  includeCurrentQuestion = true,
) => {
  const currentQuestionGroup = groups.find(
    ({ id }) => id === currentQuestion.question_group_id,
  );
  const filteredGroups = groups.filter(
    ({ position }) => position <= currentQuestionGroup?.position,
  );
  const sortedGroups = sortBy(filteredGroups, 'position');

  const filteredQuestions = [];

  sortedGroups.forEach(group => {
    const currentGroupQuestions = questions.filter(
      ({ question_group_id: questionGroupId }) => questionGroupId === group.id,
    );

    const previousQuestionsIncludingCurrent =
      group.id === currentQuestion.question_group_id
        ? currentGroupQuestions.filter(({ position }) =>
            includeCurrentQuestion
              ? position <= currentQuestion.position
              : position < currentQuestion.position,
          )
        : currentGroupQuestions;

    filteredQuestions.push(...previousQuestionsIncludingCurrent);
  });

  return filteredQuestions;
};

/**
 * @param  {Array<Question>} questions
 * @param  {{structure: 'flat' | 'group', include: Array<string>, noEmpty: boolean}} options
 */
export const getBranchingVariables = (questions, options) => {
  const defaultParams = {
    structure: 'flat',
    include: [],
    noEmpty: true,
  };
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
      case thirdPartyQuestion.id:
      case feedbackQuestion.id:
      case finishQuestion.id:
      case currencyQuestion.id:
      case phoneQuestion.id:
      case dateQuestion.id:
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

/**
 * @param  {Array<Question>} questions
 * @param  {{structure: 'flat' | 'group', include: Array<string>, noEmpty: boolean}} options
 */
export const getEditVariables = (questions, options) => {
  const defaultParams = {
    structure: 'flat',
    include: [],
    noEmpty: true,
  };
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
      case thirdPartyQuestion.id:
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

export const QuestionsWithoutVariable = [
  ...NotAnswerableQuestions,
  thirdPartyQuestion.id,
];

export const DisabledNarratorSettingsByQuestionType = {
  voice: [feedbackQuestion.id],
  animation: [feedbackQuestion.id],
};
