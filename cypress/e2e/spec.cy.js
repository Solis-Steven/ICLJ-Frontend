describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/login');

    // Ingresar credenciales
    cy.get('#email').should('be.visible').type('admin@gmail.com');
    cy.get('#password').type('123456');

    // Hacer clic en el botón de inicio de sesión
    cy.get('form').submit();
  });

  it('should be able to login', () => {
    cy.url().should('include', '/dashboard');
  });
})