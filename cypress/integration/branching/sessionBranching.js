import { singleQuestion } from 'models/Intervention/QuestionTypes';
import {
  CREATE_QUESTION,
  UPDATE_INTERVENTION,
  GET_SESSION_QUESTION_GROUPS,
  ANSWER_QUESTION,
  UPDATE_QUESTION,
} from '../../support/aliases';
const { ADMIN_EMAIL, ADMIN_PASSWORD } = require('../../support/envVariables');
const { singleQuestionDetails } = require('../../support/utils');
const index = 0;

const answers1 = [{ type: singleQuestion.name, answer: 1 }];
const branching = {
  session: {
    formula: 'var_0',
    cases: [
      {
        sign: '>',
        value: 1,
        session: { index: 1 },
      },
    ],
  },
};

const answerOptions = [
  {
    title: 'Question 1',
    options: [{ name: 'q11', score: 1 }, { name: 'q12', score: 2 }],
  },
  {
    title: 'Question 2',
    options: [{ name: 'q21', score: 1 }],
  },
  {
    title: 'Question 3',
    options: [{ name: 'q31', score: 1 }],
  },
];

describe('Session branching', () => {
  beforeEach(() => {
    cy.server();
    cy.createAlias(GET_SESSION_QUESTION_GROUPS);
    cy.createAlias(UPDATE_INTERVENTION);
    cy.createAlias(CREATE_QUESTION);
    cy.createAlias(UPDATE_QUESTION);
    cy.createAlias(ANSWER_QUESTION);

    cy.viewport(1500, 750);
    cy.login(Cypress.env(ADMIN_EMAIL), Cypress.env(ADMIN_PASSWORD));
    cy.createIntervention();
    cy.createSessionsInIntervention(2);
    cy.getBySel(`enter-intervention-${index}`).click();

    cy.populateSessionWithQuestions([singleQuestion.name], {
      variablePrefix: 'var_',
      questionDetails: singleQuestionDetails(answerOptions),
      removeReadQuestionBlock: true,
    });
  });

  it('Should go to session', () => {
    cy.contains(answerOptions[0].title).click();
    const { formula, cases } = branching.session;
    cy.setUpBranching(formula, cases);

    cy.location('pathname').then(firstSessionUrl => {
      const firstSessionFillUrl = firstSessionUrl.replace('/edit', '/fill');

      cy.go('back');
      cy.getBySel('enter-intervention-1').click();
      cy.location('pathname').then(secondSessionUrl => {
        const secondSessionFillUrl = secondSessionUrl.replace('/edit', '/fill');

        cy.go('back');
        cy.getBySel('enter-intervention-0').click();
        cy.answerPage();

        cy.location('pathname').should('eq', firstSessionFillUrl);
        cy.answerQuestions(answers1);
        cy.location('pathname').should('eq', secondSessionFillUrl);
      });
    });
  });
});
