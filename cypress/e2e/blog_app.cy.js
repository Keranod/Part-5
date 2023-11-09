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

      describe('When logged in', function() {
        beforeEach(function() {
            cy.contains('login')
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
            cy.contains('logout')
        })
    
        it('A blog can be created', function() {
            const blogTitle = 'Blog Title Sample 1'
            cy.contains('new blog').click()
            cy.get('#logout')
            cy.get('#title').type(blogTitle)
            cy.get('#author').type('Konrad Konkel')
            cy.get('#url').type('somerandomurl.org')
            cy.get('#create').click()
            cy.contains(blogTitle)
        })

        it('A blog can be liked', function() {
            const blogTitle = 'Blog Title Sample 2'
            cy.contains('new blog').click()
            cy.get('#logout')
            cy.get('#title').type(blogTitle)
            cy.get('#author').type('Konrad Konkel')
            cy.get('#url').type('somerandomurl.org')
            cy.get('#create').click()
            cy.contains(blogTitle)
            cy.get('#view').click()
            cy.get('#like').click()
            cy.contains('likes 1')
        })

        it.only('A blog can be deleted', function() {
            const blogTitle = 'Blog Title Sample 2'
            cy.contains('new blog').click()
            cy.get('#logout')
            cy.get('#title').type(blogTitle)
            cy.get('#author').type('Konrad Konkel')
            cy.get('#url').type('somerandomurl.org')
            cy.get('#create').click()
            cy.contains(blogTitle)
            cy.get('#view').click()
            cy.get('#remove').click()
            cy.contains(blogTitle).should('not.exist')
        })
      })
  })