import { RoutePath } from 'global/constants';

import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../../support/envVariables';
import { questionTypes } from '../../fixtures/fixtures';
import { CREATE_QUESTION, UPDATE_QUESTION } from '../../support/aliases';

describe('Create Intervention by Admin', () => {
  const index = 0;
  beforeEach(() => {
    cy.server();
    cy.createAlias(CREATE_QUESTION);
    cy.createAlias(UPDATE_QUESTION);

    cy.login(Cypress.env(ADMIN_EMAIL), Cypress.env(ADMIN_PASSWORD));
  });
  it('Create Intervention by Admin tests', () => {
    cy.visit(RoutePath.DASHBOARD);
    // Create session and session
    cy.createIntervention();
    cy.createSessionsInIntervention(1);

    // Enter to session
    cy.getBySel(`enter-session-${index}`).click();
    cy.url().should('include', '/edit');

    // Change website size
    cy.getBySel('questions-list').should('not.exist');
    cy.viewport(1500, 750);
    cy.getBySel('questions-list').should('be.visible');

    // Create questions
    cy.populateSessionWithQuestions(questionTypes, {});

    // Check variables in branching
    cy.getBySel('back-intervention-button').click();
    cy.getBySel('branching-intervention-toggle').check({ force: true });
    cy.contains('Add variable').click({ force: true });
    cy.getBySel('question-variable-chooser').should('have.length', 7);
  });
});
