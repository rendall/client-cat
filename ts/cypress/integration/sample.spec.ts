/// <reference types="cypress" />
describe('Basic functionality', function() {
  it('Visits and clicks', function() {
    // cy.visit('https://focused-hopper-524564.netlify.com/')
    cy.visit('localhost:3000')
    cy.get('button.Item').first().click()
    cy.get('.Card').should('to.exist')

    cy.get('button.Card-Button--close').first().click()
    cy.get('.Card').should('to.not.exist')

  })
})