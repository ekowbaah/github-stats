const testUser = {
  userName: 'ekowcypresstest',
  token: '',
};

beforeEach(() => {
  cy.session([testUser.token], () => {
    cy.request({
      method: 'GET',
      url: 'https://api.github.com/user',
      auth: {
        user: testUser.userName,
        pass: testUser.token,
      },
    }).then(({ body }) => {
      window.localStorage.setItem('user', JSON.stringify(body));
      window.localStorage.setItem('access_token', testUser.token);
    });
  });
});

it('page loads', () => {
  cy.visit('/');
  cy.get('#repo-select').should('be.visible');
});

it('open repo select and drop down should contain values ', () => {
  cy.visit('/');
  cy.get('#repo-select').click();
  cy.get('tui-data-list').should('be.visible');
});

it('select first repo in drop down and show data', () => {
  cy.visit('/');
  cy.get('#repo-select').click();
  cy.get('tui-data-list').get('button').first().click();
  cy.get('#commit-list').should('be.visible');
  cy.get('#commit-stats').should('be.visible');
  cy.get('#repo-languages').should('be.visible');
});

it('click on first commit message and open commit page in new tab', () => {
  cy.visit('/');
  cy.get('#repo-select').click();
  cy.get('tui-data-list').get('button').first().click();
  cy.get('#commit-message').first().click();
});
