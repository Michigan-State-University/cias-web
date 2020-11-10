import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../../support/envVariables';

describe('Create Intervention by Admin', () => {
  before(() => cy.login(Cypress.env(ADMIN_EMAIL), Cypress.env(ADMIN_PASSWORD)));

  it('Test to delete', () => {
    cy.visit('/');
  });
});
