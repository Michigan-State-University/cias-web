import { ids } from 'containers/SettingsPanel/utils';

export const createIntervention = (id = 0) => ({
  id: `intervention-test-${id}`,
  emails: null,
  name: `intervention-test-${id}`,
  position: id,
});

export const createProblem = (index = 0) => ({
  id: `problem-test-${index}`,
  status: 'draft',
  usersWithAccess: [
    {
      id: `user-test-${index}`,
      email: `user-test-${index}@user.com`,
    },
  ],
  shared_to: ids.anyoneWithTheLink,
  interventions: [createIntervention(`${index}`)],
});

export const createUser = (index = 0) => ({
  id: `test-id-${index}`,
  active: true,
  firstName: `test-first-name-${index}`,
  lastName: `test-last-name-${index}`,
  fullName: `test-full-name-${index}`,
  avatar: `test-avatar-${index}`,
  email: `test@test.com-${index}`,
  roles: ['admin'],
  timeZone: 'America/New_York',
});
