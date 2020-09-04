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

export const mapAccessToStateObject = ({
  attributes: {
    user: { id, email },
  },
}) => ({
  id,
  email,
});

export const mapCurrentUser = user => ({
  id: user.id,
  firstName: user.attributes.first_name,
  lastName: user.attributes.last_name,
  email: user.attributes.email,
  roles: user.attributes.roles,
});
