
describe("Testing", () => {
  Array(10).fill(0).forEach((val, i) => {
    it(`test ${i}`, () => {
      cy.intercept('https://jsonplaceholder.typicode.com/todos/1', { times: 1 }, { title: 'baz' }).as('getTodo')
      cy.intercept('https://jsonplaceholder.typicode.com/todos/1', { times: 1 }, { title: 'bar' }).as('getTodo')
      cy.intercept('https://jsonplaceholder.typicode.com/todos/1', { times: 1 }, { title: 'foo' }).as('getTodo')
      cy.visit('/')
      cy.wait('@getTodo')
      cy.wait('@getTodo')
      cy.wait('@getTodo')

      cy.get('#api-response-list li')
        .first().should('have.text', 'foo')
        .next().should('have.text', 'bar')
        .next().should('have.text', 'baz')
    })
  })
})
