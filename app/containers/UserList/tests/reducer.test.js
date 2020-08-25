import { UserListReducer } from 'global/reducers/userList';

/* eslint-disable default-case, no-param-reassign */
describe('userListReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      users: [],
      usersError: null,
      usersLoading: true,
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(UserListReducer(undefined, {})).toEqual(expectedResult);
  });
});
