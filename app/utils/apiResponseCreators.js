export const apiUserResponse = (id = 0) => ({
  data: {
    id: `test-id-${id}`,
    attributes: {
      type: 'user',
      email: `test@test.com-${id}`,
      full_name: `test-full-name-${id}`,
      first_name: `test-first-name-${id}`,
      last_name: `test-last-name-${id}`,
      time_zone: 'America/New_York',
      active: true,
      roles: ['admin'],
      avatar_url: `test-avatar-${id}`,
    },
  },
});

export const apiInterventionResponse = (id = 0) => ({
  data: {
    id: `intervention-test-${id}`,
    attributes: {
      name: `intervention-test-${id}`,
      position: id,
    },
  },
});

export const apiProblemResponse = (id = 0) => ({
  data: {
    id: `problem-test-${id}`,
    attributes: {
      name: `problem-test-${id}`,
    },
  },
});
