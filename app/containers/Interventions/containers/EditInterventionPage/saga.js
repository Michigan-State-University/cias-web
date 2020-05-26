import { put, takeLatest, select, all } from 'redux-saga/effects';
import axios from 'axios';
import { getHeaders } from 'utils/getHeaders';
import { makeSelectHeaders } from 'global/reducers/auth';
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

function* createIntervention() {
  const requestURL = `${process.env.API_URL}/v1/interventions`;

  try {
    const response = yield axios.post(
      requestURL,
      {
        intervention: {
          type: 'Intervention::Single',
          name: 'e-Intervention New',
          settings: {},
        },
      },
      { headers: getHeaders(yield select(makeSelectHeaders())) },
    );

    const token = response.headers['access-token'];

    yield put(createInterventionSuccess(token));
    yield put(push(`/interventions/${response.data.id}/edit`));
  } catch (error) {
    yield put(createInterventionError(error));
  }
}

function* getIntervention({ payload: { id } }) {
  const requestURL = `${process.env.API_URL}/v1/interventions/${id}`;

  try {
    const response = yield axios.get(requestURL, {
      headers: getHeaders(yield select(makeSelectHeaders())),
    });

    const token = response.headers['access-token'];

    yield put(
      getInterventionSuccess(token, {
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
  const requestURL = `${process.env.API_URL}/v1/interventions/${id}/questions`;

  try {
    const response = yield axios.get(requestURL, {
      headers: getHeaders(yield select(makeSelectHeaders())),
    });

    const token = response.headers['access-token'];

    const questions = response.data.data.map(question => ({
      ...question.attributes,
      id: question.id,
      body: question.attributes.body
        ? Object.values(question.attributes.body)
        : [],
    }));

    yield put(getQuestionsSuccess(token, questions));
  } catch (error) {
    yield put(getQuestionsError(error));
  }
}

function* createQuestion({ payload: { type, id } }) {
  const requestURL = `${process.env.API_URL}/v1/interventions/${id}/questions`;

  try {
    const response = yield axios.post(
      requestURL,
      {
        question: new Question(
          'I can address any health behaviour. For example, I might ask a patient if they are a daily smoker.',
          type,
          {},
        ),
      },
      {
        headers: getHeaders(yield select(makeSelectHeaders())),
      },
    );

    const token = response.headers['access-token'];

    yield put(
      createQuestionSuccess(token, { ...response.data, type, body: [] }),
    );
  } catch (error) {
    yield put(createQuestionError(error));
  }
}

function* updateQuestion() {
  const intervention = yield select(makeSelectIntervention());
  const question = yield select(makeSelectSelectedQuestion());

  // eslint-disable-next-line no-unused-vars
  const requestURL = `${process.env.API_URL}/v1/interventions/${
    intervention.id
  }/questions/${question.id}`;

  try {
    // ! waiting for backend, temporary solution to return edited value
    // const response = yield axios.post(
    //   requestURL,
    //   {
    //     question,
    //   },
    //   {
    //     headers: getHeaders(yield select(makeSelectHeaders())),
    //   },
    // );

    // const token = response.headers['access-token'];
    const token = null;

    yield put(updateQuestionSuccess(token, question));
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
