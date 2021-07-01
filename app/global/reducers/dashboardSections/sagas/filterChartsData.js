import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import objectToCamelCase from 'utils/objectToCamelCase';
import { toast } from 'react-toastify';
import { formatMessage } from 'utils/intlOutsideReact';
import { ChartStatus, SET_CHARTS_FILTERS } from '../constants';
import { setChartsData } from '../actions';
import messages from '../messages';

export function* filterChartsData({
  payload: {
    filters: { organizationId, clinics, daysOffset },
  },
}) {
  try {
    let params = '';
    if (clinics) {
      params = clinics.reduce(
        (acc, { value }) => acc.concat(`clinic_ids[]=${value}&`),
        params,
      );
    }
    const { value: offset } = daysOffset;

    const chartDataUrl = `v1/organizations/${organizationId}/charts_data/generate?`;
    const { data: chartsData } = yield call(
      axios.get,
      chartDataUrl.concat(params),
      {
        params: {
          statuses: [ChartStatus.PUBLISHED],
          date_offset: offset ?? '',
          clinics: clinics ? clinics.map(({ value }) => value) : [],
        },
      },
    );
    const parsedData = objectToCamelCase(chartsData.data_for_charts);
    yield put(setChartsData(parsedData));
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(messages.filterError, {
        toastId: SET_CHARTS_FILTERS,
      }),
    );
  }
}

export default function* filterChartsDataSaga() {
  yield takeLatest(SET_CHARTS_FILTERS, filterChartsData);
}
