describe('Drag and Drop', () => {
  it('can drag and drop a card', () => {
    cy.visit('/');
    const url = 'facebook/react';

    cy.get('input[type="text"]').type(url);
    // cy.get('button[type="submit"]').click().then(() => {
    //   cy.get('.cypress').should('have.length', 3);
    //   cy.get('.ant-card').first().as('card');
    //   cy.get('.cypress').last().as('column');
    //   cy.get('@card').trigger('dragstart');
    //   cy.get('@column').trigger('dragover');
    //   cy.get('@column').trigger('drop');
    // });
  });
});
