import axios from 'axios';
import { call, takeLatest, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';

import { RoutePath } from 'global/constants';

import { formatMessage } from 'utils/intlOutsideReact';
import { parametrizeRoutePath } from 'utils/router';

import { ACCEPT_INTERVENTION_INVITE } from '../constants';
import { acceptInterventionInvite } from '../actions';
import messages from '../messages';

export function* acceptInvitation({
  payload: { interventionId, clinicId },
}: ReturnType<typeof acceptInterventionInvite>) {
  const url = `/v1/user_interventions`;
  try {
    const {
      data: {
        data: {
          id: userInterventionId,
          attributes: { blocked },
        },
      },
    } = yield call(axios.post, url, {
      intervention_id: interventionId,
      clinic_id: clinicId,
    });
    if (blocked) {
      yield put(push(`/`));
      yield call(
        toast.warning,
        formatMessage(messages.acceptBlockedInvitation),
        {
          toastId: `${ACCEPT_INTERVENTION_INVITE}/warning`,
        },
      );
    } else {
      yield put(
        push(
          parametrizeRoutePath(RoutePath.USER_INTERVENTION, {
            userInterventionId,
          }),
        ),
      );
    }
  } catch (error) {
    yield put(push(`/`));
    yield call(toast.error, formatMessage(messages.acceptInvitation), {
      toastId: ACCEPT_INTERVENTION_INVITE,
    });
  }
}

export default function* acceptInvitationSaga() {
  yield takeLatest(ACCEPT_INTERVENTION_INVITE, acceptInvitation);
}
