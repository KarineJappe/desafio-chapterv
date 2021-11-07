/// <reference types="cypress" />

var Chance = require('chance')
var chance =  new Chance()

describe('Login - API', () => {
    let email = chance.email()
    let password = chance.string()
    let username = chance.first()

    before(() => {
        cy.cadastro(email, password, username)
    });
    it('Login com sucesso', () => {
      cy.loginAPI(email, password).then(response =>{
          expect(response.status).to.equal(200)
          expect(response.body.user).to.have.property('email')
          expect(response.body.user).to.have.property('token')
          expect(response.body.user).to.have.property('username')
      })
    });
    it('Login com e-mail incorreto', () => {
        cy.loginAPI('email@mailinator.com', password).then(response =>{
            expect(response.status).to.equal(403)
            expect(response.body.errors["email or password"]).to.contain('is invalid')
        })
    });
    it('Login com senha incorreta', () => {
        cy.loginAPI(email, '12345678').then(response =>{
            expect(response.status).to.equal(403)
            expect(response.body.errors["email or password"]).to.contain('is invalid')
        })
    });
});