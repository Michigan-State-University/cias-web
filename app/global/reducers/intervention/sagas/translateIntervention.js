import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  translateInterventionError,
  translateInterventionSuccess,
} from '../actions';
import messages from '../messages';
import {
  TRANSLATE_INTERVENTION_ERROR,
  TRANSLATE_INTERVENTION_REQUEST,
  TRANSLATE_INTERVENTION_SUCCESS,
} from '../constants';

export function* translateIntervention({
  payload: { id, destinationLanguageId, destinationVoiceId },
}) {
  const url = `v1/interventions/${id}/translate`;
  const params = {
    dest_language_id: destinationLanguageId,
    destination_google_tts_voice_id: destinationVoiceId,
  };

  try {
    yield call(axios.post, url, params);
    yield put(translateInterventionSuccess());
    yield call(toast.info, formatMessage(messages.translateSuccess), {
      toastId: TRANSLATE_INTERVENTION_SUCCESS,
    });
  } catch (error) {
    yield put(translateInterventionError(error));
    yield call(toast.error, formatMessage(messages.translateError), {
      toastId: TRANSLATE_INTERVENTION_ERROR,
    });
  }
}

export default function* translateInterventionSaga() {
  yield takeEvery(TRANSLATE_INTERVENTION_REQUEST, translateIntervention);
}
