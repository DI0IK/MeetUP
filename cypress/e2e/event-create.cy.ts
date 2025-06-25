import authUser from './auth-user';

describe('event creation', () => {
  it('loads', () => {
    authUser();

    // cy.visit('http://127.0.0.1:3000/events/new'); // TODO: Add event creation tests
  });
});
