describe('sign in', () => {
  beforeEach(() => {
    cy.intercept('POST', 'http://localhost:3000/api/oauth/token', {
      fixture: 'session.json',
    });
    cy.intercept(
      'GET',
      'http://localhost:3000/api/bookmarks?filter[read]=false&',
      {fixture: 'bookmarks/unread.json'},
    );
    cy.intercept('PATCH', 'http://localhost:3000/api/bookmarks/1?').as(
      'markBookmarkRead',
    );
  });

  it('allows signing in and signing out', () => {
    cy.visit('/');

    // sign in
    cy.getTestId('email-field').type('example@example.com');
    cy.getTestId('password-field').type('password');
    cy.getTestId('sign-in-button').click();

    // sign out
    cy.getTestId('sign-out-button').click();

    // sign in
    cy.getTestId('sign-in-button');
  });
});
