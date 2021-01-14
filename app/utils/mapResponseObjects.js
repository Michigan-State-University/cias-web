export const mapQuestionToStateObject = question => ({
  ...question.attributes,
  id: question.id,
  body: {
    ...question.attributes.body,
    data: question.attributes.body.data || [],
  },
});

export const defaultMapper = object => ({
  ...object.attributes,
  id: object.id,
});

export const mapAccessToStateObject = ({ user_id: id, email }) => ({
  id,
  email,
});

export const mapCurrentUser = user => ({
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
});

export const mapCurrentUserWithoutAttributes = user => ({
  id: user.id,
  firstName: user.first_name,
  lastName: user.last_name,
  fullName: user.full_name,
  email: user.email,
  roles: user.roles,
  avatar: user.avatar_url,
  timeZone: user.time_zone,
  active: user.active,
  phone: user.phone,
});
