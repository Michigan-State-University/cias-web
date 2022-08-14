import axios from 'axios';
import { put, call, takeLatest, all } from 'redux-saga/effects';

import { jsonApiToObject } from 'utils/jsonApiMapper';

import { ApiError } from 'models/Api';
import {
  NavigatorModalUser,
  NavigatorSetup,
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
  const navigatorTabUrl = `/v1/live_chat/intervention/${interventionId}/navigator_tab`;

  try {
    const {
      fetchNoNavigators: { data: noNavigatorsData },
      navigatorsTab: { data: navigatorsTabData },
    } = yield all({
      fetchNoNavigators: call(axios.get, noNavigatorsUrl),
      navigatorsTab: call(axios.get, navigatorTabUrl),
    });

    const navigatorSetup = jsonApiToObject(
      noNavigatorsData,
      'navigatorSetup',
    ) as NavigatorSetup;

    const { navigators, navigatorsInTeam, sendInvitations } = jsonApiToObject(
      navigatorsTabData,
      'navigatorTab',
    ) as {
      navigators: NavigatorModalUser[];
      sendInvitations: PendingNavigatorInvitation[];
      navigatorsInTeam: NavigatorModalUser[];
    };

    yield put(
      fetchNavigatorSetupSuccess(
        sendInvitations,
        navigators,
        navigatorSetup,
        navigatorsInTeam,
      ),
    );
  } catch (error) {
    yield put(fetchNavigatorSetupError(error as ApiError));
  }
}

export default function* fetchNavigatorSetupSaga() {
  yield takeLatest(FETCH_NAVIGATOR_SETUP_REQUEST, fetchNavigatorSetup);
}
