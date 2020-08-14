import { fetchUsers } from 'global/reducers/userList';
import { FETCH_USERS } from 'global/reducers/userList/constants';

describe('UserList actions', () => {
  describe('Default Action', () => {
    it('has a type of FETCH_USERS', () => {
      const expected = {
        type: FETCH_USERS,
      };
      expect(fetchUsers()).toEqual(expected);
    });
  });
});
