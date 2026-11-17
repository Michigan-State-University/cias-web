import { ActionType } from 'typesafe-actions';

import { TestLinkTokenStatus } from 'models/TestLinkToken';

import * as actions from './actions';

export type TestLinkTokenAction = ActionType<typeof actions>;

export type TestLinkTokenState = {
  status: TestLinkTokenStatus;
};
