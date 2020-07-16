import { put, takeLatest, select, all } from 'redux-saga/effects';
import axios from 'axios';
import sortBy from 'lodash/sortBy';
import { dismiss, error as showError } from 'react-toastify-redux';

import { getAllVariables } from 'models/Intervention/utils';
import { hasDuplicates } from 'utils/hasDuplicates';
import { mapQuestionToStateObject } from 'utils/mapResponseObjects';
import { makeSelectIntervention } from 'global/reducers/intervention';
import { formatMessage } from 'utils/intlOutsideReact';

import messages from './messages';
import {
  CREATE_QUESTION_REQUEST,
  GET_QUESTIONS_REQUEST,
  UPDATE_QUESTION_DATA,
  ADD_QUESTION_IMAGE,
  DELETE_QUESTION_IMAGE,
  UPDATE_QUESTION_SETTINGS,
  DELETE_QUESTION_REQUEST,
  COPY_QUESTION_REQUEST,
  CHANGE_QUESTION_TYPE,
  ERROR_DUPLICATE_VARIABLE,
  REORDER_QUESTION_LIST,
  EDIT_QUESTION_REQUEST,
} from './constants';

import {
  getQuestionsSuccess,
  getQuestionsError,
  createQuestionSuccess,
  createQuestionError,
  editQuestionSuccess,
  editQuestionError,
  updateQuestionImage,
  updateCache,
  restoreCache,
} from './actions';

import { makeSelectSelectedQuestion, makeSelectQuestions } from './selectors';

function* getQuestions({ payload: { id } }) {
  const requestURL = `v1/interventions/${id}/questions`;

  try {
    const response = yield axios.get(requestURL);

    const questions = response.data.data.map(question =>
      mapQuestionToStateObject(question),
    );

    yield put(getQuestionsSuccess(sortBy(questions, 'position')));
  } catch (error) {
    yield put(getQuestionsError(error));
  }
}

function* createQuestion({ payload: { question, id } }) {
  const requestURL = `v1/interventions/${id}/questions`;

  try {
    const response = yield axios.post(requestURL, {
      question,
    });

    const createdQuestion = mapQuestionToStateObject(response.data.data);

    yield put(createQuestionSuccess(createdQuestion));
  } catch (error) {
    yield put(createQuestionError(error));
  }
}

function* addImageQuestion({
  payload: { image, imageUrl, selectedQuestionId },
}) {
  const requestURL = `v1/questions/${selectedQuestionId}/images`;

  const formData = new FormData();
  formData.append('image[file]', image);

  try {
    const response = yield axios.post(requestURL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const responseQuestion = mapQuestionToStateObject(response.data.data);
    yield put(updateQuestionImage({ url: responseQuestion.image_url }));
    yield put(editQuestionSuccess(responseQuestion));
    window.URL.revokeObjectURL(imageUrl);
  } catch (error) {
    yield put(editQuestionError(error));
  }
}

function* deleteQuestionImage({ payload: { selectedQuestionId } }) {
  const requestURL = `v1/questions/${selectedQuestionId}/images`;

  try {
    const response = yield axios.delete(requestURL);

    const responseQuestion = mapQuestionToStateObject(response.data.data);
    yield put(editQuestionSuccess(responseQuestion));
  } catch (error) {
    yield put(editQuestionError(error));
  }
}

function* updateQuestion() {
  const intervention = yield select(makeSelectIntervention());
  const question = yield select(makeSelectSelectedQuestion());

  const questions = yield select(makeSelectQuestions());

  const variables = getAllVariables(questions).filter(
    variable => variable && variable.trim(),
  );

  if (hasDuplicates(variables)) {
    yield put(
      showError(formatMessage(messages.errors.duplicateVariable), {
        id: ERROR_DUPLICATE_VARIABLE,
      }),
    );
    return yield put(editQuestionError());
  }
  yield put(dismiss(ERROR_DUPLICATE_VARIABLE));

  const requestURL = `v1/interventions/${intervention.id}/questions/${
    question.id
  }`;
  try {
    const response = yield axios.put(requestURL, {
      question,
    });

    const responseQuestion = mapQuestionToStateObject(response.data.data);

    return yield put(editQuestionSuccess(responseQuestion));
  } catch (error) {
    return yield put(editQuestionError(error));
  }
}

function* deleteQuestion({ payload: { questionId, interventionId } }) {
  const requestURL = `v1/interventions/${interventionId}/questions/${questionId}`;

  try {
    yield axios.delete(requestURL);

    yield put(updateCache());
  } catch (error) {
    yield put(restoreCache(error));
  }
}

function* copyQuestion({ payload: { questionId, interventionId } }) {
  const requestURL = `v1/interventions/${interventionId}/questions/${questionId}/clone`;

  try {
    const response = yield axios.get(requestURL);

    const copiedQuestion = mapQuestionToStateObject(response.data.data);

    yield put(createQuestionSuccess(copiedQuestion));
  } catch (error) {
    yield put(createQuestionError(error));
  }
}

function* reorderQuestions({ payload: { reorderedList, interventionId } }) {
  const requestURL = `v1/interventions/${interventionId}/questions/position`;

  try {
    const list = reorderedList.map(el => ({
      id: el.id,
      position: el.position,
    }));
    yield axios.patch(requestURL, {
      question: { position: list },
    });

    yield put(updateCache());
  } catch (error) {
    yield put(restoreCache(error));
  }
}

export default function* editInterventionPageSaga() {
  yield all([
    yield takeLatest(GET_QUESTIONS_REQUEST, getQuestions),
    yield takeLatest(CREATE_QUESTION_REQUEST, createQuestion),
    yield takeLatest(ADD_QUESTION_IMAGE, addImageQuestion),
    yield takeLatest(DELETE_QUESTION_IMAGE, deleteQuestionImage),
    yield takeLatest(DELETE_QUESTION_REQUEST, deleteQuestion),
    yield takeLatest(COPY_QUESTION_REQUEST, copyQuestion),
    yield takeLatest(REORDER_QUESTION_LIST, reorderQuestions),
    yield takeLatest(CHANGE_QUESTION_TYPE, updateQuestion),
    yield takeLatest(UPDATE_QUESTION_DATA, updateQuestion),
    yield takeLatest(UPDATE_QUESTION_SETTINGS, updateQuestion),
    yield takeLatest(EDIT_QUESTION_REQUEST, updateQuestion),
  ]);
}
