const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  projectId: "practice_software_testing",
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 8000,
  requestTimeout: 10000,
  responseTimeout: 10000,
  pageLoadTimeout: 30000,
  video: true,
  screenshotOnRunFailure: true,
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',

  e2e: {
    baseUrl: "https://practicesoftwaretesting.com",
    specPattern: [
      "cypress/e2e/**/*.cy.js",
      "cypress/e2e/features/**/*.feature",
    ],
    supportFile: "cypress/support/e2e.js",
    async setupNodeEvents(on, config) {
      // Cucumber BDD preprocessor plugin
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Return the config object (may have been modified by the plugin)
      return config;
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
