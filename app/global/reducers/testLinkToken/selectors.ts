import { createSelector } from 'reselect';

import { RootState } from 'global/reducers';

import { testLinkTokenReducerKey, initialState } from './reducer';
import { TestLinkTokenState } from './types';

const selectTestLinkToken = (rootState: RootState): TestLinkTokenState =>
  rootState[testLinkTokenReducerKey] || initialState;

export const makeSelectTestLinkTokenStatus = () =>
  createSelector(selectTestLinkToken, ({ status }) => status);
