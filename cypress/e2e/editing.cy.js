describe('unread links', () => {
  beforeEach(() => {
    cy.intercept('POST', 'http://localhost:3000/api/oauth/token', {
      fixture: 'session.json',
    });
    cy.intercept(
      'GET',
      'http://localhost:3000/api/bookmarks?filter[read]=false&',
      {fixture: 'bookmarks/unread.json'},
    );
    cy.intercept('GET', 'http://localhost:3000/api/bookmarks/1?', {
      fixture: 'bookmark.json',
    });
    cy.intercept('PATCH', 'http://localhost:3000/api/bookmarks/1?').as(
      'updateBookmark',
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

    // edit bookmark
    const url = 'https://apple.com';
    const title = 'Apple';
    const tags = 'computer';
    const source = 'The Woz';
    const comment = 'Think different.';

    cy.getTestId('edit-link').click();
    cy.getTestId('url-field').clear().type(url);
    cy.getTestId('title-field').clear().type(title);
    cy.getTestId('tags-field').clear().type(tags);
    cy.getTestId('source-field').clear().type(source);
    cy.getTestId('comment-field').clear().type(comment);
    cy.getTestId('save-button').click();
    cy.wait('@updateBookmark')
      .its('request.body')
      .should('deep.equal', {
        data: {
          type: 'bookmarks',
          id: '1',
          attributes: {url, title, source, comment, 'tag-list': tags},
        },
      });
  });
});
