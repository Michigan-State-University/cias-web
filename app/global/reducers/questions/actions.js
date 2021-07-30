import { actionBuilder } from 'utils/actionBuilder';

import {
  SELECT_QUESTION,
  CREATE_QUESTION_REQUEST,
  CREATE_QUESTION_ERROR,
  CREATE_QUESTION_SUCCESS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
  EDIT_QUESTION_REQUEST,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_ERROR,
  ADD_QUESTION_IMAGE_REQUEST,
  ADD_QUESTION_IMAGE_SUCCESS,
  ADD_QUESTION_IMAGE_ERROR,
  DELETE_QUESTION_IMAGE_REQUEST,
  DELETE_QUESTION_IMAGE_SUCCESS,
  DELETE_QUESTION_IMAGE_ERROR,
  COPY_QUESTION_REQUEST,
  COPY_QUESTION_SUCCESS,
  COPY_QUESTION_ERROR,
  CHANGE_QUESTION_TYPE_REQUEST,
  CHANGE_QUESTION_TYPE_SUCCESS,
  CHANGE_QUESTION_TYPE_ERROR,
  REORDER_QUESTION_LIST_REQUEST,
  REORDER_QUESTION_LIST_SUCCESS,
  REORDER_QUESTION_LIST_ERROR,
  DELETE_QUESTION_REQUEST,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_ERROR,
  UPDATE_QUESTION_DATA,
  UPDATE_QUESTION_SETTINGS,
  DELETE_QUESTIONS_REQUEST,
  DELETE_QUESTIONS_SUCCESS,
  DELETE_QUESTIONS_ERROR,
  GET_QUESTIONS_REQUEST,
  COPY_EXTERNALLY_QUESTION_REQUEST,
  COPY_EXTERNALLY_QUESTION_ERROR,
  COPY_EXTERNALLY_QUESTION_SUCCESS,
  UPDATE_QUESTION_IMAGE_REQUEST,
  UPDATE_QUESTION_IMAGE_SUCCESS,
  UPDATE_QUESTION_IMAGE_ERROR,
} from './constants';

export const selectQuestion = (index) =>
  actionBuilder(SELECT_QUESTION, { index });

export const createQuestionRequest = (question, id) =>
  actionBuilder(CREATE_QUESTION_REQUEST, { question, id });
export const createQuestionSuccess = (question) =>
  actionBuilder(CREATE_QUESTION_SUCCESS, { question });
export const createQuestionError = (error) =>
  actionBuilder(CREATE_QUESTION_ERROR, { error });

export const getQuestionsRequest = (sessionId) =>
  actionBuilder(GET_QUESTIONS_REQUEST, { sessionId });
export const getQuestionsSuccess = (questions) =>
  actionBuilder(GET_QUESTIONS_SUCCESS, { questions });
export const getQuestionsError = (error) =>
  actionBuilder(GET_QUESTIONS_ERROR, { error });

export const editQuestionRequest = (payload) =>
  actionBuilder(EDIT_QUESTION_REQUEST, payload);
export const editQuestionSuccess = (question) =>
  actionBuilder(EDIT_QUESTION_SUCCESS, { question });
export const editQuestionError = (payload) =>
  actionBuilder(EDIT_QUESTION_ERROR, payload);

export const addQuestionImageRequest = (payload) =>
  actionBuilder(ADD_QUESTION_IMAGE_REQUEST, payload);
export const addQuestionImageSuccess = (question) =>
  actionBuilder(ADD_QUESTION_IMAGE_SUCCESS, { question });
export const addQuestionImageError = (payload) =>
  actionBuilder(ADD_QUESTION_IMAGE_ERROR, payload);

export const deleteQuestionImageRequest = (payload) =>
  actionBuilder(DELETE_QUESTION_IMAGE_REQUEST, payload);
export const deleteQuestionImageSuccess = (question) =>
  actionBuilder(DELETE_QUESTION_IMAGE_SUCCESS, { question });
export const deleteQuestionImageError = (payload) =>
  actionBuilder(DELETE_QUESTION_IMAGE_ERROR, payload);

export const updateQuestionImageRequest = (questionId, description) =>
  actionBuilder(UPDATE_QUESTION_IMAGE_REQUEST, {
    questionId,
    description,
  });
export const updateQuestionImageSuccess = (questionId) =>
  actionBuilder(UPDATE_QUESTION_IMAGE_SUCCESS, { questionId });
export const updateQuestionImageError = (payload) =>
  actionBuilder(UPDATE_QUESTION_IMAGE_ERROR, payload);

export const copyQuestionRequest = (payload) =>
  actionBuilder(COPY_QUESTION_REQUEST, payload);
export const copyQuestionSuccess = (question) =>
  actionBuilder(COPY_QUESTION_SUCCESS, { question });
export const copyQuestionError = (error) =>
  actionBuilder(COPY_QUESTION_ERROR, { error });

export const changeQuestionTypeRequest = (newType) =>
  actionBuilder(CHANGE_QUESTION_TYPE_REQUEST, { newType });
export const changeQuestionTypeSuccess = () =>
  actionBuilder(CHANGE_QUESTION_TYPE_SUCCESS, {});
export const changeQuestionTypeError = (error) =>
  actionBuilder(CHANGE_QUESTION_TYPE_ERROR, { error });

export const reorderQuestionListRequest = (payload) =>
  actionBuilder(REORDER_QUESTION_LIST_REQUEST, payload);
export const reorderQuestionListSuccess = () =>
  actionBuilder(REORDER_QUESTION_LIST_SUCCESS, {});
export const reorderQuestionListError = (error) =>
  actionBuilder(REORDER_QUESTION_LIST_ERROR, { error });

export const deleteQuestionRequest = (payload) =>
  actionBuilder(DELETE_QUESTION_REQUEST, payload);
export const deleteQuestionSuccess = () =>
  actionBuilder(DELETE_QUESTION_SUCCESS, {});
export const deleteQuestionError = (error) =>
  actionBuilder(DELETE_QUESTION_ERROR, { error });

export const updateQuestionData = (data) =>
  actionBuilder(UPDATE_QUESTION_DATA, data);
export const updateQuestionSettings = (data) =>
  actionBuilder(UPDATE_QUESTION_SETTINGS, data);

export const deleteQuestionsRequest = (questionIds, sessionId, groupIds) =>
  actionBuilder(DELETE_QUESTIONS_REQUEST, { questionIds, sessionId, groupIds });
export const deleteQuestionsSuccess = () =>
  actionBuilder(DELETE_QUESTIONS_SUCCESS, {});
export const deleteQuestionsError = (error) =>
  actionBuilder(DELETE_QUESTIONS_ERROR, { error });

export const copyExternallyQuestionRequest = (
  sessionId,
  groupId,
  copied,
  questionsId,
) =>
  actionBuilder(COPY_EXTERNALLY_QUESTION_REQUEST, {
    sessionId,
    groupId,
    copied,
    questionsId,
  });
export const copyExternallyQuestionSuccess = (question, isCurrent) =>
  actionBuilder(COPY_EXTERNALLY_QUESTION_SUCCESS, {
    question,
    isCurrent,
  });
export const copyExternallyQuestionError = (error) =>
  actionBuilder(COPY_EXTERNALLY_QUESTION_ERROR, {
    error,
  });
