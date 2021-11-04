/// <reference types="cypress" />

describe('Login - API', () => {

    it('Login com sucesso', () => {
      cy.loginAPI('karine@mailinator.com', '123456').then(response =>{
          console.log(response);
          expect(response.status).to.equal(200)
          expect(response.body.user).to.have.property('email')
          expect(response.body.user).to.have.property('token')
          expect(response.body.user).to.have.property('username')
      })
    });
    it('Login com e-mail incorreto', () => {
        cy.loginAPI('email@mailinator.com', '123456').then(response =>{
            expect(response.status).to.equal(403)
            expect(response.body.errors["email or password"]).to.contain('is invalid')
        })
    });
    it('Login com senha incorreta', () => {
        cy.loginAPI('karine@mailinator.com', '12345678').then(response =>{
            expect(response.status).to.equal(403)
            expect(response.body.errors["email or password"]).to.contain('is invalid')
        })
    });
});