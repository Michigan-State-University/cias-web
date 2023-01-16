import axios from 'axios';
import { put, call, all, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import size from 'lodash/size';

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

export function* editIntervention({ payload: { intervention, extraOptions } }) {
  const { id, ...interventionChanges } = intervention;
  const changeInterventionURL = `v1/interventions/${id}`;
  const requests = {};

  if (size(interventionChanges)) {
    /* eslint-disable-next-line redux-saga/yield-effects */
    requests.changeIntervention = call(
      axios.patch,
      changeInterventionURL,
      objectToSnakeCase({ intervention }),
    );
  }

  if (extraOptions?.hasNarratorChanged) {
    const narratorChangeURL = `${changeInterventionURL}/change_narrator`;
    /* eslint-disable-next-line redux-saga/yield-effects */
    requests.changeNarrator = call(axios.post, narratorChangeURL, {
      narrator: {
        name: intervention.currentNarrator,
        replaced_animations: extraOptions.replacementAnimations,
      },
    });
  }

  if (extraOptions?.hasLinksChanged) {
    const linksChangeURL = `${changeInterventionURL}/short_links`;
    /* eslint-disable-next-line redux-saga/yield-effects */
    requests.changeLinks = call(axios.post, linksChangeURL, {
      short_links: extraOptions.shortLinks,
    });
  }

  try {
    const { changeIntervention } = yield all(requests);

    const mappedData = defaultMapper(changeIntervention?.data?.data ?? {});
    yield put(editInterventionSuccess({ ...intervention, ...mappedData }));
    if (extraOptions?.onSuccess) {
      extraOptions.onSuccess();
    }
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
  yield takeEvery(EDIT_INTERVENTION_REQUEST, editIntervention);
}
