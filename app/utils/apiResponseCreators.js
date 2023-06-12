export const apiUserResponse = (id = 0) => ({
  data: {
    id: `test-id-${id}`,
    type: 'user',
    attributes: {
      email: `test@test.com-${id}`,
      full_name: `test-full-name-${id}`,
      first_name: `test-first-name-${id}`,
      last_name: `test-last-name-${id}`,
      time_zone: 'America/New_York',
      active: true,
      roles: ['admin'],
      avatar_url: `test-avatar-${id}`,
      phone: `test-phone-${id}`,
      team_id: `test-team-id-${id}`,
      team_name: `test-team-name-${id}`,
      email_notification: true,
      sms_notification: true,
      feedback_completed: false,
      organizable_id: null,
      quick_exit_enabled: false,
    },
  },
});

export const apiSessionResponse = (id = 0) => ({
  data: {
    id: `intervention-test-${id}`,
    attributes: {
      name: `intervention-test-${id}`,
      position: id,
    },
    type: 'session',
  },
});

export const apiInterventionResponse = (id = 0) => ({
  data: {
    id: `intervention-test-${id}`,
    type: 'intervention',
    attributes: {
      name: `intervention-test-${id}`,
    },
  },
});
