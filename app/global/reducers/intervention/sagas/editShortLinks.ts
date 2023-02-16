import axios from 'axios';
import { select, takeEvery, call, put } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import objectToSnakeCase from 'utils/objectToSnakeCase';

import { ApiError } from 'models/Api';
import { ShortLinkValidationError } from 'models/ShortLink';

import {
  EDIT_INTERVENTION_SUCCESS,
  EDIT_SHORT_LINKS_REQUEST,
} from '../constants';
import {
  editShortLinksError,
  editShortLinksRequest,
  editShortLinksSuccess,
} from '../actions';
import { makeSelectInterventionId } from '../selectors';
import messages from '../messages';

function* editShortLinks({
  payload: { shortLinks },
}: ReturnType<typeof editShortLinksRequest>) {
  const interventionId: Nullable<string> = yield select(
    makeSelectInterventionId(),
  );
  if (!interventionId) return;

  const requestURL = `v1/interventions/${interventionId}/short_links`;

  try {
    yield call(axios.post, requestURL, {
      short_links: objectToSnakeCase(shortLinks),
    });
    yield call(
      toast.success,
      formatMessage(messages.interventionSettingsSaved),
      {
        // It uses editInterventionSuccess action type on purpose to avoid
        // displaying two success toasts at the same time
        toastId: EDIT_INTERVENTION_SUCCESS,
      },
    );
    yield put(editShortLinksSuccess());
  } catch (error) {
    yield put(
      editShortLinksError(error as ApiError | ShortLinkValidationError),
    );
  }
}

export default function* editShortLinksSaga() {
  yield takeEvery(EDIT_SHORT_LINKS_REQUEST, editShortLinks);
}
