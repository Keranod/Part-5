describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:80/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:80/api/users/', user) 

      cy.visit('http://localhost:5173')
    })
  
    it('Login form is shown', function() {
      cy.get('.loginForm').should('contain', 'Log in to application')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
        })
    
        it('fails with wrong credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            // ... check if displayed message is red
            cy.get('.error').should('contain', 'Wrong credentials')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
      })
  })