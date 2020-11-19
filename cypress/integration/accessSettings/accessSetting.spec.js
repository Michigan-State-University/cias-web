/* eslint no-unused-expressions: 0 */ // --> OFF

import { singleQuestion } from 'models/Intervention/QuestionTypes';
import { CREATE_QUESTION } from '../../support/aliases';
const { ADMIN_EMAIL, ADMIN_PASSWORD } = require('../../support/envVariables');
const index = 0;

describe('Access settings', () => {
  beforeEach(() => {
    cy.server();
    cy.viewport(1500, 750);
    cy.createAlias(CREATE_QUESTION);
    cy.login(Cypress.env(ADMIN_EMAIL), Cypress.env(ADMIN_PASSWORD));
    cy.createIntervention();
    cy.createSessionsInIntervention(1);
    cy.getBySel(`enter-intervention-${index}`).click();
    cy.populateSessionWithQuestions([singleQuestion.name], {});
    cy.getBySel('back-problem-button').click();

    cy.route('PATCH', '**/problems/*').as('updateIntervention');
    cy.route('GET', '**/interventions/*/question_groups').as(
      'getSessionQuestionGroups',
    );
  });

  it('Access settings test - anyone with link', () => {
    // Anyone with the link is selected
    cy.getBySel('access-anyone-radio').should('be.visible');

    // Publish Intervention
    cy.contains('Publish Intervention').click();
    cy.contains('Confirm').click({ force: true });
    cy.wait('@updateIntervention');
    cy.contains('Close Intervention').should('be.visible');

    // Check Access
    cy.getBySel(`enter-intervention-${index}`).click();
    cy.wait('@getSessionQuestionGroups');
    cy.logout();
    cy.answerPage();
    cy.contains('Start session').should('be.visible');
  });
});
