const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "4qaf56",
  e2e: {
    baseUrl:'https://restful-booker.herokuapp.com',
    requestTimeout: 6000,
    responseTimeout: 6000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env:{
      requestMode: true,
      hideCredentials: true,
      username : 'admin',
      password : 'password123',
      auth_url: '/auth'
    }
  },
});
