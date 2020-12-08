export class LoginPage {
  getEmailInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.email');
  }

  getPasswordInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.password');
  }

  getLoginButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.ng-scope > .btn');
  }

  getCreateAccountButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('a[href="#!/users/create"]');
  }
}

export const loginPage = new LoginPage();
