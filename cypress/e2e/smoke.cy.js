describe("smoke test", () => {
  it("should have basic home page content", () => {
    cy.visit("/");
    // are icons working?
    cy.get("[data-cy=\"language-icon\"]");
    cy.get(".cds--side-nav__link");
    cy.get("[data-cy=\"song-card\"]").its("length").should("be.greaterThan", 20);
    cy.get(".cds--side-nav__link").eq(1).click();
    cy.location("pathname").should("eq", "/fish");
    cy.get("cds-table");
    cy.get("cds-table-row").should("have.length", 7);

    // bugs
    cy.get(".cds--side-nav__link").eq(2).click();
    cy.location("pathname").should("eq", "/bugs");
    cy.get("cds-header-menu-button").click();
    cy.get("cds-accordion-item").should("have.length", 21);
    cy.get("#build-a-bug").click();
    cy.location("pathname").should("eq", "/build-a-bug");

    // villagers
    cy.get("cds-header-menu-button").click();
    cy.get(".cds--side-nav__link").last().click();
    cy.location("pathname").should("eq", "/villagers");
    cy.get("[data-cy=\"hobby\"]").should("have.length", 6);

    // home
    cy.get(".cds--side-nav__link").first().click();
    cy.location("pathname").should("eq", "/");
  });
});
