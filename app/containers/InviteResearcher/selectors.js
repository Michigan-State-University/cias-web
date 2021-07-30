import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectState = (state) => state.invitations || initialState;

export const makeSelectState = () =>
  createSelector(selectState, (substate) => substate);

export const makeSelectInviteState = () =>
  createSelector(selectState, (substate) => substate.invite);

export const makeSelectInvitationsState = () =>
  createSelector(selectState, (substate) => substate.invitations);

export const makeSelectCancelState = () =>
  createSelector(selectState, (substate) => substate.cancel);
