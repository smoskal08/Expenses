describe('Expenses view', () => {
  beforeEach(() => {
    cy.visit('/')

    cy.findByLabelText(/adres email/i).click().type('test@gmail.com')
    cy.findByLabelText(/hasło/i).click().type('abcde123')
    cy.findByText(/zaloguj się/i).click()
  })

  it('Adds, edits and deletes expenses', () => {
    cy.findByText(/dodaj/i).click()

    cy.findByLabelText(/cena/i).click().type('20')
    cy.findByLabelText(/miejsce/i).click().type('Tesco')
    cy.findByLabelText(/kategoria/i).click().type('1')
    cy.findByLabelText(/priorytet/i).click().type('2')
    cy.findByLabelText(/submit/i).click()

    cy.findAllByText(/20/i).first().should('exist')
    cy.findAllByText(/Tesco/i).first().should('exist')
    cy.findAllByText(/1/i).first().should('exist')
    cy.findAllByText(/2/i).first().should('exist')

    cy.findByLabelText(/edit/i).click()

    cy.findByLabelText(/cena/i).clear()
    cy.findByLabelText(/miejsce/i).clear()
    cy.findByLabelText(/kategoria/i).clear()
    cy.findByLabelText(/priorytet/i).clear()
    cy.findByLabelText(/cena/i).click().type('25')
    cy.findByLabelText(/miejsce/i).click().type('Żabka')
    cy.findByLabelText(/kategoria/i).click().type('3')
    cy.findByLabelText(/priorytet/i).click().type('5')
    cy.findByLabelText(/submit/i).click()

    cy.findAllByText(/25/i).first().should('exist')
    cy.findAllByText(/Żabka/i).first().should('exist')
    cy.findAllByText(/3/i).first().should('exist')
    cy.findAllByText(/5/i).first().should('exist')

    cy.findByLabelText(/delete/i).click()

    cy.findByText(/wydatek/i).should('exist')

    cy.findByText(/tak/i).click()

    cy.findByText(/20/i).should('not.exist')
    cy.findByText(/Tesco/i).should('not.exist')
    cy.findByText(/1/i).should('not.exist')
    cy.findByText(/2/i).should('not.exist')
  })
})