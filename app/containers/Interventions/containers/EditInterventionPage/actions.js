import { actionBuilder } from 'utils/actionBuilder';
import {
  SELECT_QUESTION,
  UPDATE_QUESTION_DATA,
  UPDATE_QUESTION_TITLE,
  ADD_QUESTION_IMAGE,
  UPDATE_QUESTION_IMAGE,
  DELETE_QUESTION_IMAGE,
  UPDATE_QUESTION_VIDEO,
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
  TOGGLE_QUESTION_SETTINGS,
  UPDATE_QUESTION_SETTINGS,
  UPDATE_PREVIEW_ANIMATION,
  DELETE_QUESTION,
  DELETE_QUESTION_SUCCESS,
  COPY_QUESTION,
  DELETE_QUESTION_ERROR,
  EDIT_INTERVENTION_REQUEST,
  EDIT_INTERVENTION_SUCCESS,
  EDIT_INTERVENTION_ERROR,
  CHANGE_QUESTION_TYPE,
  REORDER_QUESTION_LIST,
  GET_INTERVENTION_LIST_REQUEST,
  GET_INTERVENTION_LIST_SUCCESS,
  GET_INTERVENTION_LIST_ERROR,
} from './constants';

const toggleQuestionSettings = index =>
  actionBuilder(TOGGLE_QUESTION_SETTINGS, { index });

const selectQuestion = index => actionBuilder(SELECT_QUESTION, index);
const updateQuestionTitle = title =>
  actionBuilder(UPDATE_QUESTION_TITLE, title);
const addQuestionImage = payload => actionBuilder(ADD_QUESTION_IMAGE, payload);
const updateQuestionImage = imageUrl =>
  actionBuilder(UPDATE_QUESTION_IMAGE, imageUrl);
const deleteQuestionImage = payload =>
  actionBuilder(DELETE_QUESTION_IMAGE, payload);
const updateQuestionVideo = videoUrl =>
  actionBuilder(UPDATE_QUESTION_VIDEO, videoUrl);
const updateQuestionData = data => actionBuilder(UPDATE_QUESTION_DATA, data);
const updateQuestionSettings = data =>
  actionBuilder(UPDATE_QUESTION_SETTINGS, data);
const deleteQuestion = payload => actionBuilder(DELETE_QUESTION, payload);
const copyQuestionRequest = payload => actionBuilder(COPY_QUESTION, payload);
const changeQuestionType = newType =>
  actionBuilder(CHANGE_QUESTION_TYPE, { newType });

const deleteQuestionsSucccess = questionId =>
  actionBuilder(DELETE_QUESTION_SUCCESS, { questionId });
const deleteQuestionError = error =>
  actionBuilder(DELETE_QUESTION_ERROR, { error });

const getInterventionRequest = id =>
  actionBuilder(GET_INTERVENTION_REQUEST, { id });
const getInterventionSuccess = intervention =>
  actionBuilder(GET_INTERVENTION_SUCCESS, { intervention });
const getInterventionError = () => actionBuilder(GET_INTERVENTION_ERROR, {});

const getInterventionListRequest = () =>
  actionBuilder(GET_INTERVENTION_LIST_REQUEST, {});
const getInterventionListSuccess = interventions =>
  actionBuilder(GET_INTERVENTION_LIST_SUCCESS, { interventions });
const getInterventionListError = error =>
  actionBuilder(GET_INTERVENTION_LIST_ERROR, { error });

const editInterventionRequest = payload =>
  actionBuilder(EDIT_INTERVENTION_REQUEST, payload);
const editInterventionSuccess = intervention =>
  actionBuilder(EDIT_INTERVENTION_SUCCESS, { intervention });
const editInterventionError = error =>
  actionBuilder(EDIT_INTERVENTION_ERROR, { error });

const createQuestionRequest = (question, id) =>
  actionBuilder(CREATE_QUESTION_REQUEST, { question, id });
const createQuestionSuccess = question =>
  actionBuilder(CREATE_QUESTION_SUCCESS, { question });
const createQuestionError = error =>
  actionBuilder(CREATE_QUESTION_ERROR, { error });

const updateQuestionRequest = () => actionBuilder(UPDATE_QUESTION_REQUEST, {});
const updateQuestionSuccess = question =>
  actionBuilder(UPDATE_QUESTION_SUCCESS, { question });
const updateQuestionError = error =>
  actionBuilder(UPDATE_QUESTION_ERROR, { error });

const getQuestionsRequest = id => actionBuilder(GET_QUESTIONS_REQUEST, { id });
const getQuestionsSuccess = questions =>
  actionBuilder(GET_QUESTIONS_SUCCESS, { questions });
const getQuestionsError = error =>
  actionBuilder(GET_QUESTIONS_ERROR, { error });

const updatePreviewAnimation = animation =>
  actionBuilder(UPDATE_PREVIEW_ANIMATION, { animation });

const reorderQuestionList = reorderedList =>
  actionBuilder(REORDER_QUESTION_LIST, { reorderedList });

export {
  toggleQuestionSettings,
  selectQuestion,
  updateQuestionData,
  updateQuestionSettings,
  updateQuestionTitle,
  addQuestionImage,
  updateQuestionImage,
  deleteQuestionImage,
  updateQuestionVideo,
  getInterventionRequest,
  getInterventionSuccess,
  getInterventionError,
  getInterventionListRequest,
  getInterventionListSuccess,
  getInterventionListError,
  createQuestionRequest,
  createQuestionSuccess,
  createQuestionError,
  updateQuestionRequest,
  updateQuestionSuccess,
  updateQuestionError,
  getQuestionsRequest,
  getQuestionsSuccess,
  getQuestionsError,
  updatePreviewAnimation,
  deleteQuestion,
  deleteQuestionsSucccess,
  copyQuestionRequest,
  deleteQuestionError,
  editInterventionRequest,
  editInterventionSuccess,
  editInterventionError,
  changeQuestionType,
  reorderQuestionList,
};
