export const mapQuestionToStateObject = question => ({
  ...question.attributes,
  id: question.id,
  body: {
    ...question.attributes.body,
    data: question.attributes.body.data || [],
  },
});

export const mapInterventionToStateObject = intervention => ({
  ...intervention.attributes,
  id: intervention.id,
});
