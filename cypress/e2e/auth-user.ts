export default function authUser() {
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
}
