Cypress.Commands.add('login', (email, password) => {
    cy.get('input[placeholder=Email]').type(email);
    cy.get('input[placeholder=Password]').type(password);

    cy.get('button[ng-bind*=title]').click()
})

Cypress.Commands.add('loginUI', (status, fixture) => {
    cy.intercept({
        method: 'POST',
        path:'/api/users/login'
    },{
        statusCode: status,
        fixture: fixture
    })
})

Cypress.Commands.add('loginAPI', (email, password) => {
    cy.request({
        method:'POST',
        url:'https://api.realworld.io/api/users/login',
        body:{
            user:{
                email: email,
                password: password
            }
        },
        failOnStatusCode:false
    }).then((response) =>{
        if(response.status == 200 && response.body.user.token) {
            window.localStorage.setItem('jwtToken', response.body.user.token)
        }
    })
})

