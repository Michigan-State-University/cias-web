import { fetchUsers } from 'global/reducers/userList';
import { FETCH_USERS } from 'global/reducers/userList/constants';
import { Roles } from 'models/User/UserRoles';

describe('UserList actions', () => {
  describe('Default Action', () => {
    it('has a type of FETCH_USERS', () => {
      const expected = {
        payload: {
          name: undefined,
          roles: ['admin', 'participant', 'researcher'],
        },
        type: FETCH_USERS,
      };
      expect(fetchUsers(Roles.allRoles, undefined)).toEqual(expected);
    });
  });
});
