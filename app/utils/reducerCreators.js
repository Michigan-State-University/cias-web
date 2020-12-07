import { ids } from 'containers/SettingsPanel/utils';
import { singleQuestion } from 'models/Session/QuestionTypes';

export const createQuestion = (id = 0, type = singleQuestion.id) => ({
  id: `question-test-${id}`,
  type,
  subtitle: `subtitle-test-${id}`,
  question_group_id: `group-test-${id}`,
});

export const createSession = (id = 0) => ({
  id: `intervention-test-${id}`,
  emails: null,
  name: `intervention-test-${id}`,
  position: id,
});

export const createIntervention = (index = 0) => ({
  id: `intervention-test-${index}`,
  status: 'draft',
  usersWithAccess: [
    {
      id: `user-test-${index}`,
      email: `user-test-${index}@user.com`,
    },
  ],
  shared_to: ids.anyoneWithTheLink,
  sessions: [createSession(`${index}`)],
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

export const createReport = (index = 0) => ({
  id: `report-test-${index}`,
  title: `Report: ${index}. part - Results`,
});

export const createParticipantSession = (index = 0, available = false) => ({
  id: `Session-test-${index}`,
  title: `Session: ${index}`,
  available,
  link: available ? 'start/sessionId' : undefined,
  report: !available ? 'report/sessionId' : undefined,
});

export const createParticipantIntervention = (
  index = 0,
  sessions = [createParticipantSession(index)],
) => ({
  id: `Intervention-test-${index}`,
  title: `Intervention: ${index}`,
  sessions,
  emailNotifications: true,
});
