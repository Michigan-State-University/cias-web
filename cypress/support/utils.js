import { singleQuestion } from 'models/Session/QuestionTypes';
import { UPDATE_QUESTION } from './aliases';

export const answerQuestionByType = ({ type, answer }) => {
  switch (type) {
    case singleQuestion.name:
      cy.getBySel(`single-question-${answer}-checkbox`).click({ force: true });
      break;
    default:
      break;
  }
};

export const singleQuestionDetails = (answers) => (questionIndex) => {
  const { title, options } = answers[questionIndex];
  cy.get('p')
    .contains('Enter main text/question for screen here')
    .clear()
    .type(title);
  cy.wait([UPDATE_QUESTION]);

  options.forEach(({ name, score }, index) => {
    cy.get(`div[data-placeholder="Answer ${index + 1}"]`).type(name);
    cy.wait([UPDATE_QUESTION]);

    cy.getBySel(`score-${index}-input`).type(score);
    cy.wait([UPDATE_QUESTION]);

    if (index + 1 !== options.length) {
      cy.contains('Add new answer').click();
      cy.wait([UPDATE_QUESTION]);
    }
  });
};
