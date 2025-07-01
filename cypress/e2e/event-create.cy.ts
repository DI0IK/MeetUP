describe('event creation', () => {
  it('loads', () => {
    cy.login();

    cy.visit('http://127.0.0.1:3000/events/new');
    cy.getBySel('event-form').should('exist');
    cy.getBySel('event-form').within(() => {
      cy.getBySel('event-name-input').should('exist');
      cy.getBySel('event-start-time-picker').should('exist');
      cy.getBySel('event-end-time-picker').should('exist');
      cy.getBySel('event-location-input').should('exist');
      cy.getBySel('event-description-input').should('exist');
      cy.getBySel('event-save-button').should('exist');
    });
  });

  it('creates an event', () => {
    cy.login();
    cy.visit(
      'http://127.0.0.1:3000/events/new?start=2025-07-01T01:00:00.000Z&end=2025-07-01T04:30:00.000Z',
    );

    cy.getBySel('event-form').should('exist');
    cy.getBySel('event-form').within(() => {
      cy.getBySel('event-name-input').type('Cypress Test Event');
      cy.getBySel('event-location-input').type('Cypress Park');
      cy.getBySel('event-description-input').type(
        'This is a test event created by Cypress.',
      );
      cy.getBySel('event-save-button').click();
    });
    cy.wait(1000);
    cy.visit('http://127.0.0.1:3000/events');
    cy.getBySel('event-list-entry').should('exist');
    cy.getBySel('event-list-entry')
      .contains('Cypress Test Event')
      .should('exist');
    cy.getBySel('event-list-entry').contains('Cypress Park').should('exist');
  });
});
