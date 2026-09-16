import axios from 'axios';
import { toast } from 'react-toastify';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { formatMessage } from 'utils/intlOutsideReact';
import { formatApiErrorMessage } from 'utils/formatApiErrorMessage';

import bulkCreatePredefinedParticipantsSaga, {
  bulkCreatePredefinedParticipants,
} from 'global/reducers/intervention/sagas/bulkCreatePredefinedParticipants';
import {
  bulkCreatePredefinedParticipantsError,
  bulkCreatePredefinedParticipantsSuccess,
  fetchPredefinedParticipantsRequest,
} from '../../actions';
import {
  BULK_CREATE_PREDEFINED_PARTICIPANTS_ERROR,
  BULK_CREATE_PREDEFINED_PARTICIPANTS_REQUEST,
  BULK_CREATE_PREDEFINED_PARTICIPANTS_SUCCESS,
} from '../../constants';
import messages from '../../messages';

describe('bulkCreatePredefinedParticipants saga', () => {
  const interventionId = 'int-1';
  const onSuccess = jest.fn();

  const baseData = {
    interventionId,
    participants: [
      {
        firstName: 'Alice',
        email: 'alice@example.com',
        emailNotification: true,
        smsNotification: false,
        phoneAttributes: null,
      },
    ],
  };

  // ---------------------------------------------------------------------------
  // Happy path (202 Accepted)
  // ---------------------------------------------------------------------------

  it('dispatches success, shows async toast, and calls onSuccess on 202', () => {
    const payload = { interventionId, data: baseData, onSuccess };

    return expectSaga(bulkCreatePredefinedParticipants, { payload })
      .provide([[matchers.call.fn(axios.post), {}]])
      .put(bulkCreatePredefinedParticipantsSuccess())
      .call(
        toast.success,
        formatMessage(messages.bulkCreatePredefinedParticipantsAccepted),
        { toastId: BULK_CREATE_PREDEFINED_PARTICIPANTS_SUCCESS },
      )
      .put(fetchPredefinedParticipantsRequest(interventionId))
      .run()
      .then(() => {
        expect(onSuccess).toHaveBeenCalled();
      });
  });

  // ---------------------------------------------------------------------------
  // variable_answers inner-key preservation (regression guard for Open Question #9)
  // ---------------------------------------------------------------------------
  // Lodash snakeCase('s1.var1') → 's_1_var_1', which is wrong.
  // The saga must bypass objectToSnakeCase for the variableAnswers values and
  // re-attach them as `variable_answers` with the original dotted keys intact.

  it('preserves variable_answers dotted keys through objectToSnakeCase', () => {
    const raAnswers = { 's1.var1': '1', 's1.var2': '2026-04-22' };
    const dataWithAnswers = {
      interventionId,
      participants: [
        {
          firstName: 'Bob',
          email: 'bob@example.com',
          emailNotification: true,
          smsNotification: false,
          phoneAttributes: null,
          variableAnswers: raAnswers,
        },
      ],
    };

    const capturedBodies = [];

    return expectSaga(bulkCreatePredefinedParticipants, {
      payload: { interventionId, data: dataWithAnswers, onSuccess: undefined },
    })
      .provide({
        call({ fn, args }, next) {
          if (fn === axios.post) {
            // args is [url, body]
            capturedBodies.push(args[1]);
            return {};
          }
          return next();
        },
      })
      .run()
      .then(() => {
        expect(capturedBodies).toHaveLength(1);
        const body = capturedBodies[0];

        // Top-level key is snake-cased correctly
        expect(body).toHaveProperty('predefined_users');

        // The dotted inner keys MUST be preserved — NOT converted by snakeCase
        expect(body.predefined_users.participants[0].variable_answers).toEqual({
          's1.var1': '1',
          's1.var2': '2026-04-22',
        });

        // Verify the standard field IS snake-cased (regression check the other way)
        expect(body.predefined_users.participants[0]).toHaveProperty(
          'first_name',
          'Bob',
        );
      });
  });

  // ---------------------------------------------------------------------------
  // Structured 422 error path
  // ---------------------------------------------------------------------------

  it('dispatches error and shows count-only toast on structured 422', () => {
    const structuredError = {
      response: {
        data: {
          message: 'Validation failed',
          details: {
            errors: [
              { row: 0, field: 'email', code: 'blank' },
              { row: 1, field: 's1.var1', code: 'value_not_a_number' },
            ],
          },
        },
      },
    };
    const payload = { interventionId, data: baseData, onSuccess };

    return expectSaga(bulkCreatePredefinedParticipants, { payload })
      .provide([[matchers.call.fn(axios.post), throwError(structuredError)]])
      .put(bulkCreatePredefinedParticipantsError(structuredError))
      .call(
        toast.error,
        formatMessage(messages.bulkCreatePredefinedParticipantsErrorList, {
          count: 2,
        }),
        { toastId: BULK_CREATE_PREDEFINED_PARTICIPANTS_ERROR },
      )
      .run();
  });

  // ---------------------------------------------------------------------------
  // Unstructured 5xx / network error fallback
  // ---------------------------------------------------------------------------

  it('falls back to formatApiErrorMessage on unstructured error', () => {
    const networkError = new Error('Network Error');
    const payload = { interventionId, data: baseData, onSuccess };

    return expectSaga(bulkCreatePredefinedParticipants, { payload })
      .provide([[matchers.call.fn(axios.post), throwError(networkError)]])
      .put(bulkCreatePredefinedParticipantsError(networkError))
      .call(
        toast.error,
        formatApiErrorMessage(
          networkError,
          messages.bulkCreatePredefinedParticipantsError,
        ),
        { toastId: BULK_CREATE_PREDEFINED_PARTICIPANTS_ERROR },
      )
      .run();
  });

  // ---------------------------------------------------------------------------
  // Watcher
  // ---------------------------------------------------------------------------

  it('watcher uses takeLatest on the correct action type', () => {
    const sagaFunction = bulkCreatePredefinedParticipantsSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(
        BULK_CREATE_PREDEFINED_PARTICIPANTS_REQUEST,
        bulkCreatePredefinedParticipants,
      ),
    );
  });
});
