import { accounts } from "../../fixtures/accounts";
import { loginPage } from "../../support/page_objects/login/loginPage";

describe("Navigate Sufferfest after logged in", () => {
  beforeEach(() => {
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

  // using Then() to log current url during test
  it("Clicking Calendar on Home page will redirect", () => {
    cy.url().then((link1) => {
      cy.log("link 1 is: " + link1);
    });
    cy.get("a").contains("Calendar").click();
    cy.url().then((link2) => {
      cy.log("link 2 is: " + link2);
      cy.url().should("include", "/#!/calendar");
    });
  });

  it("Implicit vs Explicit assertions", () => {
    // implicit
    cy.get("a")
      .contains("Training plans")
      .should("have.attr", "ui-sref", "training-plans")
      .and("have.attr", "href", "#!/training-plans");
    // explicit
    cy.get("a")
      .contains("Training plans")
      .should(($a) => {
        expect($a).to.have.attr("ui-sref", "training-plans");
        expect($a).to.have.attr("href", "#!/training-plans");
      });
  });

});
