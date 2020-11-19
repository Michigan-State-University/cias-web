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
import forEach from 'lodash/forEach';
import LocalStorageService from 'utils/localStorageService';
import { mapCurrentUser } from 'utils/mapResponseObjects';
import { headersConst } from 'utils/getHeaders';
import { API_URL } from './envVariables';
import { ALIASES, ANSWER_QUESTION, CREATE_QUESTION } from './aliases';
import { questionTypes, noVarQuestionTypes } from '../fixtures/fixtures';
import { answerQuestionByType } from './utils';

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

const defaultOptions = {
  variablePrefix: '',
  questionDetails: () => {},
};

Cypress.Commands.add(
  'populateSessionWithQuestions',
  (questionTypesToPopulate = questionTypes, options) => {
    const mergedOptions = { ...defaultOptions, ...options };
    const { variablePrefix, questionDetails } = mergedOptions;
    forEach(questionTypesToPopulate, (questionType, questionIndex) => {
      cy.getBySel('add-screen-button').click({ force: true });
      cy.getBySel('question-type-chooser').within(() => {
        cy.contains(questionType).click({ force: true });
      });
      cy.wait([CREATE_QUESTION]).then(() => questionDetails(questionIndex));
      // Create variable
      if (!noVarQuestionTypes.includes(questionType))
        cy.get('input[placeholder="Variable name..."]').each(
          ($input, inputIndex) => {
            if (questionIndex === inputIndex)
              cy.wrap($input)
                .clear()
                .type(`${variablePrefix}${questionIndex}`)
                .blur();
          },
        );
    });
  },
);

Cypress.Commands.add('dismissAllToasts', () => {
  cy.get('.Toastify__close-button').click({ multiple: true, force: true });
});

Cypress.Commands.add('answerPage', () =>
  cy.url().then(url => cy.visit(url.replace('edit', 'fill'))),
);

Cypress.Commands.add('answerQuestions', answers => {
  cy.answerPage().then(() => {
    cy.contains('Start session')
      .click({ force: true })
      .then(() => {
        answers.forEach(answer => {
          answerQuestionByType(answer);
          cy.getBySel('continue-button').click();
          cy.wait([ANSWER_QUESTION]);
        });
      });
  });
});

Cypress.Commands.add('createAlias', alias => {
  const { METHOD, URL, ALIAS } = ALIASES[alias];

  cy.route(METHOD, URL).as(ALIAS);
});

Cypress.Commands.add('openSettingsTab', index =>
  cy.getBySel('settings-panel').within(() => {
    cy.getBySel('tabs')
      .children()
      .eq(index)
      .click();
  }),
);

Cypress.Commands.add('setUpBranching', (formula, cases) => {
  cy.openSettingsTab(2);

  cy.getBySel('text-area')
    .type(formula)
    .blur();

  cases.forEach(({ sign, value, screen: { group, title } }, index) => {
    cy.contains('Add case').click();
    cy.getBySel('case-select')
      .last()
      .click()
      .contains(sign)
      .click({ force: true });
    cy.getBySel('case-value-input')
      .last()
      .type(value)
      .blur();
    cy.getBySel(`select-question-${index}`).click({ force: true });
    cy.getBySel(`select-question-${index}`).click({ force: true });
    cy.getBySel(`"select-group-branching-${group}"`)
      .last()
      .click();
    cy.getBySel(`"choose-question-${title}"`)
      .last()
      .click();
  });
});
