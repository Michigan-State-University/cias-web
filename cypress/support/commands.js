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

Cypress.Commands.add('dismissAllToasts', () => {
  cy.get('.Toastify__close-button').click({ multiple: true, force: true });
});
