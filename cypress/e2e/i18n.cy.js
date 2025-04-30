describe("smoke test", () => {
  it("should have basic i18n content", () => {
    // Deutsch
    cy.visit("/fish");
    cy.get("[data-cy=\"language-icon\"]").click();
    cy.get("[data-cy=\"language-de\"]").click();
    cy.contains("Fisch");
    cy.contains("Informationen über alle Fische");
    cy.contains("Preis");

    // English
    cy.get("[data-cy=\"language-icon\"]").click();
    cy.get("[data-cy=\"language-en\"]").click();
    cy.contains("Fish");
    cy.contains("Information about all the fish");
    cy.contains("Price");
  });
});
