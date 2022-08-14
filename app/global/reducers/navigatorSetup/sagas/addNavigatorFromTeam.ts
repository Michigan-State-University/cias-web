// import axios from 'axios';
import { takeLatest, put, call, delay } from 'redux-saga/effects';
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
  payload: { user },
}: ReturnType<typeof addNavigatorFromTeamRequest>) {
  console.log(user);
  // const url = `/v1/interventions/${interventionId}/navigator_invitations`;
  try {
    yield delay(2000);
    // const { data } = yield call(axios.post, url, {
    //   navigator_invitation: {
    //     emails,
    //   },
    // });
    // const invitations = jsonApiToArray(
    //   data,
    //   'navigatorInvitation',
    // ) as PendingNavigatorInvitation[];
    yield put(addNavigatorFromTeamSuccess(user));
    yield call(
      toast.info,
      formatMessage(messages.teamNavigatorHasBeenInvited),
      {
        toastId: ADD_NAVIGATOR_FROM_TEAM_SUCCESS,
      },
    );
  } catch (error) {
    console.log(error);
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
