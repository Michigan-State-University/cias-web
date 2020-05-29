import { put, takeLatest, select, all } from 'redux-saga/effects';
import axios from 'axios';
import Question from 'models/Intervention/Question';
import { push } from 'connected-react-router';
import {
  CREATE_INTERVENTION_REQUEST,
  GET_INTERVENTION_REQUEST,
  CREATE_QUESTION_REQUEST,
  GET_QUESTIONS_REQUEST,
  UPDATE_QUESTION_DATA,
  UPDATE_QUESTION_TITLE,
} from './constants';
import {
  createInterventionSuccess,
  createInterventionError,
  getInterventionSuccess,
  getInterventionError,
  getQuestionsSuccess,
  getQuestionsError,
  createQuestionSuccess,
  createQuestionError,
  getQuestionsRequest,
  updateQuestionSuccess,
  updateQuestionError,
} from './actions';
import {
  makeSelectIntervention,
  makeSelectSelectedQuestion,
} from './selectors';

const mapQuestionToStateObject = question => ({
  ...question.attributes,
  id: question.id,
  body: {
    ...question.attributes.body,
    data: question.attributes.body.data ? question.attributes.body.data : [],
  },
});

function* createIntervention() {
  const requestURL = `v1/interventions`;

  try {
    const response = yield axios.post(requestURL, {
      intervention: {
        type: 'Intervention::Single',
        name: 'e-Intervention New',
        settings: {},
      },
    });

    yield put(createInterventionSuccess());
    yield put(push(`/interventions/${response.data.data.id}/edit`));
  } catch (error) {
    yield put(createInterventionError(error));
  }
}

function* getIntervention({ payload: { id } }) {
  const requestURL = `v1/interventions/${id}`;

  try {
    const response = yield axios.get(requestURL);

    yield put(
      getInterventionSuccess({
        ...response.data.data.attributes,
        id: response.data.data.id,
      }),
    );

    yield put(getQuestionsRequest(id));
  } catch (error) {
    yield put(getInterventionError(error));
  }
}

function* getQuestions({ payload: { id } }) {
  const requestURL = `v1/interventions/${id}/questions`;

  try {
    const response = yield axios.get(requestURL);

    const questions = response.data.data.map(question =>
      mapQuestionToStateObject(question),
    );

    yield put(getQuestionsSuccess(questions));
  } catch (error) {
    yield put(getQuestionsError(error));
  }
}

function* createQuestion({ payload: { type, id } }) {
  const requestURL = `v1/interventions/${id}/questions`;

  try {
    const response = yield axios.post(requestURL, {
      question: new Question(
        'I can address any health behaviour. For example, I might ask a patient if they are a daily smoker.',
        type,
        {},
      ),
    });

    const question = mapQuestionToStateObject(response.data.data);

    yield put(createQuestionSuccess(question));
  } catch (error) {
    yield put(createQuestionError(error));
  }
}

function* updateQuestion() {
  const intervention = yield select(makeSelectIntervention());
  const question = yield select(makeSelectSelectedQuestion());

  const requestURL = `v1/interventions/${intervention.id}/questions/${
    question.id
  }`;

  try {
    const response = yield axios.put(requestURL, {
      question,
    });

    const responseQuestion = mapQuestionToStateObject(response.data.data);

    yield put(updateQuestionSuccess(responseQuestion));
  } catch (error) {
    yield put(updateQuestionError(error));
  }
}

export default function* editInterventionPageSaga() {
  yield all([
    yield takeLatest(CREATE_INTERVENTION_REQUEST, createIntervention),
    yield takeLatest(GET_INTERVENTION_REQUEST, getIntervention),
    yield takeLatest(GET_QUESTIONS_REQUEST, getQuestions),
    yield takeLatest(CREATE_QUESTION_REQUEST, createQuestion),
    yield takeLatest(UPDATE_QUESTION_DATA, updateQuestion),
    yield takeLatest(UPDATE_QUESTION_TITLE, updateQuestion),
  ]);
}
