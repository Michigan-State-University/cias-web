import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userList state domain
 */

const selectUserDomain = (state) => state.singleUser || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by User
 */

const makeSelectUser = () =>
  createSelector(selectUserDomain, (substate) => substate);

export default makeSelectUser;
export { selectUserDomain };
