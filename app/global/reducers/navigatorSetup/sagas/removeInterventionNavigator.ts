import axios from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  REMOVE_INTERVENTION_NAVIGATOR_REQUEST,
  REMOVE_INTERVENTION_NAVIGATOR_ERROR,
  REMOVE_INTERVENTION_NAVIGATOR_SUCCESS,
} from '../constants';
import {
  removeInterventionNavigatorError,
  removeInterventionNavigatorSuccess,
  removeInterventionNavigatorRequest,
} from '../actions';
import messages from '../messages';

export function* removeInterventionNavigator({
  payload: { interventionNavigatorId, interventionId },
}: ReturnType<typeof removeInterventionNavigatorRequest>) {
  const url = `/v1/live_chat/intervention/${interventionId}/navigators/${interventionNavigatorId}`;
  try {
    yield call(axios.delete, url);
    yield put(removeInterventionNavigatorSuccess(interventionNavigatorId));
    yield call(toast.success, formatMessage(messages.navigatorRemovedSuccess), {
      toastId: REMOVE_INTERVENTION_NAVIGATOR_SUCCESS,
    });
  } catch (error) {
    yield put(removeInterventionNavigatorError(interventionNavigatorId));
    yield call(
      toast.error,
      formatMessage(messages.removeInterventionNavigatorError),
      {
        toastId: REMOVE_INTERVENTION_NAVIGATOR_ERROR,
      },
    );
  }
}

export default function* removeInterventionNavigatorSaga() {
  yield takeLatest(
    REMOVE_INTERVENTION_NAVIGATOR_REQUEST,
    removeInterventionNavigator,
  );
}
