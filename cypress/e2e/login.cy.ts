describe('login and register', () => {
  it('loads', () => {
    cy.visit('http://127.0.0.1:3000/');

    cy.getBySel('login-header').should('exist');
  });

  it('shows register form', () => {
    cy.visit('http://127.0.0.1:3000/');

    cy.getBySel('register-switch').click();

    cy.getBySel('register-form').should('exist');
    cy.getBySel('first-name-input').should('exist');
    cy.getBySel('last-name-input').should('exist');
    cy.getBySel('email-input').should('exist');
    cy.getBySel('username-input').should('exist');
    cy.getBySel('password-input').should('exist');
    cy.getBySel('confirm-password-input').should('exist');
    cy.getBySel('register-button').should('exist');
  });

  it('allows to register', async () => {
    cy.visit('http://127.0.0.1:3000/');

    cy.getBySel('register-switch').click();

    cy.getBySel('first-name-input').type('Test');
    cy.getBySel('last-name-input').type('User');
    cy.getBySel('email-input').type('test@example.com');
    cy.getBySel('username-input').type('testuser');
    cy.getBySel('password-input').type('Password123!');
    cy.getBySel('confirm-password-input').type('Password123!');
    cy.getBySel('register-button').click();
    cy.getBySel('login-header').should('exist');
    cy.getBySel('login-form').should('exist');
    cy.getBySel('email-input').should('exist');
    cy.getBySel('password-input').should('exist');
    cy.getBySel('login-button').should('exist');
    cy.getBySel('email-input').type('test@example.com');
    cy.getBySel('password-input').type('Password123!');
    cy.getBySel('login-button').click();
    cy.url().should('include', '/home');
  });
});
