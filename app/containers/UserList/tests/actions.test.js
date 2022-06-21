import { fetchUsers } from 'global/reducers/userList';
import { FETCH_USERS, PER_PAGE } from 'global/reducers/userList/constants';
import { AllRoles } from 'models/User/RolesManager';

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
            'researcher',
            'participant',
            'team_admin',
            'third_party',
            'e_intervention_admin',
            'organization_admin',
            'health_system_admin',
            'health_clinic_admin',
          ],
        },
        type: FETCH_USERS,
      };
      expect(fetchUsers(AllRoles, undefined, 1, true)).toEqual(expected);
    });
  });
});
