/// <reference types="cypress" />

var Chance = require('chance')
var chance =  new Chance()

describe('Login - e2e', () => {
    let email = chance.email()
    let password = chance.string()
    let username = chance.first()

    before(() => {
        cy.cadastro(email, password, username)
    });

    beforeEach(() => {
        cy.visit('/login')
    });
    it('Login com sucesso', () => {
        cy.login(email, password)
        cy.get(`a[href*=${username}]`)
    });
    it('Login com e-mail incorreto', () => {
        cy.login('mail@mailinator.com', password)
        cy.get('list-errors[errors*=errors] li').should('contain.text', 'email or password is invalid')
        
    });
    it('Login com senha incorreta', () => {
        cy.login(email, '123456789')
        cy.get('list-errors[errors*=errors] li').should('contain.text', 'email or password is invalid')
    });
});