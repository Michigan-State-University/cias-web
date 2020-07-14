import { put, takeLatest, select, all } from 'redux-saga/effects';
import axios from 'axios';
import sortBy from 'lodash/sortBy';
import { dismiss } from 'react-toastify-redux';

import { showAlert } from 'global/reducers/alerts';
import { getAllVariables } from 'models/Intervention/utils';
import { hasDuplicates } from 'utils/hasDuplicates';
import {
  mapQuestionToStateObject,
  mapInterventionToStateObject,
} from 'utils/mapResponseObjects';
import { makeSelectIntervention } from 'global/reducers/intervention';

import {
  CREATE_QUESTION_REQUEST,
  GET_QUESTIONS_REQUEST,
  UPDATE_QUESTION_DATA,
  UPDATE_QUESTION_TITLE,
  ADD_QUESTION_IMAGE,
  DELETE_QUESTION_IMAGE,
  UPDATE_QUESTION_VIDEO,
  UPDATE_QUESTION_SETTINGS,
  DELETE_QUESTION,
  COPY_QUESTION,
  CHANGE_QUESTION_TYPE,
  GET_INTERVENTION_LIST_REQUEST,
  ERROR_DUPLICATE_VARIABLE,
} from './constants';

import {
  getQuestionsSuccess,
  getQuestionsError,
  createQuestionSuccess,
  createQuestionError,
  updateQuestionSuccess,
  updateQuestionError,
  updateQuestionImage,
  deleteQuestionsSucccess,
  deleteQuestionError,
  getInterventionListSuccess,
  getInterventionListError,
} from './actions';

import { makeSelectSelectedQuestion, makeSelectQuestions } from './selectors';

function* getInterventionList() {
  const requestURL = 'v1/interventions/';

  try {
    const {
      data: { data },
    } = yield axios.get(requestURL);

    yield put(
      getInterventionListSuccess(
        data.map(intervention => mapInterventionToStateObject(intervention)),
      ),
    );
  } catch (error) {
    yield put(getInterventionListError(error));
  }
}

function* getQuestions({ payload: { id } }) {
  const requestURL = `v1/interventions/${id}/questions`;

  try {
    const response = yield axios.get(requestURL);

    const questions = response.data.data.map(question =>
      mapQuestionToStateObject(question),
    );

    yield put(getQuestionsSuccess(sortBy(questions, 'order')));
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
    yield put(updateQuestionSuccess(responseQuestion));
    window.URL.revokeObjectURL(imageUrl);
  } catch (error) {
    yield put(updateQuestionError(error));
  }
}

function* deleteQuestionImage({ payload: { selectedQuestionId } }) {
  const requestURL = `v1/questions/${selectedQuestionId}/images`;

  try {
    const response = yield axios.delete(requestURL);

    const responseQuestion = mapQuestionToStateObject(response.data.data);
    yield put(updateQuestionSuccess(responseQuestion));
  } catch (error) {
    yield put(updateQuestionError(error));
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
    yield put(showAlert(ERROR_DUPLICATE_VARIABLE));
    return yield put(updateQuestionError());
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

    return yield put(updateQuestionSuccess(responseQuestion));
  } catch (error) {
    return yield put(updateQuestionError(error));
  }
}

function* deleteQuestion({ payload: { questionId, interventionId } }) {
  const requestURL = `v1/interventions/${interventionId}/questions/${questionId}`;

  try {
    yield axios.delete(requestURL);

    yield put(deleteQuestionsSucccess(questionId));
  } catch (error) {
    yield put(deleteQuestionError(error));
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

export default function* editInterventionPageSaga() {
  yield all([
    yield takeLatest(GET_INTERVENTION_LIST_REQUEST, getInterventionList),
    yield takeLatest(GET_QUESTIONS_REQUEST, getQuestions),
    yield takeLatest(CREATE_QUESTION_REQUEST, createQuestion),
    yield takeLatest(UPDATE_QUESTION_DATA, updateQuestion),
    yield takeLatest(UPDATE_QUESTION_TITLE, updateQuestion),
    yield takeLatest(ADD_QUESTION_IMAGE, addImageQuestion),
    yield takeLatest(DELETE_QUESTION_IMAGE, deleteQuestionImage),
    yield takeLatest(UPDATE_QUESTION_VIDEO, updateQuestion),
    yield takeLatest(UPDATE_QUESTION_SETTINGS, updateQuestion),
    yield takeLatest(DELETE_QUESTION, deleteQuestion),
    yield takeLatest(COPY_QUESTION, copyQuestion),
    yield takeLatest(CHANGE_QUESTION_TYPE, updateQuestion),
  ]);
}
