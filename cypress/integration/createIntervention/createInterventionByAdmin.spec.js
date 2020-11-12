import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../../support/envVariables';
import { questionTypes, noVarQuestionTypes } from '../../fixtures/fixtures';

describe('Create Intervention by Admin', () => {
  const index = 0;
  beforeEach(() =>
    cy.login(Cypress.env(ADMIN_EMAIL), Cypress.env(ADMIN_PASSWORD)),
  );
  it('Create Intervention by Admin tests', () => {
    cy.visit('/');
    // Create intervention and session
    cy.getBySel('create-problem-button').click();
    cy.getBySel('create-intervention-button').click();

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
    questionTypes.forEach((questionType, questionIndex) => {
      cy.getBySel('add-screen-button').click();
      cy.contains(questionType).click();
      cy.contains(questionType).should('be.visible');

      // Create variable
      if (!noVarQuestionTypes.includes(questionType))
        cy.get('input[placeholder="Variable name..."]').each(
          ($input, inputIndex) => {
            if (questionIndex === inputIndex)
              cy.wrap($input)
                .clear()
                .type(`${questionIndex}`)
                .blur();
          },
        );
    });

    // Check variables in branching
    cy.getBySel('back-problem-button').click();
    cy.getBySel('branching-problem-toggle').check({ force: true });
    cy.contains('Add variable').click();
    cy.getBySel('question-variable-chooser').should('have.length', 7);
  });
});
