describe('Authenticate view', () => {
  it('Renders the unauthenticated app', () => {
    cy.visit('/')

    cy.findByLabelText(/adres email/i).should('exist')
  })

  it('Allows user to authenticate and logout', () => {
    cy.visit('/')

    cy.findByLabelText(/adres email/i).click().type('test@gmail.com')
    cy.findByLabelText(/hasło/i).click().type('abcde123')
    cy.findByText(/zaloguj się/i).click()
    
    cy.findByText(/logout/i).should('exist')

    cy.findByText(/logout/i).click()

    cy.findByLabelText(/adres email/i).should('exist')
  })
})