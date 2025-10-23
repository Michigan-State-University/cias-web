import { put, takeLatest, select, all, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';
import get from 'lodash/get';

import {
  gridQuestion,
  multiQuestion,
  tlfbQuestion,
} from 'models/Session/QuestionTypes';
import {
  QUESTIONS_WITHOUT_VARIABLE,
  getEditVariables,
  getTlfbVariables,
} from 'models/Session/utils';

import { hasDuplicates } from 'utils/hasDuplicates';
import { mapQuestionToStateObject } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';
import { objectDifference } from 'utils/objectDifference';
import { hasObjectAnyKeys } from 'utils/getObjectKeys';

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
  makeSelectQuestions,
  makeSelectQuestionById,
  makeSelectQuestionByIdFromCache,
  makeSelectSelectedQuestionFromCache,
  makeSelectSelectedQuestion,
} from '../selectors';

const hasVariableKey = (obj) => {
  if (typeof obj !== 'object' || obj === null) return false;
  if ('variable' in obj) return true;
  return Object.values(obj).some(hasVariableKey);
};

const hasVariableChanges = (diff) => hasVariableKey(diff);

const validateVariable = (payload, question, variables) => {
  if (QUESTIONS_WITHOUT_VARIABLE.includes(question.type)) {
    return;
  }
  const duplicateError = new Error(formatMessage(messages.duplicateVariable));

  const checkAgainstExisting = (name) => {
    if (hasDuplicates(variables, name)) throw duplicateError;
  };

  if (question.type === multiQuestion.id) {
    question.body.data.forEach((element) => {
      checkAgainstExisting(element.variable.name);
    });
  } else if (question.type === gridQuestion.id) {
    question.body.data[0].payload.rows.forEach((element) => {
      checkAgainstExisting(element.variable.name);
    });
  } else if (question.type === tlfbQuestion.id) {
    const tlfbVariables = getTlfbVariables(question);
    tlfbVariables.forEach((variable) => {
      if (hasDuplicates(variables, variable)) throw duplicateError;
    });
  } else {
    checkAgainstExisting(question.body.variable.name);
  }
};

function* editQuestion({ payload }) {
  const questionId = get(payload, 'data.questionId', undefined);
  const question = yield select(
    questionId
      ? makeSelectQuestionById(questionId)
      : makeSelectSelectedQuestion(),
  );
  const cachedQuestion = yield select(
    questionId
      ? makeSelectQuestionByIdFromCache(questionId)
      : makeSelectSelectedQuestionFromCache(),
  );

  const diff = objectDifference(cachedQuestion, question);

  if (!hasObjectAnyKeys(diff)) return yield put(editQuestionSuccess(question));

  const questions = yield select(makeSelectQuestions());
  const variables = getEditVariables(questions).filter(
    (currentVariable) => currentVariable && currentVariable.trim(),
  );

  try {
    validateVariable(payload, question, variables);
  } catch (error) {
    yield call(toast.error, error.message, {
      toastId: EDIT_QUESTION_ERROR,
    });
    return yield put(
      editQuestionError({ questionId: question.id, error: error.message }),
    );
  }

  yield call(toast.dismiss, EDIT_QUESTION_ERROR);

  const isVariableUpdate = hasVariableChanges(diff);

  const requestURL = `v1/question_groups/${question.question_group_id}/questions/${question.id}`;
  try {
    const response = yield axios.patch(requestURL, {
      question: diff,
    });

    const responseQuestion = mapQuestionToStateObject(response.data.data);

    yield put(editQuestionSuccess(responseQuestion));

    if (isVariableUpdate) {
      yield call(toast.success, formatMessage(messages.variableUpdateQueued), {
        toastId: 'variable-update-queued',
        autoClose: 5000,
      });
    }

    return;
  } catch (error) {
    if (error.response?.status === 422 && isVariableUpdate) {
      yield call(
        toast.warning,
        error.response?.data?.message ||
          formatMessage(messages.variableUpdateInProgress),
        {
          toastId: 'variable-update-in-progress',
          autoClose: 5000,
        },
      );
    } else {
      yield call(toast.error, error.response?.data?.message, {
        toastId: EDIT_QUESTION_ERROR,
      });
    }
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
