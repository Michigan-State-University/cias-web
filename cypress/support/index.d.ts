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
     * Get item by selector*
     */
    login(email, password): Chainable<void>;

    /**
     * Dismiss all react-toastify toasts
     */
    dismissAllToasts(): void;
  }
}
