import { actionBuilder } from 'utils/actionBuilder';
import {
  SELECT_QUESTION,
  UPDATE_QUESTION_DATA,
  ADD_QUESTION_IMAGE,
  UPDATE_QUESTION_IMAGE,
  DELETE_QUESTION_IMAGE,
  CREATE_QUESTION_REQUEST,
  CREATE_QUESTION_ERROR,
  CREATE_QUESTION_SUCCESS,
  GET_QUESTIONS_REQUEST,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
  TOGGLE_QUESTION_SETTINGS,
  UPDATE_QUESTION_SETTINGS,
  UPDATE_PREVIEW_ANIMATION,
  DELETE_QUESTION_REQUEST,
  COPY_QUESTION_REQUEST,
  COPY_QUESTION_SUCCESS,
  COPY_QUESTION_ERROR,
  CHANGE_QUESTION_TYPE,
  REORDER_QUESTION_LIST,
  UPDATE_CACHE,
  RESTORE_CACHE,
  EDIT_QUESTION_REQUEST,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_ERROR,
  MAKE_PEEDY_DRAGGABLE,
  SET_ANIMATION_STOP_POSITION,
  UPDATE_PREVIEW_DATA,
} from './constants';

// application state actions
const toggleQuestionSettings = ({ index, tab }) =>
  actionBuilder(TOGGLE_QUESTION_SETTINGS, { index, tab });
const selectQuestion = index => actionBuilder(SELECT_QUESTION, index);
const updatePreviewAnimation = animation =>
  actionBuilder(UPDATE_PREVIEW_ANIMATION, { animation });
const updatePreviewData = data =>
  actionBuilder(UPDATE_PREVIEW_DATA, { ...data });

// image actions
const addQuestionImage = payload => actionBuilder(ADD_QUESTION_IMAGE, payload);
const updateQuestionImage = imageUrl =>
  actionBuilder(UPDATE_QUESTION_IMAGE, imageUrl);
const deleteQuestionImage = payload =>
  actionBuilder(DELETE_QUESTION_IMAGE, payload);

// data action
const updateQuestionData = data => actionBuilder(UPDATE_QUESTION_DATA, data);

// settings action
const updateQuestionSettings = data =>
  actionBuilder(UPDATE_QUESTION_SETTINGS, data);

// managing question actions
const copyQuestionRequest = payload =>
  actionBuilder(COPY_QUESTION_REQUEST, payload);
const copyQuestionSuccess = question =>
  actionBuilder(COPY_QUESTION_SUCCESS, { question });
const copyQuestionError = error =>
  actionBuilder(COPY_QUESTION_ERROR, { error });
const changeQuestionType = newType =>
  actionBuilder(CHANGE_QUESTION_TYPE, { newType });
const deleteQuestionRequest = payload =>
  actionBuilder(DELETE_QUESTION_REQUEST, payload);
const reorderQuestionList = payload =>
  actionBuilder(REORDER_QUESTION_LIST, payload);

// create question actions
const createQuestionRequest = (question, id) =>
  actionBuilder(CREATE_QUESTION_REQUEST, { question, id });
const createQuestionSuccess = question =>
  actionBuilder(CREATE_QUESTION_SUCCESS, { question });
const createQuestionError = error =>
  actionBuilder(CREATE_QUESTION_ERROR, { error });

// get question actions
const getQuestionsRequest = id => actionBuilder(GET_QUESTIONS_REQUEST, { id });
const getQuestionsSuccess = questions =>
  actionBuilder(GET_QUESTIONS_SUCCESS, { questions });
const getQuestionsError = error =>
  actionBuilder(GET_QUESTIONS_ERROR, { error });

// edit question actions
const editQuestionRequest = payload =>
  actionBuilder(EDIT_QUESTION_REQUEST, payload);
const editQuestionSuccess = question =>
  actionBuilder(EDIT_QUESTION_SUCCESS, { question });
const editQuestionError = error =>
  actionBuilder(EDIT_QUESTION_ERROR, { error });

// common actions
const updateCache = () => actionBuilder(UPDATE_CACHE, {});
const restoreCache = error => actionBuilder(RESTORE_CACHE, { error });

const setPeedyDraggable = draggable =>
  actionBuilder(MAKE_PEEDY_DRAGGABLE, { draggable });

const setAnimationStopPosition = (posX, posY) =>
  actionBuilder(SET_ANIMATION_STOP_POSITION, { x: posX, y: posY });

export {
  toggleQuestionSettings,
  selectQuestion,
  updateQuestionData,
  updateQuestionSettings,
  addQuestionImage,
  updateQuestionImage,
  deleteQuestionImage,
  createQuestionRequest,
  createQuestionSuccess,
  createQuestionError,
  getQuestionsRequest,
  getQuestionsSuccess,
  getQuestionsError,
  updatePreviewAnimation,
  deleteQuestionRequest,
  copyQuestionRequest,
  copyQuestionSuccess,
  copyQuestionError,
  changeQuestionType,
  reorderQuestionList,
  updateCache,
  restoreCache,
  editQuestionRequest,
  editQuestionSuccess,
  editQuestionError,
  setPeedyDraggable,
  setAnimationStopPosition,
  updatePreviewData,
};
