import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

import { jsonApiToArray, jsonApiToObject } from 'utils/jsonApiMapper';

import { ApiError } from 'models/Api';
import {
  NoNavigatorAvailableData,
  NotAcceptedNavigators,
} from 'models/NavigatorSetup';

import { FETCH_NAVIGATOR_SETUP_REQUEST } from '../constants';
import {
  fetchNavigatorSetupError,
  fetchNavigatorSetupRequest,
  fetchNavigatorSetupSuccess,
} from '../actions';

export function* fetchNavigatorSetup({
  payload: { interventionId },
}: ReturnType<typeof fetchNavigatorSetupRequest>) {
  const noNavigatorsUrl = `/v1/live_chat/intervention/${interventionId}/navigator_setup`;
  const notAcceptedNavigatorsUrl = `/v1/interventions/${interventionId}/navigators/invitations`;
  try {
    const { data: noNavigatorsData } = yield call(axios.get, noNavigatorsUrl);
    const noNavigatorAvailableData = jsonApiToObject(
      noNavigatorsData,
      'navigatorSetup',
    ) as NoNavigatorAvailableData;
    const { data: notAcceptedNavigatorsData } = yield call(
      axios.get,
      notAcceptedNavigatorsUrl,
    );
    const notAcceptedNavigators = jsonApiToArray(
      notAcceptedNavigatorsData,
      'navigatorInvitation',
    ) as NotAcceptedNavigators[];
    yield put(
      fetchNavigatorSetupSuccess(
        noNavigatorAvailableData,
        notAcceptedNavigators,
      ),
    );
  } catch (error) {
    yield put(fetchNavigatorSetupError(error as ApiError));
  }
}

export default function* fetchNavigatorSetupSaga() {
  yield takeLatest(FETCH_NAVIGATOR_SETUP_REQUEST, fetchNavigatorSetup);
}
