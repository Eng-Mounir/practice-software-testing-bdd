// ============================================================
// PAGE OBJECT: Login Page (/auth/login)
// ============================================================

class LoginPage {
  // ── Selectors ──────────────────────────────────────────────
  get emailInput()       { return '[data-test="email"]'; }
  get passwordInput()    { return '[data-test="password"]'; }
  get loginSubmitBtn()   { return '[data-test="login-submit"]'; }
  get emailError()       { return '[data-test="email-error"]'; }
  get passwordError()    { return '[data-test="password-error"]'; }
  get loginError()       { return '[data-test="login-error"]'; }

  // ── Actions ────────────────────────────────────────────────
  visit() {
    cy.visit("/auth/login");
  }

  fillEmail(email) {
    cy.get(this.emailInput).clear().type(email, { delay: 20 });
  }

  fillPassword(password) {
    cy.get(this.passwordInput).clear().type(password, { delay: 20 });
  }

  clickSubmit() {
    cy.get(this.loginSubmitBtn).click();
    cy.wait(1200);
  }

  login(email, password) {
    this.visit();
    this.fillEmail(email);
    this.fillPassword(password);
    this.clickSubmit();
  }

  // ── Assertions ─────────────────────────────────────────────
  assertEmailErrorVisible() {
    cy.get(this.emailError).should("be.visible");
  }

  assertPasswordErrorVisible() {
    cy.get(this.passwordError).should("be.visible");
  }

  assertErrorMessage(message) {
    cy.contains(message).should("be.visible");
  }

  assertOnLoginPage() {
    cy.url().should("include", "/auth/login");
  }

  assertEmailFieldVisible() {
    cy.get(this.emailInput).should("be.visible");
  }

  assertPasswordFieldVisible() {
    cy.get(this.passwordInput).should("be.visible");
  }

  assertLoginSubmitVisible() {
    cy.get(this.loginSubmitBtn).should("be.visible");
  }
}

module.exports = LoginPage;
