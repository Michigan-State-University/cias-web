import pick from 'lodash/pick';
import { jsonApiToObject } from './jsonApiMapper';
import objectToCamelCase from './objectToCamelCase';

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

// Used for mapping JSON API response to state object
export const mapCurrentUser = (data) => {
  const mappedUser = jsonApiToObject(data, 'user');
  mappedUser.avatar = mappedUser?.avatarUrl;
  delete mappedUser.avatarUrl;
  return mappedUser;
};

// Used for mapping plain JSON response to state object
export const mapPlainUserData = (data) => {
  const mappedUser = objectToCamelCase(data);
  mappedUser.avatar = mappedUser?.avatarUrl;
  delete mappedUser.avatarUrl;
  return mappedUser;
};

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
