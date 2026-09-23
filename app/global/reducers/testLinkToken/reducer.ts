import produce from 'immer';
import { getType } from 'typesafe-actions';

import { TestLinkTokenStatus } from 'models/TestLinkToken';
import {
  verifyTestLinkTokenRequest,
  verifyTestLinkTokenSuccess,
  verifyTestLinkTokenError,
} from './actions';

import { TestLinkTokenAction, TestLinkTokenState } from './types';

export const testLinkTokenReducerKey = 'testLinkToken';

// `PENDING`, not `VALID`: the gate reads this before anything has been asked, and only an explicit
// `VALID` lets a fill start.
export const initialState: TestLinkTokenState = {
  status: TestLinkTokenStatus.PENDING,
};

/* eslint-disable default-case, no-param-reassign, @typescript-eslint/default-param-last */
export const testLinkTokenReducer = (
  state: TestLinkTokenState = initialState,
  action: TestLinkTokenAction,
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case getType(verifyTestLinkTokenRequest):
        draft.status = TestLinkTokenStatus.PENDING;
        break;
      case getType(verifyTestLinkTokenSuccess):
        draft.status = action.payload.status;
        break;
      case getType(verifyTestLinkTokenError):
        draft.status = TestLinkTokenStatus.UNAVAILABLE;
        break;
    }
  });
