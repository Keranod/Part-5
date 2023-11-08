describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:80/api/testing/reset')
      cy.visit('http://localhost:5173')
    })
  
    it('Login form is shown', function() {
      cy.get('.loginForm').should('contain', 'Log in to application')
    })
  })