it('loads login page', () => {
  cy.visit('/');
  cy.contains('Hi welcome to my fun github app!');
});
