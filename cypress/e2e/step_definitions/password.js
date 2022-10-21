import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given("I open Equad's testing website", () => {
    cy.visit('/');
});

When('I enter my login credentials', () => {
    cy.fixture('user.json').then((user) => {
        cy.get('#inputEmail').type(user.userEmail);
        cy.get('#inputPassword').type(user.userPassword);
    });
});

When('I click on submit button', () => {
    cy.get("button[type='submit']").click();
});

Then('I am connected', () => {
    cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/account/update-password');
    });
});

When('I enter my actual password', () => {
    cy.fixture('user.json').then((user) => {
        cy.get('#update_password_previous').type(user.userPassword);
    });
});

When('I enter 2 times my new password', () => {
    cy.fixture('user.json').then((user) => {
        cy.get('#update_password_new').type(user.newUserPassword);
        cy.get('#update_password_confirm').type(user.newUserPassword);

        cy.writeFile('cypress/fixtures/user.json', {
            userEmail: user.userEmail,
            userPassword: user.newUserPassword,
            newUserPassword: user.userPassword,
        });
    });
});

Then('My password is changed', () => {
    cy.get('#userDropdown').click();
    cy.get('a[data-target="#logoutModal"]').click();
    cy.get('a[href="/logout"]').click();
    cy.fixture('user.json').then((user) => {
        cy.get('#inputEmail').type(user.userEmail);
        cy.get('#inputPassword').type(user.newUserPassword);
    });
    cy.get("button[type='submit']").click();
    cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/');
    });
});
