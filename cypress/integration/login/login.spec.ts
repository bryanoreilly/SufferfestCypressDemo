import { accounts } from '../../fixtures/accounts';
import { loginPage } from '../../support/page_objects/login/loginPage';

describe('login', () => {

    it('Login to Sufferfest', () => {
        cy.visit("https://sufapp.thesufferfest.com/#!/users/login//");
        loginPage.getEmailInput().type(accounts.basicUserName);
        loginPage.getPasswordInput().type(accounts.basicPassword);
        loginPage.getLoginButton().click();
        cy.url().should('include','#!/home');
    })

    it('Login to Sufferfest site', () => {
        cy.visit("https://sufapp.thesufferfest.com");
        cy.get('.email').type('cypresswebtestingdemo@gmail.com');
        cy.get('.password').type('P@ssw0rd!');
        cy.get('button').contains('Log in').click();
        cy.url().should('include','#!/home');
    })

    // Tests will continue from where last test left off
    it('Home page contains valid links', () => {
        cy.get('.tips > :nth-child(1) > p > a').should('have.attr', 'href')
        .and('include','#!/account/account/subscription');

        cy.get('.tips > :nth-child(2) > p > a').should('have.attr', 'href')
        .and('include','#!/account/account/subscription');

        cy.get('.tips > :nth-child(3) > p > a').should('have.attr', 'href')
        .and('include','https://support.thesufferfest.com/hc/en-us');
    })

    // using Then()
    it.only('Clicking Calendar on Home page will redirect', () => {

        cy.visit("https://sufapp.thesufferfest.com/#!/users/login//")
        loginPage.getEmailInput().type(accounts.basicUserName);
        loginPage.getPasswordInput().type(accounts.basicPassword);
        cy.get('.btn').contains('Log in').click();
        cy.url().then(link => {
            cy.log(link)
            cy.url().should('include', '/#!/calendar')
        })
        cy.get('a').contains("Calendar").click();
        cy.url().then(link => {
            cy.log(link)
            cy.url().should('include', '/#!/calendar')
        })
    })

    it('Clicking Training Plans on Home page will redirect', () => {

        cy.visit("https://sufapp.thesufferfest.com/#!/users/login//")
        loginPage.getEmailInput().type(accounts.basicUserName);
        loginPage.getPasswordInput().type(accounts.basicPassword);
        cy.get('.btn').contains('Log in').click();
        // cy.url().should('include', '/#!/calendar')
        cy.get('a').contains('Training plans').click();
        
        cy.url().then(link => {
            console.log(link)
            cy.url().should('include', '/#!/training-plans')
        })
    })

    it('Implicit vs Explicit assertions', () => {
        cy.visit("https://sufapp.thesufferfest.com/#!/users/login//")
        loginPage.getEmailInput().type(accounts.basicUserName);
        loginPage.getPasswordInput().type(accounts.basicPassword);
        cy.get('.btn').contains('Log in').click();
        // implicit
        cy.get('a').contains('Training plans')
        .should('have.attr', 'ui-sref', 'training-plans')
        .and('have.attr', 'href', '#!/training-plans')
        // explicit
        cy.get('a').contains('Training plans').should(($a) => {
            expect($a).to.have.attr('ui-sref', 'training-plans');
            expect($a).to.have.attr('href', '#!/training-plans');
        })
    })

    it('Custom timeout on a selector', () => {
        cy.visit("https://sufapp.thesufferfest.com/#!/users/login//")
        loginPage.getEmailInput().type(accounts.basicUserName);
        loginPage.getPasswordInput().type(accounts.basicPassword);
        cy.get('.btn').contains('Log in').click();

        // The timeout extends the normal 4 second timeout for this selector and all chained to it to 10
        cy.get('a[href="#!/home"]', {timeout: 10000 })
        .should('be.visible')
        .and('have.attr', 'ui-sref', 'home()')
    })
})