/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args);
});

Cypress.Commands.add('getBySelLike', (selector, ...args) => {
  return cy.get(`[data-cy*=${selector}]`, ...args);
});

Cypress.Commands.add('login', () => {
  cy.session('auth', () => {
    cy.visit('http://127.0.0.1:3000/login');
    cy.getBySel('login-header').should('exist');
    cy.getBySel('login-form').should('exist');
    cy.getBySel('email-input').should('exist');
    cy.getBySel('password-input').should('exist');
    cy.getBySel('login-button').should('exist');
    cy.getBySel('email-input').type('cypress@example.com');
    cy.getBySel('password-input').type('Password123!');
    cy.getBySel('login-button').click();
    cy.url().should('include', '/home');
    cy.getBySel('header').should('exist');
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      getBySel(
        selector: string,
        ...args: any[]
      ): Chainable<JQuery<HTMLElement>>;
      getBySelLike(
        selector: string,
        ...args: any[]
      ): Chainable<JQuery<HTMLElement>>;
      login(): Chainable<void>;
    }
  }
}

export {};
