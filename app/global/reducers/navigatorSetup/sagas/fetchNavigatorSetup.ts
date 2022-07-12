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

const NAVIGATOR_ACCOUNTS = [
  {
    id: 1,
    user: {
      firstName: 'test',
      lastName: 'user',
      avatarUrl: '',
      email: 'Test@test.pl',
    },
  },
  {
    id: 2,
    user: {
      firstName: 'Other',
      lastName: 'Test',
      avatarUrl: '',
      email: 'Test2@test.pl',
    },
  },
  {
    id: 3,
    user: {
      firstName: 'Michał',
      lastName: 'Smierc',
      avatarUrl: '',
      email: 'Test3@test.pl',
    },
  },
  {
    id: 4,
    user: {
      firstName: 'Lubie',
      lastName: 'Placki',
      avatarUrl: '',
      email: 'Test4@test.pl',
    },
  },
  {
    id: 5,
    user: {
      firstName: 'Lubie',
      lastName: 'Placki',
      avatarUrl: '',
      email: 'Test4@test.pl',
    },
  },
  {
    id: 6,
    user: {
      firstName: 'Lubie',
      lastName: 'Placki',
      avatarUrl: '',
      email: 'Test4@test.pl',
    },
  },
  {
    id: 7,
    user: {
      firstName: 'Lubie',
      lastName: 'Placki',
      avatarUrl: '',
      email: 'Test4@test.pl',
    },
  },
  {
    id: 8,
    user: {
      firstName: 'Lubie',
      lastName: 'Placki',
      avatarUrl: '',
      email: 'Test4@test.pl',
    },
  },
  {
    id: 9,
    user: {
      firstName: 'Lubie',
      lastName: 'Placki',
      avatarUrl: '',
      email: 'Test4@test.pl',
    },
  },
];

export function* fetchNavigatorSetup({
  payload: { interventionId },
}: ReturnType<typeof fetchNavigatorSetupRequest>) {
  const noNavigatorsUrl = `/v1/live_chat/intervention/${interventionId}/navigator_setup`;
  const notAcceptedNavigatorsUrl = `/v1/interventions/${interventionId}/navigator_invitations`;
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
        NAVIGATOR_ACCOUNTS,
      ),
    );
  } catch (error) {
    yield put(fetchNavigatorSetupError(error as ApiError));
  }
}

export default function* fetchNavigatorSetupSaga() {
  yield takeLatest(FETCH_NAVIGATOR_SETUP_REQUEST, fetchNavigatorSetup);
}
