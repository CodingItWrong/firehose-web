describe('unread links', () => {
  beforeEach(() => {
    cy.intercept('POST', 'http://localhost:3000/api/oauth/token', {
      fixture: 'session.json',
    });
    cy.intercept(
      'GET',
      'http://localhost:3000/api/bookmarks?filter[read]=false&',
      {fixture: 'bookmarks.json'},
    ).as('loadBookmarks');
    cy.intercept('POST', 'http://localhost:3000/api/bookmarks?').as(
      'addBookmark',
    );
    cy.intercept('PATCH', 'http://localhost:3000/api/bookmarks/1?').as(
      'updateBookmark',
    );
    cy.intercept('DELETE', 'http://localhost:3000/api/bookmarks/1').as(
      'deleteBookmark',
    );
  });

  it('allows listing, adding, and marking bookmarks as read', () => {
    cy.visit('/');

    // sign in
    cy.getTestId('email-field').type('example@example.com');
    cy.getTestId('password-field').type('password');
    cy.getTestId('sign-in-button').click();

    // list links
    cy.getTestId('bookmarks-list').contains('React Native');

    // add bookmark
    cy.getTestId('url-to-add-field').type('https://codingitwrong.com{enter}');
    cy.wait('@addBookmark');

    // mark bookmark read
    cy.getTestId('mark-read-button').click();
    cy.wait('@updateBookmark')
      .its('request.body')
      .should('deep.equal', {
        data: {
          type: 'bookmarks',
          id: '1',
          attributes: {read: true},
        },
      });

    // delete bookmark
    cy.getTestId('delete-button').click();
    cy.wait('@deleteBookmark');
  });
});
