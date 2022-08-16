import axios from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

// import { jsonApiToArray } from 'utils/jsonApiMapper';
import {
  ADD_NAVIGATOR_FROM_TEAM_REQUEST,
  ADD_NAVIGATOR_FROM_TEAM_ERROR,
  ADD_NAVIGATOR_FROM_TEAM_SUCCESS,
} from '../constants';
import {
  addNavigatorFromTeamSuccess,
  addNavigatorFromTeamRequest,
  addNavigatorFromTeamError,
} from '../actions';
import messages from '../messages';

export function* addNavigatorFromTeam({
  payload: { user, interventionId },
}: ReturnType<typeof addNavigatorFromTeamRequest>) {
  const url = `/v1/live_chat/intervention/${interventionId}/navigators`;
  try {
    yield call(axios.post, url, { navigator_id: user.id });
    yield put(addNavigatorFromTeamSuccess(user));
    yield call(
      toast.info,
      formatMessage(messages.teamNavigatorHasBeenInvited),
      {
        toastId: ADD_NAVIGATOR_FROM_TEAM_SUCCESS,
      },
    );
  } catch (error) {
    yield put(addNavigatorFromTeamError(user.id));
    yield call(
      toast.error,
      formatMessage(messages.teamNavigatorHasBeenInvitedError),
      {
        toastId: ADD_NAVIGATOR_FROM_TEAM_ERROR,
      },
    );
  }
}

export default function* addNavigatorFromTeamSaga() {
  yield takeLatest(ADD_NAVIGATOR_FROM_TEAM_REQUEST, addNavigatorFromTeam);
}
