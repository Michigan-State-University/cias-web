/* eslint no-unused-expressions: 0 */ // --> OFF

const { ADMIN_EMAIL, ADMIN_PASSWORD } = require('../../support/envVariables');

const loginAddress = `/login`;

describe('Login test', () => {
  beforeEach(() => {
    cy.visit(loginAddress);
  });

  it('Should display correct errors', () => {
    cy.get('button').click();
    expect(cy.contains('Email is required')).to.exist;
    expect(cy.contains('Password is required')).to.exist;
  });

  it('Should display error on invalid email', () => {
    cy.get('input[name=email]')
      .type('some-name')
      .blur();
    expect(cy.contains('Provide valid email')).to.exist;
  });

  it('Should login correctly', () => {
    cy.get('input[name=email]')
      .type(Cypress.env(ADMIN_EMAIL))
      .blur();
    cy.get('input[name=password]')
      .type(Cypress.env(ADMIN_PASSWORD))
      .blur();
    cy.get('button').click();
    expect(cy.contains('My Dashboard')).to.exist;
  });
});
