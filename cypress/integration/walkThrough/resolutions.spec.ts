import { accounts } from "../../fixtures/accounts";
import { loginPage } from "../../support/page_objects/login/loginPage";

context("Test site against various resolutions", () => {
  describe("1080p resolution", () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
      cy.visit("https://sufapp.thesufferfest.com/#!/users/login//");
      loginPage.getEmailInput().type(accounts.basicUserName);
      loginPage.getPasswordInput().type(accounts.basicPassword);
      loginPage.getLoginButton().click();
    });

    it("Home page contains valid links", () => {
      cy.get(".tips > :nth-child(1) > p > a")
        .should("have.attr", "href")
        .and("include", "#!/account/account/subscription");

      cy.get(".tips > :nth-child(2) > p > a")
        .should("have.attr", "href")
        .and("include", "#!/account/account/subscription");

      cy.get(".tips > :nth-child(3) > p > a")
        .should("have.attr", "href")
        .and("include", "https://support.thesufferfest.com/hc/en-us");
    });
  });

  // width < 1025
  describe("768p ipad-2 resolution", () => {
    beforeEach(() => {
      // ipad-2	(768, 1024)
      cy.viewport(768, 1024);
      cy.visit("https://sufapp.thesufferfest.com/#!/users/login//");
      loginPage.getEmailInput().type(accounts.basicUserName);
      loginPage.getPasswordInput().type(accounts.basicPassword);
      loginPage.getLoginButton().click();
    });

    it("Home page contains valid links", () => {
      cy.get(".tips > :nth-child(1) > p > a")
        .should("have.attr", "href")
        .and("include", "#!/account/account/subscription");

      cy.get(".tips > :nth-child(2) > p > a")
        .should("have.attr", "href")
        .and("include", "#!/account/account/subscription");

      cy.get(".tips > :nth-child(3) > p > a")
        .should("have.attr", "href")
        .and("include", "https://support.thesufferfest.com/hc/en-us");
    });
  });

  // width < 580
  describe("360p samsung-s10 resolution", () => {
    beforeEach(() => {
      // samsung-s10	(360, 760)
      cy.viewport(360, 760);
      cy.visit("https://sufapp.thesufferfest.com/#!/users/login//");
      loginPage.getEmailInput().type(accounts.basicUserName);
      loginPage.getPasswordInput().type(accounts.basicPassword);
      loginPage.getLoginButton().click();
    });

    it("Home page contains valid links", () => {
      cy.get(".tips > :nth-child(1) > p > a")
        .should("have.attr", "href")
        .and("include", "#!/account/account/subscription");

      cy.get(".tips > :nth-child(2) > p > a")
        .should("have.attr", "href")
        .and("include", "#!/account/account/subscription");

      cy.get(".tips > :nth-child(3) > p > a")
        .should("have.attr", "href")
        .and("include", "https://support.thesufferfest.com/hc/en-us");
    });
  });
});
