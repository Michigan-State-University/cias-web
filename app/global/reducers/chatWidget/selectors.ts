import { createSelector } from 'reselect';

import { RootState } from 'global/reducers';

import { initialState, chatWidgetReducerKey } from './reducer';

import { ChatWidgetState } from './types';

const selectChatWidgetState = (rootState: RootState): ChatWidgetState =>
  rootState[chatWidgetReducerKey] || initialState;

export const makeSelectLiveChatInterventionId = () =>
  createSelector(selectChatWidgetState, (substate) => substate.interventionId);
