describe("Sedes", () => {
    beforeEach(() => {
      cy.visit("/login");
  
      // Ingresar credenciales
      cy.get("#email").should("be.visible").type("admin@gmail.com");
      cy.get("#password").type("123456");
  
      // Hacer clic en el botón de inicio de sesión
      cy.get("form").submit();
      cy.url().should("include", "/admin/members");
    });
      it("Crear sede", () => {
      cy.visit("/admin/sites");
      cy.contains("Agregar Sede").click();
      cy.get('input[placeholder="Lugar de la Sede"]').type("Los Angeles");
      // Rellena el textarea de Dirección
      cy.get('textarea[id="address"]').type(
        "100mts sur de la soda La Norte"
      );
      cy.xpath("/html/body/div[3]/div/div/div/div/div[2]/div[2]/div/form/input").click();
      // Verifica que el mensaje de éxito esté presente en el elemento con role="status"
      cy.wait(1000);
      cy.get('[role="status"][aria-live="polite"]').should(
        "contain",
        "creada exitosamente"
      );
  
  
    });
        it("Crear sede debe dar error", () => {
        cy.visit("/admin/sites");
        cy.contains("Agregar Sede").click();
        cy.get('input[placeholder="Lugar de la Sede"]').type("Cedral");
        cy.xpath("/html/body/div[3]/div/div/div/div/div[2]/div[2]/div/form/input").click();
        // Verifica que el mensaje de éxito esté presente en el elemento con role="status"
        cy.wait(1000);
        cy.get('[role="status"][aria-live="polite"]').should(
        "contain",
        "obligatorios"
      );
    });
    it("Editar sede", () => {
      cy.visit("/admin/sites");
      // Hacer clic en el botón "Editar" del primer elemento (index 0)
      cy.xpath(
        '/html/body/div[2]/main/section/section/section[1]/div/div[2]/button[1]'
      )
        .click();
      cy.get('input[type="text"]').type("La Fortuna");
      // Selecciona el valor del líder en el dropdown
      cy.get('textarea[id="address"]').type(
        "50mts este del parque"
      );
      cy.xpath("/html/body/div[3]/div/div/div/div/div[2]/div[2]/div/form/input").click();
      cy.wait(1000);
      cy.get('[role="status"][aria-live="polite"]').should(
        "contain",
        "editada exitosamente"
      );
    });
    it("Editar sede", () => {
        cy.visit("/admin/sites");
        // Hacer clic en el botón "Editar" del primer elemento (index 0)
        cy.xpath(
          '/html/body/div[2]/main/section/section/section[2]/div/div[2]/button[1]'
        )
          .click();
        cy.get('input[type="text"]').type("Los Chiles");
        // Selecciona el valor del líder en el dropdown
        cy.get('textarea[id="address"]').type(
          "50mts este del parque"
        );
        cy.xpath("/html/body/div[3]/div/div/div/div/div[2]/div[2]/div/form/input").click();
        cy.wait(1000);
        cy.get('[role="status"][aria-live="polite"]').should(
          "contain",
          "editada exitosamente"
        );
      });
    it("Eliminar Sede", () => {
      cy.visit("/admin/sites");
      // Hacer clic en el botón "Editar" del primer elemento (index 0)
      cy.xpath(
        '/html/body/div[2]/main/section/section/section[3]/div/div[2]/button[2]'
      )
        .click();
      // Supongamos que el div tiene una clase única que lo identifica, por ejemplo, 'dialog-container'
      cy.xpath("/html/body/div[3]/div/div/div/div/div[2]")
        .find(".bg-red-600") // Asumiendo que la clase 'bg-red-600' identifica el botón Eliminar
        .click();
      cy.wait(1000);
      cy.get('[role="status"][aria-live="polite"]').should(
        "contain",
        "deleted"
      );
    });
  
    afterEach(() => {
      cy.visit("/admin/members");
    });
  });
  