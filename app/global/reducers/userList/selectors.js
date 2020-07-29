import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userList state domain
 */

const selectUserListDomain = state => state.userList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserList
 */

const makeSelectUserList = () =>
  createSelector(
    selectUserListDomain,
    substate => substate,
  );

export default makeSelectUserList;
export { selectUserListDomain };
