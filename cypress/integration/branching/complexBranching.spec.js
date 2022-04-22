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

const answers1 = [
  { type: singleQuestion.name, answer: 1 },
  { type: singleQuestion.name, answer: 0 },
];
const answers2 = [
  { type: singleQuestion.name, answer: 0 },
  { type: singleQuestion.name, answer: 1 },
];
const answers3 = [
  { type: singleQuestion.name, answer: 0 },
  { type: singleQuestion.name, answer: 0 },
];

const branching = {
  simple: {
    formula: 'var_0 + var_1',
    cases: [
      {
        sign: '>',
        value: 5,
        screen: { group: 'Default Group', title: 'Question 3' },
      },
      {
        sign: '<',
        value: 5,
        screen: { group: 'Default Group', title: 'Question 4' },
      },
      {
        sign: '=',
        value: 5,
        screen: { group: 'Default Group', title: 'Question 5' },
      },
    ],
  },
};

const answerOptions = [
  {
    title: 'Question 1',
    options: [
      { name: 'q11', score: 2 },
      { name: 'q12', score: 4 },
    ],
  },
  {
    title: 'Question 2',
    options: [
      { name: 'q21', score: 3 },
      { name: 'q22', score: 2 },
    ],
  },
  {
    title: 'Question 3',
    options: [{ name: 'q31', score: 1 }],
  },
  {
    title: 'Question 4',
    options: [{ name: 'q41', score: 1 }],
  },
  {
    title: 'Question 5',
    options: [{ name: 'q51', score: 1 }],
  },
];

describe('Complex branching', () => {
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
      [
        singleQuestion.name,
        singleQuestion.name,
        singleQuestion.name,
        singleQuestion.name,
        singleQuestion.name,
      ],
      {
        variablePrefix: 'var_',
        questionDetails: singleQuestionDetails(answerOptions),
        removeReadQuestionBlock: true,
      },
    );
  });

  it('Skip screen', () => {
    cy.contains(answerOptions[1].title).click();
    const { formula, cases } = branching.simple;
    cy.setUpBranching(formula, cases);

    cy.answerQuestions(answers1);
    cy.contains('Question 3');

    cy.answerQuestions(answers2);
    cy.contains('Question 4');

    cy.answerQuestions(answers3);
    cy.contains('Question 5');
  });
});
