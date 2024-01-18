describe("Fixed Event", () => {
  beforeEach(() => {
    cy.visit("/login");

    // Ingresar credenciales
    cy.get("#email").should("be.visible").type("admin@gmail.com");
    cy.get("#password").type("123456");

    // Hacer clic en el botón de inicio de sesión
    cy.get("form").submit();
    cy.url().should("include", "/admin/members");
  });

    it("Crear evento fijo Celebración debe dar error", () => {
    cy.visit("/admin/consolidationHouses");
    cy.contains("Agregar CDC").click();
    cy.get('input[placeholder="Nombre de la CDC"]').type("Shekinah");
    // Selecciona el valor del líder en el dropdown
    cy.get("select#leader").select("Steven Solis Obando"); // Puedes ajustar el valor según tus necesidades
    // Rellena el input de Fecha
    //cy.get('input[type="date"]').type("2024-01-01"); // Puedes ajustar la fecha según tus necesidades
    // Rellena el input de Hora
    cy.get('input[type="time"]').type("23:45"); // Puedes ajustar la hora según tus necesidades
    // Rellena el textarea de Dirección
    cy.get('textarea[name="address"]').type(
      "500 metros norte del super casa de todos en barrio Lourdes"
    );
    // Haz clic en el botón "Guardar"
    //cy.contains("Guardar").click();
    cy.xpath("/html/body/div[3]/div/div/div/div/div[2]/div[5]/button").click();
    // Verifica que el mensaje de éxito esté presente en el elemento con role="status"
    cy.wait(1000);
    cy.get('[role="status"][aria-live="polite"]').should(
      "contain",
      "obligatorios"
    );


  });
     it("Crear evento fijo Oración", () => {
    cy.visit("/admin/consolidationHouses");
    cy.contains("Agregar CDC").click();
    cy.get('input[placeholder="Nombre de la CDC"]').type("Apostol");
    // Selecciona el valor del líder en el dropdown
    cy.get("select#leader").select("Javier"); // Puedes ajustar el valor según tus necesidades
    // Rellena el input de Fecha
    cy.get('input[type="date"]').type("2023-01-12"); // Puedes ajustar la fecha según tus necesidades
    // Rellena el input de Hora
    cy.get('input[type="time"]').type("23:45"); // Puedes ajustar la hora según tus necesidades
    // Rellena el textarea de Dirección
    cy.get('textarea[name="address"]').type(
      "500 metros norte del super casa de todos en barrio Lourdes"
    );
    // Haz clic en el botón "Guardar"
    cy.xpath("/html/body/div[3]/div/div/div/div/div[2]/div[5]/button").click();
    // Verifica que el mensaje de éxito esté presente en el elemento con role="status"
    cy.wait(1000);
    cy.get('[role="status"][aria-live="polite"]').should(
      "contain",
      "creada exitosamente"
    );
  });
  it("Editar evento fijo ", () => {
    cy.visit("/admin/consolidationHouses");
    // Hacer clic en el botón "Editar" del primer elemento (index 0)
    cy.get(
      '.space-y-0.border.shadow-sm.border-inherit.border-border div.flex.flex-col.sm\\:flex-row button:contains("Editar")'
    )
      .eq(0)
      .click();
      cy.get('input#HousesName').type("Venida de Dios");
    // Selecciona el valor del líder en el dropdown
    cy.get("select#leader").select("Javier"); // Puedes ajustar el valor según tus necesidades
    // Rellena el input de Fecha
    cy.get('input[type="date"]').type("2023-01-12"); // Puedes ajustar la fecha según tus necesidades
    // Rellena el input de Hora
    cy.get('input[type="time"]').type("23:45"); // Puedes ajustar la hora según tus necesidades
    // Rellena el textarea de Dirección
    cy.get('textarea[name="address"]').type(
      "50 mts este del parque"
    );
    cy.xpath("/html/body/div[3]/div/div/div/div/div[2]/div[5]/button").click();
    cy.wait(1000);
    cy.get('[role="status"][aria-live="polite"]').should(
      "contain",
      "editada exitosamente"
    );
  });
  it("Editar evento fijo", () => {
    cy.visit("/admin/consolidationHouses");
    // Hacer clic en el botón "Editar" del primer elemento (index 0)
    cy.get(
      '.space-y-0.border.shadow-sm.border-inherit.border-border div.flex.flex-col.sm\\:flex-row button:contains("Editar")'
    )
      .eq(0)
      .click();
    // Rellena el input de Fecha
    cy.get('input[type="date"]').type("2023-01-13"); // Puedes ajustar la fecha según tus necesidades
    // Rellena el input de Hora
    cy.get('input[type="time"]').type("23:45"); // Puedes ajustar la hora según tus necesidades
    // Rellena el textarea de Dirección
    cy.get('textarea[name="address"]').type(
      "50 mts este del parque"
    );
    cy.xpath("/html/body/div[3]/div/div/div/div/div[2]/div[5]/button").click();
    cy.wait(1000);
    cy.get('[role="status"][aria-live="polite"]').should(
      "contain",
      "editada exitosamente"
    );
  });
  it("Eliminarevento fijo", () => {
    cy.visit("/admin/consolidationHouses");
    // Hacer clic en el botón "Editar" del primer elemento (index 0)
    cy.get(
      '.space-y-0.border.shadow-sm.border-inherit.border-border div.flex.flex-col.sm\\:flex-row button:contains("Eliminar")'
    )
      .eq(0)
      .click();
    // Supongamos que el div tiene una clase única que lo identifica, por ejemplo, 'dialog-container'
    cy.xpath("/html/body/div[3]/div/div/div/div/div[2]")
      .find(".bg-red-600") // Asumiendo que la clase 'bg-red-600' identifica el botón Eliminar
      .click();
    cy.wait(1000);
    cy.get('[role="status"][aria-live="polite"]').should(
      "contain",
      "eliminada exitosamente"
    );
  });

  afterEach(() => {
    cy.visit("/admin/members");
  });
});
