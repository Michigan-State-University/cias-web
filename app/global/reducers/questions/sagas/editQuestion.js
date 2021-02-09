import { put, takeLatest, select, all, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';
import get from 'lodash/get';

import { getAllVariables, NotAnswerableQuestions } from 'models/Session/utils';
import { hasDuplicates } from 'utils/hasDuplicates';
import { mapQuestionToStateObject } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';

import {
  gridQuestion,
  multiQuestion,
  nameQuestion,
} from 'models/Session/QuestionTypes';
import messages from '../messages';
import {
  EDIT_QUESTION_REQUEST,
  CHANGE_QUESTION_TYPE_REQUEST,
  UPDATE_QUESTION_DATA,
  UPDATE_QUESTION_SETTINGS,
  EDIT_QUESTION_ERROR,
} from '../constants';

import { editQuestionSuccess, editQuestionError } from '../actions';

import {
  makeSelectSelectedQuestion,
  makeSelectQuestions,
  makeSelectQuestionById,
} from '../selectors';

const validateVariable = (payload, question, variables) => {
  const duplicateError = new Error(formatMessage(messages.duplicateVariable));
  const reservedError = new Error(formatMessage(messages.reservedVariable));

  if (payload.data.name === nameQuestion.reservedVariable) throw reservedError;
  else if (question.type === multiQuestion.id) {
    question.body.data.forEach(element => {
      if (hasDuplicates(variables, element.variable.name)) throw duplicateError;
    });
  } else if (question.type === gridQuestion.id) {
    question.body.data[0].payload.rows.forEach(element => {
      if (hasDuplicates(variables, element.variable.name)) throw duplicateError;
    });
  } else if (NotAnswerableQuestions.includes(question.type)) {
    throw duplicateError;
  } else if (hasDuplicates(variables, question.body.variable.name)) {
    throw duplicateError;
  }
};

function* editQuestion({ payload }) {
  const questionId = get(payload, 'data.questionId', undefined);
  const question = yield select(
    questionId
      ? makeSelectQuestionById(questionId)
      : makeSelectSelectedQuestion(),
  );
  const questions = yield select(makeSelectQuestions());
  const variables = getAllVariables(questions).filter(
    currentVariable => currentVariable && currentVariable.trim(),
  );

  try {
    validateVariable(payload, question, variables);
  } catch (error) {
    yield call(toast.error, error.message, {
      toastId: EDIT_QUESTION_ERROR,
    });
    return yield put(editQuestionError({ questionId: question.id }));
  }

  yield call(toast.dismiss, EDIT_QUESTION_ERROR);

  const requestURL = `v1/question_groups/${
    question.question_group_id
  }/questions/${question.id}`;
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
