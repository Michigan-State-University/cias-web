import { put, takeLatest, call, select } from 'redux-saga/effects';
import { makeSelectUser } from 'global/reducers/auth/selectors';
import LocalStorageService from 'utils/localStorageService';

import {
  editPhoneNumberPreviewError,
  editPhoneNumberPreviewSuccess,
} from '../actions';
import { EDIT_PHONE_NUMBER_PREVIEW_REQUEST } from '../constants';

export function* editPhoneNumberQuestion({
  payload: {
    phoneNumber: { phoneAttributes },
    isPreview,
  },
}) {
  try {
    yield put(editPhoneNumberPreviewSuccess(phoneAttributes, isPreview));
    if (!isPreview) {
      const user = yield select(makeSelectUser());
      yield call(LocalStorageService.updateState, user);
    }
  } catch (error) {
    yield put(editPhoneNumberPreviewError(isPreview));
  }
}

export default function* editPhoneNumberQuestionSaga() {
  yield takeLatest(EDIT_PHONE_NUMBER_PREVIEW_REQUEST, editPhoneNumberQuestion);
}
