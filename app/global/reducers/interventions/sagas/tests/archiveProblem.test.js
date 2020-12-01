import axios from 'axios';
import { toast } from 'react-toastify';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { defaultMapper } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';
import globalMessages from 'global/i18n/globalMessages';
import { apiInterventionResponse } from 'utils/apiResponseCreators';

import archiveInterventionSaga, {
  archiveIntervention,
} from 'global/reducers/interventions/sagas/archiveIntervention';
import {
  archiveInterventionSuccess,
  archiveInterventionFailure,
} from '../../actions';
import {
  ARCHIVE_INTERVENTION_ERROR,
  ARCHIVE_INTERVENTION_REQUEST,
} from '../../constants';

describe('archiveIntervention saga', () => {
  const payload = {
    interventionId: 'intervention-test',
  };

  it('Check archiveIntervention generator success connection', () => {
    const apiResponse = apiInterventionResponse();

    return expectSaga(archiveIntervention, { payload })
      .provide([[matchers.call.fn(axios.patch), { data: apiResponse }]])
      .put(archiveInterventionSuccess(defaultMapper(apiResponse.data)))
      .run();
  });
  it('Check archiveIntervention error connection', () => {
    const error = new Error('test');
    return expectSaga(archiveIntervention, { payload })
      .provide([[matchers.call.fn(axios.patch), throwError(error)]])
      .put(archiveInterventionFailure(payload.interventionId))
      .call(
        toast.error,
        formatMessage(globalMessages.archiveInterventionError),
        {
          toastId: ARCHIVE_INTERVENTION_ERROR,
        },
      )
      .run();
  });

  it('Check archiveIntervention connection', () => {
    const sagaFunction = archiveInterventionSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(ARCHIVE_INTERVENTION_REQUEST, archiveIntervention),
    );
  });
});
