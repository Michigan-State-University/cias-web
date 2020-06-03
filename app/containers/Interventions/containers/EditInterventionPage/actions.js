import { actionBuilder } from 'utils/actionBuilder';
import {
  TOGGLE_QUESTION_TYPE_CHOOSER,
  SELECT_QUESTION,
  UPDATE_QUESTION_DATA,
  UPDATE_QUESTION_TITLE,
  CREATE_INTERVENTION_REQUEST,
  CREATE_INTERVENTION_SUCCESS,
  CREATE_INTERVENTION_ERROR,
  GET_INTERVENTION_REQUEST,
  GET_INTERVENTION_SUCCESS,
  GET_INTERVENTION_ERROR,
  CREATE_QUESTION_REQUEST,
  CREATE_QUESTION_ERROR,
  CREATE_QUESTION_SUCCESS,
  UPDATE_QUESTION_REQUEST,
  UPDATE_QUESTION_ERROR,
  UPDATE_QUESTION_SUCCESS,
  GET_QUESTIONS_REQUEST,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
} from './constants';

const toggleQuestionTypeChooser = () =>
  actionBuilder(TOGGLE_QUESTION_TYPE_CHOOSER, {});

const selectQuestion = index => actionBuilder(SELECT_QUESTION, index);
const updateQuestionTitle = title =>
  actionBuilder(UPDATE_QUESTION_TITLE, title);
const updateQuestionData = data => actionBuilder(UPDATE_QUESTION_DATA, data);

const createInterventionRequest = () =>
  actionBuilder(CREATE_INTERVENTION_REQUEST, {});
const createInterventionSuccess = () =>
  actionBuilder(CREATE_INTERVENTION_SUCCESS, {});
const createInterventionError = () =>
  actionBuilder(CREATE_INTERVENTION_ERROR, {});

const getInterventionRequest = id =>
  actionBuilder(GET_INTERVENTION_REQUEST, { id });
const getInterventionSuccess = intervention =>
  actionBuilder(GET_INTERVENTION_SUCCESS, { intervention });
const getInterventionError = () => actionBuilder(GET_INTERVENTION_ERROR, {});

const createQuestionRequest = (question, id) =>
  actionBuilder(CREATE_QUESTION_REQUEST, { question, id });
const createQuestionSuccess = question =>
  actionBuilder(CREATE_QUESTION_SUCCESS, { question });
const createQuestionError = () => actionBuilder(CREATE_QUESTION_ERROR, {});

const updateQuestionRequest = () => actionBuilder(UPDATE_QUESTION_REQUEST, {});
const updateQuestionSuccess = question =>
  actionBuilder(UPDATE_QUESTION_SUCCESS, { question });
const updateQuestionError = () => actionBuilder(UPDATE_QUESTION_ERROR, {});

const getQuestionsRequest = id => actionBuilder(GET_QUESTIONS_REQUEST, { id });
const getQuestionsSuccess = questions =>
  actionBuilder(GET_QUESTIONS_SUCCESS, { questions });
const getQuestionsError = () => actionBuilder(GET_QUESTIONS_ERROR, {});

export {
  toggleQuestionTypeChooser,
  selectQuestion,
  updateQuestionData,
  updateQuestionTitle,
  createInterventionRequest,
  createInterventionSuccess,
  createInterventionError,
  getInterventionRequest,
  getInterventionSuccess,
  getInterventionError,
  createQuestionRequest,
  createQuestionSuccess,
  createQuestionError,
  updateQuestionRequest,
  updateQuestionSuccess,
  updateQuestionError,
  getQuestionsRequest,
  getQuestionsSuccess,
  getQuestionsError,
};
