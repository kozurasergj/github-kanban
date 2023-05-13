import 'cypress-drag-drop';

describe('Drag and Drop', () => {
  it('can drag and drop a card', () => {
    cy.visit('/');
    const url = 'facebook/react';
    cy.get('input[type="text"]').type(url).then(() => {
      cy.get('button[type="submit"]').click().then(() => {
        cy.get('.ant-card').then(() => {
          cy.get('.ant-card').drag('.ant-col');
        })
      })
    })
  })
});
