const { defineConfig } = require("cypress");

module.exports = defineConfig({


  // Configuración específica para pruebas E2E
  e2e: {
    baseUrl: "http://localhost:3000", // Especifica la URL base de tu aplicación
  // Otras configuraciones si es necesario
  // ...
  },
});
