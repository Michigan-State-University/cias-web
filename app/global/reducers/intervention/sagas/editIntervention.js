import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import globalMessages from 'global/i18n/globalMessages';
import { defaultMapper } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';
import objectToSnakeCase from 'utils/objectToSnakeCase';
import getErrorFlag from 'utils/getErrorFlag';

import { editInterventionError, editInterventionSuccess } from '../actions';
import {
  EDIT_INTERVENTION_REQUEST,
  EDIT_INTERVENTION_ERROR,
} from '../constants';

export function* editIntervention({
  payload: { intervention, hasNarratorChanged },
}) {
  const requestURL = `v1/interventions/${intervention.id}`;
  const narratorChangeURL = `${requestURL}/change_narrator`;

  try {
    if (hasNarratorChanged) {
      yield call(axios.post, narratorChangeURL, {
        narrator: { name: intervention.currentNarrator },
      });
      return;
    }

    const {
      data: { data },
    } = yield call(
      axios.patch,
      requestURL,
      objectToSnakeCase({ intervention }),
    );

    const mappedData = defaultMapper(data);
    yield put(editInterventionSuccess({ ...intervention, ...mappedData }));
  } catch (error) {
    const errorFlag = getErrorFlag(error);
    yield call(
      toast.error,
      formatMessage(globalMessages[errorFlag || 'editInterventionError']),
      {
        toastId: EDIT_INTERVENTION_ERROR,
      },
    );
    yield put(editInterventionError(error));
  }
}
export default function* editInterventionSaga() {
  yield takeLatest(EDIT_INTERVENTION_REQUEST, editIntervention);
}
