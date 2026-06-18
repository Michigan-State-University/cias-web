import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { GroupType } from 'models/QuestionGroup';

import fetchRaSessionQuestionGroupsSaga, {
  fetchRaSessionQuestionGroups,
} from 'global/reducers/intervention/sagas/fetchRaSessionQuestionGroups';
import {
  fetchRaSessionQuestionGroupsSuccess,
  fetchRaSessionQuestionGroupsError,
} from '../../actions';
import { FETCH_RA_SESSION_QUESTION_GROUPS_REQUEST } from '../../constants';

describe('fetchRaSessionQuestionGroups saga', () => {
  const sessionId = 'session-ra-1';
  const payload = { sessionId };

  const mockGroups = [
    { id: 'group-1', position: 2, type: GroupType.PLAIN, title: 'Group B' },
    { id: 'group-2', position: 1, type: GroupType.PLAIN, title: 'Group A' },
    { id: 'group-3', position: 3, type: GroupType.FINISH, title: 'Finish' },
  ];

  // The saga sorts by position and filters out FINISH groups,
  // so the expected result is group-2 (pos 1), group-1 (pos 2) — group-3 excluded.
  const expectedSortedGroups = [
    { id: 'group-2', position: 1, type: GroupType.PLAIN, title: 'Group A' },
    { id: 'group-1', position: 2, type: GroupType.PLAIN, title: 'Group B' },
  ];

  const mockApiResponse = {
    data: {
      data: mockGroups.map((g) => ({
        id: g.id,
        type: 'question_group',
        attributes: { position: g.position, type: g.type, title: g.title },
      })),
    },
  };

  it('dispatches success with sorted groups (FINISH filtered)', () =>
    expectSaga(fetchRaSessionQuestionGroups, { payload })
      .provide([[matchers.call.fn(axios.get), mockApiResponse]])
      .put(fetchRaSessionQuestionGroupsSuccess(expectedSortedGroups))
      .run());

  it('dispatches error on API failure', () => {
    const error = new Error('Network error');
    return expectSaga(fetchRaSessionQuestionGroups, { payload })
      .provide([[matchers.call.fn(axios.get), throwError(error)]])
      .put(fetchRaSessionQuestionGroupsError(error))
      .run();
  });

  it('watcher uses takeLatest on the correct action type', () => {
    const sagaFunction = fetchRaSessionQuestionGroupsSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(
        FETCH_RA_SESSION_QUESTION_GROUPS_REQUEST,
        fetchRaSessionQuestionGroups,
      ),
    );
  });
});
