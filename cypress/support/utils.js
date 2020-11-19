import { singleQuestion } from 'models/Intervention/QuestionTypes';

export const answerQuestionByType = ({ type, answer }) => {
  switch (type) {
    case singleQuestion.name:
      cy.getBySel(`single-question-${answer}-checkbox`).click({ force: true });
      break;
    default:
      break;
  }
};

export const singleQuestionDetails = answers => questionIndex => {
  const { title, options } = answers[questionIndex];
  cy.get('p')
    .contains('Enter main text/question for screen here')
    .clear()
    .type(title);
  options.forEach(({ name, score }, index) => {
    cy.get(`div[data-placeholder="Answer ${index + 1}"]`).type(name);
    cy.getBySel(`score-${index}-input`).type(score);
    if (index + 1 !== options.length) cy.contains('Add new answer').click();
  });
};
