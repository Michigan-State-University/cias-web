import { put, takeLatest, select, all } from 'redux-saga/effects';
import axios from 'axios';
import { dismiss, error as showError } from 'react-toastify-redux';

import { getAllVariables } from 'models/Intervention/utils';
import { hasDuplicates } from 'utils/hasDuplicates';
import { mapQuestionToStateObject } from 'utils/mapResponseObjects';
import { makeSelectIntervention } from 'global/reducers/intervention';
import { formatMessage } from 'utils/intlOutsideReact';

import {
  gridQuestion,
  informationQuestion,
  multiQuestion,
} from 'models/Intervention/QuestionTypes';
import messages from '../messages';
import {
  EDIT_QUESTION_REQUEST,
  CHANGE_QUESTION_TYPE_REQUEST,
  UPDATE_QUESTION_DATA,
  UPDATE_QUESTION_SETTINGS,
  EDIT_QUESTION_ERROR,
} from '../constants';

import { editQuestionSuccess, editQuestionError } from '../actions';

import { makeSelectSelectedQuestion, makeSelectQuestions } from '../selectors';

function* editQuestion() {
  const intervention = yield select(makeSelectIntervention());
  const question = yield select(makeSelectSelectedQuestion());
  const questions = yield select(makeSelectQuestions());
  const variables = getAllVariables(questions).filter(
    currentVariable => currentVariable && currentVariable.trim(),
  );

  let duplicates = false;

  if (question.type === multiQuestion.id) {
    question.body.data.forEach(element => {
      if (hasDuplicates(variables, element.variable.name)) duplicates = true;
    });
  } else if (question.type === gridQuestion.id) {
    question.body.data[0].payload.rows.forEach(element => {
      if (hasDuplicates(variables, element.variable.name)) duplicates = true;
    });
  } else if (question.type === informationQuestion.id) {
    duplicates = false;
  } else {
    duplicates = hasDuplicates(variables, question.body.variable.name);
  }

  if (duplicates) {
    yield put(
      showError(formatMessage(messages.duplicateVariable), {
        id: EDIT_QUESTION_ERROR,
      }),
    );
    return yield put(editQuestionError({ questionId: question.id }));
  }
  yield put(dismiss(EDIT_QUESTION_ERROR));

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
    return yield put(editQuestionError({ error, questionId: question.id }));
  }
}

export function* editQuestionSaga() {
  yield takeLatest(EDIT_QUESTION_REQUEST, editQuestion);
}
export function* updateQuestionDataSaga() {
  yield takeLatest(UPDATE_QUESTION_DATA, editQuestion);
}
export function* updateQuestionSettingsSaga() {
  yield takeLatest(UPDATE_QUESTION_SETTINGS, editQuestion);
}
export function* changeQuestionTypeSaga() {
  yield takeLatest(CHANGE_QUESTION_TYPE_REQUEST, editQuestion);
}

export default function* editQuestionAllSagas() {
  yield all([
    editQuestionSaga(),
    updateQuestionDataSaga(),
    updateQuestionSettingsSaga(),
    changeQuestionTypeSaga(),
  ]);
}
