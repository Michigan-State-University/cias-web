import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';

import { defaultMapper } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';
import globalMessages from 'global/i18n/globalMessages';

import { createOrganizationInterventionSuccess } from '../actions';
import {
  CREATE_ORGANIZATION_INTERVENTION_REQUEST,
  CREATE_ORGANIZATION_INTERVENTION_ERROR,
} from '../constants';

export function* createOrganizationIntervention({
  payload: { organizationId },
}) {
  const requestURL = `v1/interventions`;

  try {
    const {
      data: { data },
    } = yield call(axios.post, requestURL, {
      name: 'New e-Intervention',
      organization_id: organizationId,
    });
    const mappedData = defaultMapper(data);

    yield put(createOrganizationInterventionSuccess(mappedData));
    yield put(push(`/interventions/${mappedData.id}`));
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(globalMessages.createInterventionError),
      {
        toastId: CREATE_ORGANIZATION_INTERVENTION_ERROR,
      },
    );
  }
}
export default function* createInterventionSaga() {
  yield takeLatest(
    CREATE_ORGANIZATION_INTERVENTION_REQUEST,
    createOrganizationIntervention,
  );
}
