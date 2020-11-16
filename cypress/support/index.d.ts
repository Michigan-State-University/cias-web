/// <reference types="cypress" />
/*
 * In this file add TypeScript definitions of custom commands to provide intellisense
 * */

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Get item by selector
     */
    getBySel(selector: string, ...args): Chainable<any>;

    /**
     * Get item by selector*
     */
    getBySelLike(selector: string, ...args): Chainable<any>;

    /**
     * Login to CIAS
     */
    login(email, password): Chainable<void>;

    /**
     * Logout from CIAS
     */
    logout(): void;

    /**
     * Create intervention
     */
    createIntervention(): void;

    /**
     * Create sessions in intervention
     */
    createSessionsInIntervention(numberOfSession): void;

    /**
     * Add questions to session
     */
    populateSessionWithQuestions(index, questionTypesToPopulate): void;

    /**
     * Dismiss all react-toastify toasts
     */
    dismissAllToasts(): void;
  }
}
