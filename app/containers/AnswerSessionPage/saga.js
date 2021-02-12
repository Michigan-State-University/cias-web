import { takeLatest, put, select, call } from 'redux-saga/effects';
import axios from 'axios';
import omit from 'lodash/omit';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import flatten from 'lodash/flatten';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';
import { formatMessage } from 'utils/intlOutsideReact';

import { mapQuestionToStateObject } from 'utils/mapResponseObjects';

import { makeSelectLocation } from 'containers/App/selectors';
import { ternary } from 'utils/ternary';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import { NotAnswerableQuestions } from 'models/Session/utils';
import { FETCH_QUESTIONS, SUBMIT_ANSWER_REQUEST } from './constants';
import {
  fetchQuestionsFailure,
  fetchQuestionsSuccess,
  submitAnswerSuccess,
  submitAnswerFailure,
  setQuestionIndex,
} from './actions';
import { makeSelectAnswers } from './selectors';
import messages from './messages';

const sessionPathRegex = /\/sessions\/.*/;
const isPreviewRegex = /.*\/preview($|\/\d+$)/;

const calculatePath = (currentPath, sessionId) => {
  const isPreview = isPreviewRegex.test(currentPath);
  const commonPathPart = currentPath.replace(
    sessionPathRegex,
    `/sessions/${sessionId}`,
  );

  return commonPathPart.concat(ternary(isPreview, '/preview', '/fill'));
};

function* fetchQuestionsAsync({ payload: { sessionId } }) {
  try {
    const {
      data: { question_groups: groups },
    } = yield axios.get(`/v1/sessions/${sessionId}/question_groups`);
    const orderedGroups = orderBy(groups, 'position');
    const questions = flatten(
      orderedGroups.map(({ questions: groupQuestions }) =>
        orderBy(groupQuestions, 'position'),
      ),
    );
    yield put(fetchQuestionsSuccess(questions));
  } catch (error) {
    yield put(fetchQuestionsFailure(error));
  }
}

function* submitAnswersAsync({
  payload: {
    answerId,
    nextQuestionIndex,
    required,
    type: questionType,
    sessionId,
  },
}) {
  const answers = yield select(makeSelectAnswers());
  const { answerBody } = answers[answerId];
  let data = map(answerBody, singleBody => omit(singleBody, 'index')); // index is needed to remember the selected answers, but useless in request
  if (data.length || !required) {
    if (!data.length) {
      data = [
        {
          value: '',
          var: '',
        },
      ];
    }

    if (!NotAnswerableQuestions.includes(questionType)) {
      const type = questionType.replace('Question', 'Answer');
      const {
        data: {
          data: { id },
        },
      } = yield axios.post(`/v1/questions/${answerId}/answers`, {
        answer: { type, body: { data } },
      });

      const {
        data: { data: branchingResult, warning },
      } = yield axios.get(`/v1/sessions/${sessionId}/flows?answer_id=${id}`);

      if (!isNullOrUndefined(warning))
        yield call(toast.warning, formatMessage(messages[warning]));

      if (branchingResult) {
        switch (branchingResult.type) {
          case 'question':
            yield put(submitAnswerSuccess(answerId));
            yield put(
              setQuestionIndex({
                question: mapQuestionToStateObject(branchingResult),
              }),
            );
            return;

          case 'session':
            const { id: branchingResultId } = branchingResult;
            const { pathname } = yield select(makeSelectLocation());

            const newPath = calculatePath(pathname, branchingResultId);

            yield put(push(newPath));
            window.location.reload();
            return;

          default:
            break;
        }
      }
    }

    yield put(submitAnswerSuccess(answerId));
    yield put(setQuestionIndex({ index: nextQuestionIndex }));
  } else {
    yield put(submitAnswerFailure(answerId, 'Choose answer'));
  }
}

// Individual exports for testing
export default function* AnswerSessionPageSaga() {
  yield takeLatest(FETCH_QUESTIONS, fetchQuestionsAsync);
  yield takeLatest(SUBMIT_ANSWER_REQUEST, submitAnswersAsync);
}
