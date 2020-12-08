import { accounts } from '../../fixtures/accounts';


describe('Cypress Introduction tests', () => {

    it('Go to the Sufferfest website', () => {
        cy.visit("https://sufapp.thesufferfest.com");
    })

    it('Go to the Sufferfest website and create account page', () => {
        cy.visit("https://sufapp.thesufferfest.com");
        cy.visit('./#!/users/create')
    })

    it('Login to Sufferfest site', () => {
        cy.visit("https://sufapp.thesufferfest.com");
        cy.get('.email').type('cypresswebtestingdemo@gmail.com');
        cy.get('.password').type('P@ssw0rd!');
        cy.get('button').contains('Log in').click();
        cy.url().should('include','#!/home');
        // cy.url() is an alias of cy.location('href')
        // cy.location('href').should('include','#!/home');
    })

    it('Different ways to validate field has text', () => {
        cy.visit("https://sufapp.thesufferfest.com/#!/users/login//");
        cy.get('.email').type(accounts.basicUserName)
        cy.get('.password').type(accounts.basicPassword)
        cy.get('.btn').contains('Log in').click();

        cy.get('.profile').click();
        cy.get('a').contains('Your profile').click();

        cy.get('.name').should('include.text', 'Testy Tester')

        cy.log(cy.get('.name').find('p').toString())

        cy.get('.name').find('p').then((nameEl) => {
            console.log(nameEl)
            console.log(nameEl[0].outerText)
            cy.log(nameEl[0].outerText)

            expect(nameEl[0].outerText).to.eq('Testy Tester')
        });
    })

    it('Create a new user and go through tour', () => {
        const date = new Date();
        const nowTime = date.getTime();
        const newUser = "autotester+"+nowTime+"@mailinator.com"
        cy.log(newUser)
        cy.intercept('POST', '/graphql', (req) => {
            if (req.body.operationName === 'GetOnboardingSteps') {
              req.alias = 'GetOnboardingSteps';
            }
          });

        cy.visit("https://sufapp.thesufferfest.com");
        
        cy.contains("New here? Create an account").click();
        // https://sufapp.thesufferfest.com/#!/users/create
        // by-passes cookies popup
        cy.get('.email').then((body) => {
            if (body.find('.warning').length > 0){
            cy.get('button[title="Accept Cookies"]').click();
            cy.get('body').scrollTo('top')
            }
        })

        cy.get('.name').type("Generic Tester");
        cy.get('.email').eq(0).type(newUser)
        cy.get('#confirm_email').type(newUser)
        cy.get('.password').type(accounts.basicPassword)
        cy.get('input[ng-model="is_terms_on"]').click();
        cy.get('input[ng-model="is_privacy_agreed"]').click();
        cy.get('.btn').contains('Create account').click()

        cy.wait('@GetOnboardingSteps').then((interceptions) => {
            cy.log(interceptions[0])
            cy.get('button[ng-click="next()"]', {timeout: 15000}).click()
        })

        // skip tour
        cy.get('.hide-small.show-medium-large > div.next > .next').click();
        cy.get('.onboard-error > .footer > .next').click()

        cy.get('.hide-small.show-medium-large > div.next > .next').click();
        cy.get('.onboard-error > .footer > .next').click()

        cy.get('.hide-small.show-medium-large > div.next > .next').click()
        cy.get('.onboard-error > .footer > .next').click()

        cy.get('.hide-small.show-medium-large > div.next > .next').click()

        cy.get('.hide-small.show-medium-large > div.next > .next').click()

        cy.url().then(link => {
            console.log(link)
            cy.url().should('include', '/#!/home')
        })
        
    })

})