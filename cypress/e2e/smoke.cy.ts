describe('smoke test', () => {
  it('should have basic content', () => {
    cy.visit('/')
    cy.get('#app-header')

    cy.get('#header-menu-button').should('be.visible')
    cy.get('#header-menu-button-login').should('be.visible')
    cy.get('#header-menu-button-language').should('be.visible')
    cy.get('#header-menu-button-apps').should('be.visible')

    // wait for providers to load and then login
    cy.wait(1000)
    cy.get('#home-login-btn').click()
    cy.wait(1200)
    cy.origin('http://localhost:8080', () => {
      // No cy.visit is needed as the button brought us here
      cy.get('#username').type('admin')
      cy.get('#password').type('potato-history')
      cy.get('#kc-login').click()
    })

    // User is logged in
    cy.get('#header-menu-button-logout').should('be.visible')
    cy.get('#header-menu-item-characters').should('not.be.visible')
    cy.get('#header-menu-item-comics').should('not.be.visible')
    cy.get('#header-menu-item-events').should('not.be.visible')

    // Side nav
    cy.get('#header-menu-button').click()
    cy.get('#header-side-nav-home').should('be.visible')
    cy.get('#header-side-nav-characters').should('be.visible')
    cy.get('#header-side-nav-comics').should('be.visible')
    cy.get('#header-side-nav-events').should('be.visible')
    cy.get('#header-menu-button').click()
    cy.get('#header-side-nav-home').should('not.be.visible')
    cy.get('#header-side-nav-characters').should('not.be.visible')
    cy.get('#header-side-nav-comics').should('not.be.visible')
    cy.get('#header-side-nav-events').should('not.be.visible')

    cy.viewport('macbook-13')

    cy.get('#header-menu-item-characters').should('be.visible')
    cy.get('#header-menu-item-comics').should('be.visible')
    cy.get('#header-menu-item-events').should('be.visible')
  })
  it('should have character content', () => {
    cy.visit('/')

    // wait for providers to load and then login
    cy.wait(1000)
    cy.get('#home-login-btn').click()
    cy.wait(1200)
    cy.origin('http://localhost:8080', () => {
      // No cy.visit is needed as the button brought us here
      cy.get('#username').type('admin')
      cy.get('#password').type('potato-history')
      cy.get('#kc-login').click()
    })

    // User is logged in
    cy.get('#header-menu-button-logout').should('be.visible')

    // Side nav
    cy.get('#header-menu-button').click()
    cy.get('#header-side-nav-characters').click()

    cy.contains('Marvel characters')
    cy.get('.cv-accordion-item').should('have.length', 20)
  })
  it('should have comics content', () => {
    cy.viewport('macbook-13')
    cy.visit('/')

    // wait for providers to load and then login
    cy.wait(1000)
    cy.get('#home-login-btn').click()
    cy.wait(1200)
    cy.origin('http://localhost:8080', () => {
      // No cy.visit is needed as the button brought us here
      cy.get('#username').type('admin')
      cy.get('#password').type('potato-history')
      cy.get('#kc-login').click()
    })

    // User is logged in
    cy.get('#header-menu-button-logout').should('be.visible')

    cy.get('#header-menu-item-comics').click()
    cy.contains('Marvel comics')
    cy.get('.cv-tile').should('have.length', 20)
  })
  it('should have event content', () => {
    cy.viewport('macbook-13')
    cy.visit('/')

    // wait for providers to load and then login
    cy.wait(1000)
    cy.get('#home-login-btn').click()
    cy.wait(1200)
    cy.origin('http://localhost:8080', () => {
      // No cy.visit is needed as the button brought us here
      cy.get('#username').type('admin')
      cy.get('#password').type('potato-history')
      cy.get('#kc-login').click()
    })

    // User is logged in
    cy.get('#header-menu-button-logout').should('be.visible')

    cy.get('#header-menu-item-events').click()
    cy.contains('Marvel universe events')
    cy.get('.cv-data-table-row').should('have.length', 7)
    cy.get('#marvel-events-table-pagination-select-page-size').select('11')
    cy.get('.cv-data-table-row').should('have.length', 11)
  })
})
