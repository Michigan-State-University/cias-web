import axios from 'axios';
import { put, call, takeLatest, all } from 'redux-saga/effects';

import { jsonApiToArray, jsonApiToObject } from 'utils/jsonApiMapper';

import { ApiError } from 'models/Api';
import {
  InterventionNavigator,
  NavigatorSetupData,
  PendingNavigatorInvitation,
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
    const {
      fetchNoNavigators: { data: noNavigatorsData },
      fetchPendingInvitations: { data: pendingNavigatorInvitationsData },
      fetchInterventionNavigators: { data: interventionNavigatorsData },
    } = yield all({
      fetchNoNavigators: call(axios.get, noNavigatorsUrl),
      fetchPendingInvitations: call(axios.get, pendingNavigatorInvitationsUrl),
      fetchInterventionNavigators: call(axios.get, interventionNavigatorUrl),
    });

    const navigatorSetupData = jsonApiToObject(
      noNavigatorsData,
      'navigatorSetup',
    ) as NavigatorSetupData;

    const pendingNavigatorInvitations = jsonApiToArray(
      pendingNavigatorInvitationsData,
      'navigatorInvitation',
    ) as PendingNavigatorInvitation[];

    const interventionNavigators = jsonApiToArray(
      interventionNavigatorsData,
      'navigator',
    ) as InterventionNavigator[];

    yield put(
      fetchNavigatorSetupSuccess(
        pendingNavigatorInvitations,
        interventionNavigators,
        navigatorSetupData,
      ),
    );
  } catch (error) {
    yield put(fetchNavigatorSetupError(error as ApiError));
  }
}

export default function* fetchNavigatorSetupSaga() {
  yield takeLatest(FETCH_NAVIGATOR_SETUP_REQUEST, fetchNavigatorSetup);
}
