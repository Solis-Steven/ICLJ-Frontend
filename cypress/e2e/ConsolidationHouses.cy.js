
describe("template spec", () => {
  beforeEach(() => {
    cy.visit("/login");

    // Ingresar credenciales
    cy.get("#email").should("be.visible").type("admin@gmail.com");
    cy.get("#password").type("123456");

    // Hacer clic en el botón de inicio de sesión
    cy.get("form").submit();
    cy.url().should("include", "/admin/members");
  });

  it("Crear casa de consolidación", () => {
    cy.visit("/admin/consolidationHouses");
    cy.contains("Agregar CDC").click();
    cy.get('input[placeholder="Ingrese el nombre de la CDC"]').type("hogar");
    // Selecciona el valor del líder en el dropdown
    cy.get("select#leader").select("Steven Solis Obando"); // Puedes ajustar el valor según tus necesidades
    // Rellena el input de Fecha
    cy.get('input[type="date"]').type("2024-01-01"); // Puedes ajustar la fecha según tus necesidades
    // Rellena el input de Hora
    cy.get('input[type="time"]').type("12:00"); // Puedes ajustar la hora según tus necesidades
    // Rellena el textarea de Dirección
    cy.get('textarea[name="address"]').type(
      "500 metros norte del super casa de todos en barrio Lourdes"
    );
    // Haz clic en el botón "Guardar"
    //cy.contains("Guardar").click();
    cy.xpath('/html/body/div[3]/div/div/div/div/div[2]/div[5]/button').click();
    cy.contains("hogar").should("exist");
  });
 
  
 
  afterEach(() => {
    cy.visit("/admin/members");
  });
});
