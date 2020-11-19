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
    login(email: string, password: string): Chainable<void>;

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
    createSessionsInIntervention(numberOfSession: number): void;

    /**
     * Add questions to session
     */
    populateSessionWithQuestions(
      questionTypesToPopulate: string[],
      options: object,
    ): void;

    /**
     * Dismiss all react-toastify toasts
     */
    dismissAllToasts(): void;

    /**
     * Answer questions
     */
    answerQuestions(answers): void;

    /**
     * Redirect to answer page
     */
    answerPage(): Chainable<void>;

    /**
     * Creates alias for a given string. Aliases are placed in `cypress/support/aliases.js`
     */
    createAlias(alias: string): void;

    /**
     * Open specified Settings Tab. `index` starts from `0`.
     */
    openSettingsTab(index: number): Chainable<JQuery<HTMLElement>>;

    /**
     * Set up branching
     */
    setUpBranching(formula: string, cases: object): void;
  }
}
