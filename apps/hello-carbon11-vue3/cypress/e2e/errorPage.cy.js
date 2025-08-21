// error page
describe("error page test", () => {
  it("should have basic 404 page content", () => {
    cy.visit("/");
    cy.get("cds-header-menu-button").click();
    cy.get(".cds--side-nav__link").last().click();
    cy.location("pathname").should("eq", "/error-demo");
    cy.get("cds-header-menu-button").click();
    cy.contains("Error Demo");
    cy.contains("Trigger 404 Not Found");
    cy.get("#some-fake-page").click();
    cy.contains("The page you are looking for was not found");
    cy.contains("Show debug");
    cy.get("#home-link").click();
    cy.location("pathname").should("eq", "/");
  });
  it("should have basic 500 page content", () => {
    cy.visit("/");
    cy.get("cds-header-menu-button").click();
    cy.get(".cds--side-nav__link").last().click();
    cy.location("pathname").should("eq", "/error-demo");
    cy.get("cds-header-menu-button").click();
    cy.contains("Error Demo");
    cy.contains("Trigger 500 Server Error");
    cy.get("#simulate-error").click();
    cy.contains("server is unavailable");
    cy.contains("Show debug");
    cy.get("#debug-details").should("not.exist");
    cy.get("#show-debug").click();
    cy.get("#debug-details");
  });
});
