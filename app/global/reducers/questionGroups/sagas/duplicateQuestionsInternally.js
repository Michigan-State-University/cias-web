import { takeLatest, call, select } from 'redux-saga/effects';
// import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import { makeSelectQuestions } from 'global/reducers/questions';

import messages from '../messages';
import {
  DUPLICATE_QUESTIONS_INTERNALLY_REQUEST,
  DUPLICATE_QUESTIONS_INTERNALLY_ERROR,
  DUPLICATE_QUESTIONS_INTERNALLY_SUCCESS,
} from '../constants';

function* duplicateQuestionsInternally({ payload: { questions, sessionId } }) {
  // const requestURL = `/v1/questions/share`;
  console.log(questions, sessionId);
  try {
    // yield call(axios.post, requestURL, {
    //   ids: questionIds,
    //   researcher_ids: researcherIds,
    // });
    const result = yield call(mapQuestionsToDuplicateStructure, questions);
    console.log(result);
    yield call(
      toast.success,
      formatMessage(messages.duplicateInternallySuccess),
      {
        id: DUPLICATE_QUESTIONS_INTERNALLY_SUCCESS,
      },
    );
  } catch (error) {
    console.log(error);
    yield call(toast.error, formatMessage(messages.duplicateInternallyError), {
      id: DUPLICATE_QUESTIONS_INTERNALLY_ERROR,
    });
  }
}

export default function* duplicateQuestionsInternallySaga() {
  yield takeLatest(
    DUPLICATE_QUESTIONS_INTERNALLY_REQUEST,
    duplicateQuestionsInternally,
  );
}

function* mapQuestionsToDuplicateStructure(questions) {
  const questionsWithData = yield select(makeSelectQuestions());

  const filteredQuestions = questionsWithData.flatMap(
    ({ id, question_group_id: questionGroupId }) =>
      questions.includes(id)
        ? [
            {
              id,
              questionGroupId,
            },
          ]
        : [],
  );

  const groupedQuestions = filteredQuestions.reduce(
    (acc, { id, questionGroupId }) => ({
      ...acc,
      [questionGroupId]: [...(acc[questionGroupId] || []), id],
    }),
    {},
  );

  return Object.entries(groupedQuestions).map(([id, questionIds]) => ({
    id,
    question_ids: questionIds,
  }));
}
