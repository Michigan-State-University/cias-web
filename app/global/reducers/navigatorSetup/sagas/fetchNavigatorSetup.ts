import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

import { jsonApiToArray, jsonApiToObject } from 'utils/jsonApiMapper';

import { ApiError } from 'models/Api';
import {
  InterventionNavigator,
  NoNavigatorsAvailableData,
  PendingNavigatorInvitations,
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
  const pendingNavigatorInvitationsUrl = `/v1/interventions/${interventionId}/navigator_invitations`;
  const interventionNavigatorUrl = `/v1/live_chat/intervention/${interventionId}/navigators`;
  try {
    const { data: noNavigatorsData } = yield call(axios.get, noNavigatorsUrl);
    const noNavigatorsAvailableData = jsonApiToObject(
      noNavigatorsData,
      'navigatorSetup',
    ) as NoNavigatorsAvailableData;
    const { data: pendingNavigatorInvitationsData } = yield call(
      axios.get,
      pendingNavigatorInvitationsUrl,
    );
    const pendingNavigatorInvitations = jsonApiToArray(
      pendingNavigatorInvitationsData,
      'navigatorInvitation',
    ) as PendingNavigatorInvitations[];

    const { data: interventionNavigatorsData } = yield call(
      axios.get,
      interventionNavigatorUrl,
    );
    const interventionNavigators = jsonApiToArray(
      interventionNavigatorsData,
      'navigator',
    ) as InterventionNavigator[];

    yield put(
      fetchNavigatorSetupSuccess(
        noNavigatorsAvailableData,
        pendingNavigatorInvitations,
        interventionNavigators,
      ),
    );
  } catch (error) {
    yield put(fetchNavigatorSetupError(error as ApiError));
  }
}

export default function* fetchNavigatorSetupSaga() {
  yield takeLatest(FETCH_NAVIGATOR_SETUP_REQUEST, fetchNavigatorSetup);
}
