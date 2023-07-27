import { RoutePath } from 'global/constants';

import { UPDATE_QUESTION } from '../../support/aliases';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../../support/envVariables';

describe('Send emails', () => {
  beforeEach(() => {
    cy.server();

    cy.login(Cypress.env(ADMIN_EMAIL), Cypress.env(ADMIN_PASSWORD));
  });

  it('Should add participant to list of sent emails', () => {
    // alias requests so that they can be awaited and checked for success
    cy.createAlias(UPDATE_QUESTION);
    cy.route('PATCH', '**/interventions/*').as('updateIntervention');
    cy.route('POST', '**/interventions/*/sessions').as('createSession');
    cy.route('GET', '**/sessions/*/invitations').as('getSessionInvitations');
    cy.route('POST', '**/sessions/*/invitations').as('addSessionInvitations');
    cy.route('GET', '**/sessions/*/invitations/*/resend').as(
      'resendSessionInvitation',
    );
    cy.route('GET', '**/sessions/*/question_groups').as(
      'getSessionQuestionGroups',
    );

    cy.visit(RoutePath.DASHBOARD);

    // Create session and 2 sessions
    cy.getBySel('create-intervention-button').click();
    cy.getBySel('create-session-button').click();
    cy.wait('@createSession');
    cy.get('@createSession').should('have.property', 'status', 201);
    cy.getBySel('create-session-button').click();
    cy.wait('@createSession');
    cy.get('@createSession').should('have.property', 'status', 201);

    // check that modal cannot be opened for not published session
    cy.getBySel('share-session-modal-open-button-0').click();
    cy.getBySel('send-email-button').should('not.exist');

    // publish session
    cy.getBySel('publish-session-button').click();
    cy.getBySel('confirmation-box-confirm-button').click();
    cy.wait('@updateIntervention');
    cy.get('@updateIntervention').should('have.property', 'status', 200);

    // open sharing modal for 1st session
    cy.getBySel('share-session-modal-open-button-0').click();
    cy.wait('@getSessionInvitations');

    // type and send email from system to share
    cy.get('input[class*="HiddenInput"]')
      .type('participant@cias-api.herokuapp.com ')
      .blur();
    cy.getBySel('send-email-button').click();

    // type and send email outside system to share
    cy.get('input[class*="HiddenInput"]')
      .type('participant@cias-api-fake.herokuapp.com ')
      .blur();
    cy.getBySel('send-email-button').click();
    cy.wait(['@addSessionInvitations', '@addSessionInvitations']);
    cy.get('@addSessionInvitations.all').each((response) => {
      expect(response).to.have.property('status', 201);
    });

    // check if emails were added to the list
    cy.getBySel('user-list').children().should('have.length', 2);

    // should resend all emails
    cy.getBySel('user-list-item-0')
      .get('button[class*="StyledTextButton"]')
      .invoke('attr', 'style', 'display: block')
      .click({ multiple: true });
    cy.wait(['@resendSessionInvitation', '@resendSessionInvitation']);
    cy.get('@resendSessionInvitation.all').each((response) => {
      expect(response).to.have.property('status', 200);
    });

    // dismiss all toasts before closing a modal (it overlaps with a close button)
    cy.dismissAllToasts();

    // close modal
    cy.getBySel('modal-close-button').click({ force: true });

    // open sharing modal for 2nd session
    cy.getBySel('share-session-modal-open-button-1').click();
    cy.wait('@getSessionInvitations');
    cy.wait('@getSessionQuestionGroups');
    cy.get('@getSessionInvitations').should('have.property', 'status', 200);

    // check that emails were not added
    cy.getBySel('user-list').should('not.exist');
  });
});
