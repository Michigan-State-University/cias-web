import axios from 'axios';
import { toast } from 'react-toastify';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { defaultMapper } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';
import globalMessages from 'global/i18n/globalMessages';
import { apiProblemResponse } from 'utils/apiResponseCreators';

import { archiveProblemSuccess, archiveProblemFailure } from '../../actions';
import {
  ARCHIVE_PROBLEM_ERROR,
  ARCHIVE_PROBLEM_REQUEST,
} from '../../constants';
import archiveProblemSaga, { archiveProblem } from '../archiveProblem';

describe('archiveProblem saga', () => {
  const payload = {
    problemId: 'problem-test',
  };

  it('Check archiveProblem generator success connection', () => {
    const apiResponse = apiProblemResponse();

    return expectSaga(archiveProblem, { payload })
      .provide([[matchers.call.fn(axios.patch), { data: apiResponse }]])
      .put(archiveProblemSuccess(defaultMapper(apiResponse.data)))
      .run();
  });
  it('Check archiveProblem error connection', () => {
    const error = new Error('test');
    return expectSaga(archiveProblem, { payload })
      .provide([[matchers.call.fn(axios.patch), throwError(error)]])
      .put(archiveProblemFailure(payload.problemId))
      .call(toast.error, formatMessage(globalMessages.archiveProblemError), {
        toastId: ARCHIVE_PROBLEM_ERROR,
      })
      .run();
  });

  it('Check archiveProblem connection', () => {
    const sagaFunction = archiveProblemSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(ARCHIVE_PROBLEM_REQUEST, archiveProblem),
    );
  });
});
