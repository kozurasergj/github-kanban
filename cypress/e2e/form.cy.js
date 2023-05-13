describe('Form', () => {
  it('Be-visible ', () => {
    cy.visit('/')

    cy.get('input[type="text"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
    cy.contains('Get Issues').should('be.visible');

  })

  it('submit form', () => {
    cy.visit('/')

    const url = 'facebook/react'
    cy.get('input[type="text"]').type(url)
    cy.get('button[type="submit"]').click()
    cy.get('.ant-row').should('exist')
    cy.get('.cypress').should('have.length', 3);
  })

  it('Form invalid', () => {
    cy.visit('/')

    const url = 'invalid-url'
    cy.get('input[type="text"]').type(url)
    cy.get('button[type="submit"]').click()
    cy.contains('Please enter a valid GitHub repository URL in the format username/repo')
  })

  it('GitHub not found', () => {
    cy.visit('/')

    const invalidRepo = 'invalid/invalid-repo';
    cy.get('input[type="text"]').type(invalidRepo);
    cy.get('button[type="submit"]').click();
    cy.contains('Failed to fetch issues. Please check your repository URL.');
  })
})

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// cy.visit(url) - перейти на страницу по указанному URL.

// cy.get(selector) - найти элемент на странице по CSS - селектору.

//     cy.contains(text) - найти элемент на странице по тексту.

//       cy.click() - кликнуть на элемент.

//         cy.type(text) - ввести текст в элемент(например, в поле ввода).

//           cy.wait(time) - остановить выполнение теста на указанное время(в миллисекундах).

//             cy.reload() - перезагрузить страницу.

//               cy.url() - получить текущий URL страницы.

//                 cy.getCookie(name) - получить значение cookie по имени.

//                   cy.setCookie(name, value) - установить значение cookie.

//                     cy.clearCookie(name) - удалить cookie по имени.

//                       cy.screenshot() - сделать скриншот страницы и сохранить его.

//                         cy.contains(selector, text) - найти элемент с указанным текстом внутри другого элемента, найденного по CSS - селектору.

//                           cy.get(selector).should('be.visible') - проверить, что элемент видим на странице.

//                             cy.get(selector).should('have.class', className) - проверить, что элемент имеет указанный CSS - класс.

//                               cy.get(selector).should('have.text', text) - проверить, что элемент содержит указанный текст.

//                                 cy.get(selector).should('have.value', value) - проверить, что значение элемента равно указанному.

//                                   cy.get(selector).should('have.attr', attribute, value) - проверить, что элемент имеет указанный атрибут со значением.