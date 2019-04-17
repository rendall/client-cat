/// <reference types="cypress" />
describe('Basic functionality', function() {
  beforeEach(function() {
    // cy.visit('https://focused-hopper-524564.netlify.com/')
    cy.visit('localhost:3000')
  })

  it('Clicks a card and closes a card', function() {
    cy.get('button.Item').first().click()
    cy.get('.Card').should('to.exist')

    cy.get('button.Card-Button--close').first().click()
    cy.get('.Card').should('to.not.exist')

  })

  it('Searches', function() {
    cy.get('input.Search-Field').type("bobtail")
    cy.get('.Item-Name').should('contain', 'Bobtail')
  })

  it('Filters', function() {
    cy.get('.Filter-Item').contains('Australia').click()
    cy.get('.Item-Name').first().should('have.text', 'Australian Mist')
  })
})