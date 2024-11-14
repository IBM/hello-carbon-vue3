describe("smoke test", () => {
  it("should have basic home page content", () => {
    cy.visit("/");
    // are icons working?
    cy.get('[data-cy="language-icon"]');
    cy.get(".cv-side-nav-items");
    cy.get(".songs__name").its("length").should("be.greaterThan", 20);
    cy.get("#side-nav").find("li").eq(2).click();
    cy.location("pathname").should("eq", "/fish");
    cy.get(".cv-data-table");
    cy.get(".cv-data-table").find("tr").should("have.length", 8);

    // bugs
    cy.get("#side-nav").find("li").eq(3).click();
    cy.location("pathname").should("eq", "/bugs");
    cy.get(".bx--accordion__heading").should("have.length", 21);
    cy.get(".cv-link").click();
    cy.location("pathname").should("eq", "/build-a-bug");

    // villagers
    cy.get("#side-nav").find("li").eq(4).click();
    cy.location("pathname").should("eq", "/villagers");
    cy.get(".hobby").should("have.length", 6);

    // home
    cy.get("#side-nav").find("li").first().click();
    cy.location("pathname").should("eq", "/");
  });
  it("should have basic i18n content", () => {
    // Deutsch
    cy.visit("/fish");
    cy.get('[data-cy="language-icon"]').click();
    cy.get('[data-cy="language-de"]').click();
    cy.contains("Fisch");
    cy.contains("Informationen über alle Fische");
    cy.contains("Nein");

    // English
    cy.get('[data-cy="language-icon"]').click();
    cy.get('[data-cy="language-en"]').click();
    cy.contains("Fish");
    cy.contains("Information about all the fish");
    cy.contains("No");
  });
});
