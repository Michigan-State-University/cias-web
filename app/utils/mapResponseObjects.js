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

export const mapCurrentUser = (user) => ({
  id: user.id,
  firstName: user.attributes.first_name,
  lastName: user.attributes.last_name,
  fullName: user.attributes.full_name,
  email: user.attributes.email,
  roles: user.attributes.roles,
  avatar: user.attributes.avatar_url,
  timeZone: user.attributes.time_zone,
  active: user.attributes.active,
  phone: user.attributes.phone,
  teamId: user.attributes.team_id,
  teamName: user.attributes.team_name,
  emailNotification: user.attributes.email_notification,
  smsNotification: user.attributes.sms_notification,
  feedbackCompleted: user.attributes.feedback_completed,
  organizableId: user.attributes.organizable_id,
  abilityToCreateCatMh: user.attributes.ability_to_create_cat_mh,
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
    'abilityToCreateCatMh',
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
