import axios from 'axios';
import { select, takeEvery, call, put } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import { CHANGE_INTERVENTION_NARRATOR_REQUEST } from '../constants';
import {
  changeInterventionNarratorError,
  changeInterventionNarratorRequest,
  changeInterventionNarratorSuccess,
} from '../actions';
import { makeSelectInterventionId } from '../selectors';
import messages from '../messages';

function* changeInterventionNarrator({
  payload: { name, replacedAnimations },
}: ReturnType<typeof changeInterventionNarratorRequest>) {
  const interventionId: Nullable<string> = yield select(
    makeSelectInterventionId(),
  );
  if (!interventionId) return;

  const requestURL = `v1/interventions/${interventionId}/change_narrator`;

  try {
    yield call(axios.post, requestURL, {
      narrator: {
        name,
        replaced_animations: replacedAnimations,
      },
    });
    yield call(
      toast.info,
      formatMessage(messages.changeInterventionNarratorSuccess),
    );
    yield put(changeInterventionNarratorSuccess());
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(messages.changeInterventionNarratorError),
    );
    yield put(changeInterventionNarratorError(error));
  }
}

export default function* editInterventionSaga() {
  yield takeEvery(
    CHANGE_INTERVENTION_NARRATOR_REQUEST,
    changeInterventionNarrator,
  );
}
