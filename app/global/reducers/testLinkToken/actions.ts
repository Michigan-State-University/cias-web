import { createAction } from 'typesafe-actions';

import { TestLinkTokenStatus } from 'models/TestLinkToken';

import {
  VERIFY_TEST_LINK_TOKEN_REQUEST,
  VERIFY_TEST_LINK_TOKEN_SUCCESS,
  VERIFY_TEST_LINK_TOKEN_ERROR,
} from './constants';

export const verifyTestLinkTokenRequest = createAction(
  VERIFY_TEST_LINK_TOKEN_REQUEST,
  (action) => (token: string) => action({ token }),
);

export const verifyTestLinkTokenSuccess = createAction(
  VERIFY_TEST_LINK_TOKEN_SUCCESS,
  (action) => (status: TestLinkTokenStatus) => action({ status }),
);

export const verifyTestLinkTokenError = createAction(
  VERIFY_TEST_LINK_TOKEN_ERROR,
  (action) => () => action({}),
);
