import { createSelector } from 'reselect';
import { initialState } from './reducer';

const adminConsole = (state) => state.adminConsole || initialState;

export const makeSelectAdminConsoleState = () =>
  createSelector(adminConsole, (substate) => substate);
