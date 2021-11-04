/// <reference types="cypress" />

describe('Login - UI', () => {
    beforeEach(() => {
        cy.visit('/login')
    });
  
    it('Login com sucesso', () => {
       cy.loginUI(200, 'login-com-sucesso')
       
       cy.login('karine@mailinator.com', '123456')
       cy.get('a[href*=karine]').should('contain.text','karine')
    });
    it('Login com e-mail incorreto', () => {
        cy.loginUI(403, 'login-email-incorreto')

        cy.login('email@mailinator.com', '123456')
        cy.get('list-errors[errors*=errors] li').should('contain.text', 'email or password is invalid')
    });
    it('Login com senha incorreta', () => {
        cy.loginUI(403, 'login-senha-incorreta')

        cy.login('karine@mailinator.com', '123456789')
        cy.get('list-errors[errors*=errors] li').should('contain.text', 'email or password is invalid')
    });
});