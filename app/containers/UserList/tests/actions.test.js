import { fetchUsers } from 'global/reducers/userList';
import { FETCH_USERS } from 'global/reducers/userList/constants';
import { ROLES } from 'global/reducers/auth/constants';

describe('UserList actions', () => {
  describe('Default Action', () => {
    it('has a type of FETCH_USERS', () => {
      const expected = {
        payload: {
          types: {
            types: [['admin', 'participant', 'researcher']],
          },
        },
        type: FETCH_USERS,
      };
      expect(fetchUsers({ types: [ROLES.allRoles] })).toEqual(expected);
    });
  });
});
