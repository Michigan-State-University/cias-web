import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../../support/envVariables';
import { questionTypes } from '../../fixtures/fixtures';

describe('Create Intervention by Admin', () => {
  const index = 0;
  beforeEach(() => {
    cy.server();
    cy.login(Cypress.env(ADMIN_EMAIL), Cypress.env(ADMIN_PASSWORD));
  });
  it('Create Intervention by Admin tests', () => {
    cy.visit('/');
    // Create intervention and session
    cy.createIntervention();
    cy.createSessionsInIntervention(1);

    // Enter to session
    cy.getBySel(`enter-intervention-${index}`).click();
    cy.url().should('include', '/edit');

    // Add single question
    cy.getBySel('add-screen-button').click({ force: true });
    cy.contains('Single answer').click();

    // Change website size
    cy.getBySel('questions-list').should('not.exist');
    cy.viewport(1500, 750);
    cy.getBySel('questions-list').should('be.visible');

    // Create questions
    cy.populateSessionWithQuestions(0, questionTypes);

    // Check variables in branching
    cy.getBySel('back-problem-button').click();
    cy.getBySel('branching-problem-toggle').check({ force: true });
    cy.contains('Add variable').click({ force: true });
    cy.getBySel('question-variable-chooser').should('have.length', 7);
  });
});
