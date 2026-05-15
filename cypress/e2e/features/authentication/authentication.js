// ============================================================
// STEP DEFINITIONS: Authentication (TC-001 → TC-006)
// ============================================================
const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const LoginPage = require("../../../pages/LoginPage");
const RegisterPage = require("../../../pages/RegisterPage");
const NavBar = require("../../../pages/NavBar");

const loginPage = new LoginPage();
const registerPage = new RegisterPage();
const navBar = new NavBar();

// ── Given ────────────────────────────────────────────────────

Given("I am on the home page", () => {
  cy.visit("/");
});

Given("I am on the login page", () => {
  loginPage.visit();
});

Given("I am on the registration page", () => {
  registerPage.visit();
});

Given("I am logged in as {string} with password {string}", (email, password) => {
  cy.login(email, password);
});

// ── When ─────────────────────────────────────────────────────

When("I enter email {string}", (email) => {
  loginPage.fillEmail(email);
});

When("I enter password {string}", (password) => {
  loginPage.fillPassword(password);
});

When("I click the login button", () => {
  loginPage.clickSubmit();
});

When("I click the register submit button", () => {
  registerPage.clickSubmit();
});

When("I click the sign out button", () => {
  navBar.clickSignOut();
});

// ── Then ─────────────────────────────────────────────────────

Then("I should be redirected to the account page", () => {
  cy.url().should("include", "/account");
});

Then("the page title should display {string}", (title) => {
  cy.get('[data-test="page-title"]').should("contain", title);
});

Then("the user navigation menu should be visible", () => {
  navBar.assertMenuVisible();
});

Then("I should see the error message {string}", (message) => {
  loginPage.assertErrorMessage(message);
});

Then("I should see a message containing {string}", (text) => {
  cy.contains(text).should("be.visible");
});

Then("I should remain on the login page", () => {
  loginPage.assertOnLoginPage();
});

Then("the email field should still be visible", () => {
  loginPage.assertEmailFieldVisible();
});

Then("the password field should still be visible", () => {
  loginPage.assertPasswordFieldVisible();
});

Then("the email validation error should be visible", () => {
  loginPage.assertEmailErrorVisible();
});

Then("the password validation error should be visible", () => {
  loginPage.assertPasswordErrorVisible();
});

Then("the first name validation error should be visible", () => {
  registerPage.assertFirstNameErrorVisible();
});

Then("the last name validation error should be visible", () => {
  registerPage.assertLastNameErrorVisible();
});

Then("I should remain on the registration page", () => {
  registerPage.assertOnRegisterPage();
});

Then("I should not be on the account page", () => {
  navBar.assertNotOnAccountPage();
});

Then("the user navigation menu should not exist", () => {
  navBar.assertMenuNotExist();
});

Then("the sign in link should be visible", () => {
  navBar.assertSignInVisible();
});
