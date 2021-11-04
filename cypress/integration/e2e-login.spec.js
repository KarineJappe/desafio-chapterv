/// <reference types="cypress" />

describe('Login - e2e', () => {

    beforeEach(() => {
        cy.visit('/login')
    });
    it('Login com sucesso', () => {
        cy.login('karine@mailinator.com', '123456')
        cy.get('a[href*=karine]')
    });
    it('Login com e-mail incorreto', () => {
        cy.login('email@mailinator.com', '123456')
        cy.get('list-errors[errors*=errors] li').should('contain.text', 'email or password is invalid')
        
    });
    it('Login com senha incorreta', () => {
        cy.login('karine@mailinator.com', '123456789')
        cy.get('list-errors[errors*=errors] li').should('contain.text', 'email or password is invalid')
    });
});