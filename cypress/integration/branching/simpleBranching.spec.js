import { singleQuestion } from 'models/Session/QuestionTypes';
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
const answers2 = [{ type: singleQuestion.name, answer: 0 }];
const branching = {
  simple: {
    formula: 'var_0',
    cases: [
      {
        sign: '>',
        value: 1,
        screen: { group: 'Default Group', title: 'Question 3' },
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

describe('Simple branching', () => {
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
    cy.createSessionsInIntervention(1);
    cy.getBySel(`enter-session-${index}`).click();

    cy.populateSessionWithQuestions(
      [singleQuestion.name, singleQuestion.name, singleQuestion.name],
      {
        variablePrefix: 'var_',
        questionDetails: singleQuestionDetails(answerOptions),
        removeReadQuestionBlock: true,
      },
    );
  });

  it('Skip one screen', () => {
    cy.contains(answerOptions[0].title).click();
    const { formula, cases } = branching.simple;
    cy.setUpBranching(formula, cases);
    cy.answerQuestions(answers1);
    cy.contains('Question 3');
    cy.answerQuestions(answers2);
    cy.contains('Question 2');
  });
});
