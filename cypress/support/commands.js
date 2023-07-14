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

import { RoutePath } from 'global/constants';

import LocalStorageService from 'utils/localStorageService';
import { mapCurrentUser } from 'utils/mapResponseObjects';
import { headersConst } from 'utils/getHeaders';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import objectToCamelKebabCase from 'utils/objectToCamelKebabCase';
import { API_URL } from './envVariables';
import {
  ALIASES,
  ANSWER_QUESTION,
  CREATE_QUESTION,
  UPDATE_QUESTION,
} from './aliases';
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
    .then(({ body: { data }, headers, status }) => {
      const user = mapCurrentUser(data);
      LocalStorageService.setState(user);

      const kebabCamelCaseHeaders = objectToCamelKebabCase(headers);
      LocalStorageService.setHeaders({
        ...headersConst,
        'Access-Token': kebabCamelCaseHeaders['Access-Token'],
        Client: kebabCamelCaseHeaders.Client,
        Uid: kebabCamelCaseHeaders.Uid,
      });
      expect(status).to.eq(201);
    }),
);

Cypress.Commands.add('logout', () => {
  LocalStorageService.clearState();
  LocalStorageService.clearHeaders();
});

Cypress.Commands.add('createIntervention', () => {
  cy.visit(RoutePath.DASHBOARD);
  cy.getBySel('create-intervention-button').click();
});

Cypress.Commands.add('createSessionsInIntervention', (numberOfSession = 1) => {
  cy.route('POST', '**/interventions/*/sessions').as('createSession');
  for (let i = 0; i < numberOfSession; i += 1) {
    cy.getBySel('create-session-button').click();
    cy.wait('@createSession');
    cy.get('@createSession').should('have.property', 'status', 201);
  }
});

const defaultOptions = {
  variablePrefix: '',
  questionDetails: () => {},
  removeReadQuestionBlock: false,
};

Cypress.Commands.add(
  'populateSessionWithQuestions',
  (questionTypesToPopulate = questionTypes, options) => {
    const mergedOptions = { ...defaultOptions, ...options };
    const { variablePrefix, questionDetails, removeReadQuestionBlock } =
      mergedOptions;
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
            if (questionIndex === inputIndex) {
              cy.wrap($input).clear().type(`${variablePrefix}${questionIndex}`);
            }
          },
        );

      if (removeReadQuestionBlock) {
        cy.openSettingsTab(1);
        cy.removeBlock(0);
        cy.openSettingsTab(0);
      }
    });
  },
);

Cypress.Commands.add('dismissAllToasts', () => {
  cy.get('.Toastify__close-button').click({ multiple: true, force: true });
});

Cypress.Commands.add('answerPage', () => {
  cy.url().then((url) => {
    if (url.includes('/edit')) {
      cy.wrap(url.replace('edit', 'fill')).as('answerPageUrl');
    }
    cy.get('@answerPageUrl').then((answerUrl) => cy.visit(answerUrl));
  });
});

Cypress.Commands.add('answerQuestions', (answers) => {
  cy.answerPage().then(() => {
    cy.contains('Start session')
      .click({ force: true })
      .then(() => {
        answers.forEach((answer) => {
          answerQuestionByType(answer);
          cy.getBySel('continue-button').click();
          cy.wait([ANSWER_QUESTION]);
        });
      });
  });
});

Cypress.Commands.add('createAlias', (alias) => {
  const { METHOD, URL, ALIAS } = ALIASES[alias];

  cy.route(METHOD, URL).as(ALIAS);
});

Cypress.Commands.add('openSettingsTab', (index) =>
  cy.getBySel('settings-panel').within(() => {
    cy.getBySel('tabs').children().eq(index).click();
  }),
);

Cypress.Commands.add('setUpBranching', (formula, cases) => {
  cy.openSettingsTab(2);

  cy.getBySel('text-area').type(formula).blur();

  cases.forEach(({ sign, value, screen, session }, index) => {
    cy.contains('Add case').click();
    cy.wait([UPDATE_QUESTION]);

    cy.getBySel('case-select')
      .last()
      .click()
      .contains(sign)
      .click({ force: true });
    cy.wait([UPDATE_QUESTION]);

    cy.getBySel('case-value-input').last().type(value);
    cy.wait([UPDATE_QUESTION]);

    cy.getBySel(`select-question-${index}`).click({ force: true });
    cy.getBySel(`select-question-${index}`).click({ force: true });
    cy.wait([UPDATE_QUESTION]);

    if (!isNullOrUndefined(screen)) {
      const { group, title } = screen;

      cy.getBySel(`"select-group-branching-${group}"`).last().click();
      cy.getBySel(`"choose-question-${title}"`).last().click();
      cy.wait([UPDATE_QUESTION]);
    } else if (!isNullOrUndefined(session)) {
      const { index: sessionIndex } = session;

      cy.getBySel('select-target-question-session-view-setter').click({
        force: true,
      });
      cy.getBySel(`choose-session-${sessionIndex}`).click();
      cy.wait([UPDATE_QUESTION]);
    }
  });
});

Cypress.Commands.add('removeBlock', (index) => {
  cy.getBySel('narrator-blocks').within(() => {
    cy.getBySel(`accordion-element-delete-${index}`).click();
    cy.wait([UPDATE_QUESTION]);
  });
});
