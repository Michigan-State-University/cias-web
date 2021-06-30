import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { formatMessage } from 'utils/intlOutsideReact';
import { toast } from 'react-toastify';

import {
  REORDER_DASHBOARD_SECTIONS_REQUEST,
  REORDER_DASHBOARD_SECTIONS_FAILURE,
} from '../constants';
import { reorderSectionsSuccess, reorderSectionsFailure } from '../actions';
import messages from '../messages';

export function* reorderDashboardSections({
  payload: { organizationId, dashboardSections },
}) {
  const requestURL = `/v1/organizations/${organizationId}/dashboard_sections/position`;

  try {
    const positionData = dashboardSections.map(({ id, position }) => ({
      id,
      position,
    }));
    yield call(axios.patch, requestURL, {
      dashboard_section: { position: positionData },
    });

    yield put(reorderSectionsSuccess());
  } catch (error) {
    yield call(toast.error, formatMessage(messages.reorderError), {
      toastId: REORDER_DASHBOARD_SECTIONS_FAILURE,
    });
    yield put(reorderSectionsFailure());
  }
}

export default function* reorderDashboardSectionsSaga() {
  yield takeLatest(
    REORDER_DASHBOARD_SECTIONS_REQUEST,
    reorderDashboardSections,
  );
}
