describe('i18n test', () => {
  it('should have i18n content', () => {
    cy.viewport('macbook-13')
    cy.visit('/')

    cy.get('#header-menu-button-language').click()
    cy.get('[data-cy="language-fr"]').click()
    cy.contains('Bienvenue Carbon Nuxt')
    cy.contains('Connectez-vous pour voir des informations intéressantes')
    cy.contains('Connectez-vous avec MockId')
  })
})
