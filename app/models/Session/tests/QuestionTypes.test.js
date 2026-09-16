import {
  AddableToClassicSessionQuestionTypes,
  AddableToRaSessionQuestionTypes,
  AddableToSmsSessionQuestionTypes,
  singleQuestion,
  numberQuestion,
  dateQuestion,
} from '../QuestionTypes';

describe('AddableToRaSessionQuestionTypes', () => {
  it('contains exactly Single, Number, and Date', () => {
    const ids = AddableToRaSessionQuestionTypes.map(({ id }) => id);

    expect(ids).toEqual([
      singleQuestion.id,
      dateQuestion.id,
      numberQuestion.id,
    ]);
  });

  it('is a strict subset of AddableToClassicSessionQuestionTypes', () => {
    const classicIds = AddableToClassicSessionQuestionTypes.map(({ id }) => id);

    AddableToRaSessionQuestionTypes.forEach(({ id }) => {
      expect(classicIds).toContain(id);
    });
  });

  it('does not overlap with AddableToSmsSessionQuestionTypes', () => {
    const smsIds = AddableToSmsSessionQuestionTypes.map(({ id }) => id);

    AddableToRaSessionQuestionTypes.forEach(({ id }) => {
      expect(smsIds).not.toContain(id);
    });
  });
});
