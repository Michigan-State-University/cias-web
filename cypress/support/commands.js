// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import LocalStorageService from 'utils/localStorageService';
import { mapCurrentUser } from 'utils/mapResponseObjects';
import { headersConst } from 'utils/getHeaders';
import { API_URL } from './envVariables';
import { questionTypes, noVarQuestionTypes } from '../fixtures/fixtures';

Cypress.Commands.add('getBySel', (selector, ...args) =>
  cy.get(`[data-cy=${selector}]`, ...args),
);

Cypress.Commands.add('getBySelLike', (selector, ...args) =>
  cy.get(`[data-cy*=${selector}]`, ...args),
);

Cypress.Commands.add('login', (email, password) =>
  cy
    .request('POST', `${Cypress.env(API_URL)}/v1/auth/sign_in`, {
      email,
      password,
    })
    .then(({ body: { data }, headers }) => {
      const user = mapCurrentUser(data);
      LocalStorageService.setState(user);
      LocalStorageService.setHeaders({
        ...headersConst,
        'access-token': headers['access-token'],
        client: headers.client,
        uid: headers.uid,
      });
    }),
);

Cypress.Commands.add('logout', () => {
  LocalStorageService.clearState();
  LocalStorageService.clearHeaders();
});

Cypress.Commands.add('createIntervention', () => {
  cy.visit('/');
  cy.getBySel('create-problem-button').click();
});

Cypress.Commands.add('createSessionsInIntervention', (numberOfSession = 1) => {
  cy.route('POST', '**/problems/*/interventions').as('createSession');
  for (let i = 0; i < numberOfSession; i += 1) {
    cy.getBySel('create-intervention-button').click();
    cy.wait('@createSession');
    cy.get('@createSession').should('have.property', 'status', 201);
  }
});

Cypress.Commands.add(
  'populateSessionWithQuestions',
  (index, questionTypesToPopulate = questionTypes) => {
    questionTypesToPopulate.forEach((questionType, questionIndex) => {
      cy.getBySel('add-screen-button').click({ force: true });
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
  },
);

Cypress.Commands.add('dismissAllToasts', () => {
  cy.get('.Toastify__close-button').click({ multiple: true, force: true });
});
