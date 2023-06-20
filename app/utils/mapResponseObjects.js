import pick from 'lodash/pick';

export const mapQuestionToStateObject = (question) => ({
  ...question.attributes,
  id: question.id,
  body: {
    ...question.attributes.body,
    data: question.attributes.body.data || [],
  },
});

export const defaultMapper = (object) => ({
  ...object.attributes,
  id: object.id,
});

export const mapAccessToStateObject = ({ user_id: id, email }) => ({
  id,
  email,
});

export const mapCurrentUser = ({ id, attributes }) => ({
  id,
  firstName: attributes.first_name,
  lastName: attributes.last_name,
  fullName: attributes.full_name,
  email: attributes.email,
  roles: attributes.roles,
  avatar: attributes.avatar_url,
  timeZone: attributes.time_zone,
  active: attributes.active,
  phone: attributes.phone,
  teamId: attributes.team_id,
  teamName: attributes.team_name,
  emailNotification: attributes.email_notification,
  smsNotification: attributes.sms_notification,
  feedbackCompleted: attributes.feedback_completed,
  organizableId: attributes.organizable_id,
  quickExitEnabled: attributes.quick_exit_enabled,
});

export const pickUserAttributes = (user) =>
  pick(user, [
    'id',
    'firstName',
    'lastName',
    'fullName',
    'email',
    'roles',
    'avatar',
    'timeZone',
    'active',
    'phone',
    'teamId',
    'teamName',
    'emailNotification',
    'smsNotification',
    'feedbackCompleted',
    'organizableId',
    'quickExitEnabled',
  ]);

export const mapTeam = (team) => ({
  id: team.id,
  name: team.attributes.name,
  teamAdmin: team.relationships.team_admin,
});

export const mapCopiedExternallyQuestion = (copied, response) => ({
  ...copied,
  id: response.id,
  question_group_id: response.question_group_id,
});
