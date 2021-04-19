import { fetchUsers } from 'global/reducers/userList';
import { FETCH_USERS, PER_PAGE } from 'global/reducers/userList/constants';
import { Roles } from 'models/User/UserRoles';

describe('UserList actions', () => {
  describe('Default Action', () => {
    it('has a type of FETCH_USERS', () => {
      const expected = {
        payload: {
          page: 1,
          perPage: PER_PAGE,
          includeInactive: true,
          teamId: undefined,
          name: undefined,
          roles: [
            'admin',
            'team_admin',
            'participant',
            'researcher',
            'third_party',
            'organization_admin',
            'e_intervention_admin',
          ],
        },
        type: FETCH_USERS,
      };
      expect(fetchUsers(Roles.allRoles, undefined, 1, true)).toEqual(expected);
    });
  });
});
