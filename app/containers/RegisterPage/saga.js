import { takeLatest, put } from 'redux-saga/effects';
import objectToSnakeCase from 'utils/objectToSnakeCase';
import axios from 'axios';
import { push } from 'connected-react-router';
import { REGISTER_REQUEST } from './constants';
import { registerFailure, registerSuccess } from './actions';

function* register({ payload }) {
  const requestURL = `auth`;

  try {
    yield axios.post(requestURL, {
      ...objectToSnakeCase(payload),
      confirm_success_url: `http://localhost:4200/login`,
    });
    yield put(registerSuccess());
    yield put(push('/login'));
  } catch (error) {
    const errorMessage = error.response.data.errors.full_messages.join('\n');
    yield put(registerFailure(errorMessage));
  }
}
// Individual exports for testing
export default function* registerPageSaga() {
  yield takeLatest(REGISTER_REQUEST, register);
}
