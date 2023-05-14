describe('Form', () => {
  it('Be-visible ', () => {
    cy.visit('/');

    cy.get('input[type="text"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
    cy.contains('Get Issues').should('be.visible');

  })

  it('submit form', () => {
    cy.visit('/');

    const url = 'facebook/react'
    cy.get('input[type="text"]').type(url)
    cy.get('button[type="submit"]').click()
    cy.get('.ant-row').should('exist')
    cy.get('.cypress').should('have.length', 3);
  })

  it('Form invalid', () => {
    cy.visit('/');
    const url = 'invalid-url'
    cy.get('input[type="text"]').type(url)
    cy.get('button[type="submit"]').click()
    cy.contains('Please enter a valid GitHub repository URL in the format username/repo')
  })

  it('GitHub not found', () => {
    cy.visit('/');  

    const invalidRepo = 'invalid/invalid-repo';
    cy.get('input[type="text"]').type(invalidRepo);
    cy.get('button[type="submit"]').click();
    cy.contains('Failed to fetch issues. Please check your repository URL.');
  })
})
