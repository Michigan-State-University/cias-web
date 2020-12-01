/* eslint no-unused-expressions: 0 */ // --> OFF

import { singleQuestion } from 'models/Session/QuestionTypes';
import {
  CREATE_QUESTION,
  GET_SESSION_QUESTION_GROUPS,
  UPDATE_INTERVENTION,
  GET_PROBLEM_INTERVENTIONS,
  UPDATE_QUESTION,
} from '../../support/aliases';
const {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  RESEARCHER_EMAIL,
  RESEARCHER_PASSWORD,
  PARTICIPANT_EMAIL,
  PARTICIPANT_PASSWORD,
} = require('../../support/envVariables');
const index = 0;

describe('Access settings', () => {
  beforeEach(() => {
    cy.server();
    cy.viewport(1500, 750);
    cy.createAlias(CREATE_QUESTION);
    cy.createAlias(GET_SESSION_QUESTION_GROUPS);
    cy.createAlias(UPDATE_INTERVENTION);
    cy.createAlias(GET_PROBLEM_INTERVENTIONS);
    cy.createAlias(UPDATE_QUESTION);
    cy.login(Cypress.env(ADMIN_EMAIL), Cypress.env(ADMIN_PASSWORD));
    cy.createIntervention();
    cy.createSessionsInIntervention(1);
    cy.getBySel(`enter-session-${index}`).click();
    cy.populateSessionWithQuestions([singleQuestion.name], {});
    cy.getBySel('back-intervention-button').click();

    cy.route('PATCH', '**/interventions/*').as('updateIntervention');
    cy.route('GET', '**/sessions/*/question_groups').as(
      'getSessionQuestionGroups',
    );
  });

  it('Access settings test - not published', () => {
    cy.getBySel(`enter-session-${index}`).click();

    // Check Access logged in admin
    cy.answerPage();
    cy.contains('Start session').should('be.visible');

    // Check Access logged in participant
    cy.login(Cypress.env(PARTICIPANT_EMAIL), Cypress.env(PARTICIPANT_PASSWORD));
    cy.answerPage();
    cy.contains('404').should('be.visible');

    // Check Access logged in researcher
    cy.login(Cypress.env(RESEARCHER_EMAIL), Cypress.env(RESEARCHER_PASSWORD));
    cy.answerPage();
    cy.contains('404').should('be.visible');

    // Check Access not logged in user
    cy.logout();
    cy.answerPage();
    cy.contains('404').should('be.visible');
  });

  it('Access settings test - anyone with link', () => {
    // Select access
    cy.getBySel('access-anyone-radio').should('be.visible');

    // Publish Intervention
    cy.contains('Publish Intervention').click();
    cy.contains('Confirm').click({ force: true });
    cy.wait('@updateIntervention');
    cy.contains('Close Intervention').should('be.visible');

    // Check Access logged in admin
    cy.getBySel(`enter-session-${index}`).click();
    cy.wait('@getSessionQuestionGroups');
    cy.answerPage();
    cy.contains('Start session').should('be.visible');

    // Check Access logged in participant
    cy.login(Cypress.env(PARTICIPANT_EMAIL), Cypress.env(PARTICIPANT_PASSWORD));
    cy.answerPage();
    cy.contains('Start session').should('be.visible');

    // Check Access logged in researcher
    cy.login(Cypress.env(RESEARCHER_EMAIL), Cypress.env(RESEARCHER_PASSWORD));
    cy.answerPage();
    cy.contains('404').should('be.visible');

    // Check Access not logged in user
    cy.logout();
    cy.answerPage();
    cy.contains('Start session').should('be.visible');
  });

  it('Access settings test - any registered participant', () => {
    // Select access
    cy.reload();
    cy.wait([
      GET_SESSION_QUESTION_GROUPS,
      GET_PROBLEM_INTERVENTIONS,
      UPDATE_QUESTION,
    ]);
    cy.contains('Any registered participant').click({ force: true });
    cy.getBySel('access-registered-radio').should('be.visible');

    // Publish Intervention
    cy.contains('Publish Intervention').click({ force: true });
    cy.contains('Confirm').click({ force: true });
    cy.wait([UPDATE_INTERVENTION, GET_PROBLEM_INTERVENTIONS]);
    cy.contains('Close Intervention').should('be.visible');

    // Check Access logged in admin
    cy.getBySel(`enter-session-${index}`).click();
    cy.wait('@getSessionQuestionGroups');
    cy.answerPage();
    cy.contains('Start session').should('be.visible');

    // Check Access logged in participant
    cy.login(Cypress.env(PARTICIPANT_EMAIL), Cypress.env(PARTICIPANT_PASSWORD));
    cy.answerPage();
    cy.contains('Start session').should('be.visible');

    // Check Access logged in researcher
    cy.login(Cypress.env(RESEARCHER_EMAIL), Cypress.env(RESEARCHER_PASSWORD));
    cy.answerPage();
    cy.contains('404').should('be.visible');

    // Check Access not logged in user
    cy.logout();
    cy.answerPage();
    cy.contains('404').should('be.visible');
  });

  it('Access settings test - selected participant', () => {
    // Select access
    cy.reload();
    cy.getBySel('access-anyone-radio').should('be.visible');
    cy.wait([GET_SESSION_QUESTION_GROUPS, GET_PROBLEM_INTERVENTIONS]);
    cy.contains('Specific registered participants').click({ force: true });
    cy.wait([UPDATE_INTERVENTION, GET_PROBLEM_INTERVENTIONS]);
    cy.getBySel('access-invited-radio').should('be.visible');
    cy.getBySel('hidden-input').type(
      `${Cypress.env(PARTICIPANT_EMAIL)}{enter}`,
    );
    cy.contains('Enable access').click();

    // Publish Intervention
    cy.contains('Publish Intervention').click({ force: true });
    cy.contains('Confirm').click({ force: true });
    cy.wait('@updateIntervention');
    cy.contains('Close Intervention').should('be.visible');

    // Check Access logged in admin
    cy.getBySel(`enter-session-${index}`).click();
    cy.wait('@getSessionQuestionGroups');
    cy.answerPage();
    cy.contains('Start session').should('be.visible');

    // Check Access logged in participant
    cy.login(Cypress.env(PARTICIPANT_EMAIL), Cypress.env(PARTICIPANT_PASSWORD));
    cy.answerPage();
    cy.contains('Start session').should('be.visible');

    // Check Access logged in researcher
    cy.login(Cypress.env(RESEARCHER_EMAIL), Cypress.env(RESEARCHER_PASSWORD));
    cy.answerPage();
    cy.contains('404').should('be.visible');

    // Check Access not logged in user
    cy.logout();
    cy.answerPage();
    cy.contains('404').should('be.visible');
  });
});
