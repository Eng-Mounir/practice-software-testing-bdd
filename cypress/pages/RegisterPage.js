// ============================================================
// PAGE OBJECT: Registration Page (/auth/register)
// ============================================================

class RegisterPage {
  // ── Selectors ──────────────────────────────────────────────
  get firstNameInput()   { return '[data-test="first-name"]'; }
  get lastNameInput()    { return '[data-test="last-name"]'; }
  get dobInput()         { return '[data-test="dob"]'; }
  get streetInput()      { return 'input[formcontrolname="street"]'; }
  get postalCodeInput()  { return 'input[formcontrolname="postal_code"]'; }
  get cityInput()        { return 'input[formcontrolname="city"]'; }
  get stateInput()       { return 'input[formcontrolname="state"]'; }
  get countrySelect()    { return 'select[formcontrolname="country"]'; }
  get phoneInput()       { return 'input[formcontrolname="phone"]'; }
  get emailInput()       { return '[data-test="email"]'; }
  get passwordInput()    { return '#password'; }
  get registerSubmitBtn(){ return '[data-test="register-submit"]'; }
  get firstNameError()   { return '[data-test="first-name-error"]'; }
  get lastNameError()    { return '[data-test="last-name-error"]'; }

  // ── Actions ────────────────────────────────────────────────
  visit() {
    cy.visit("/auth/register");
  }

  clickSubmit() {
    cy.get(this.registerSubmitBtn).click();
  }

  fillForm(userData) {
    cy.get(this.firstNameInput).clear().type(userData.firstName, { delay: 20 });
    cy.get(this.lastNameInput).clear().type(userData.lastName, { delay: 20 });
    cy.get(this.dobInput).clear().type(userData.dob);
    cy.get(this.streetInput).clear().type(userData.street, { delay: 20 });
    cy.get(this.postalCodeInput).clear().type(userData.postalCode, { delay: 20 });
    cy.get(this.cityInput).clear().type(userData.city, { delay: 20 });
    cy.get(this.stateInput).clear().type(userData.state, { delay: 20 });
    cy.get(this.phoneInput).clear().type(userData.phone, { delay: 20 });
    cy.get(this.emailInput).clear().type(userData.email, { delay: 20 });
    cy.get(this.passwordInput).clear().type(userData.password, { delay: 20 });
  }

  // ── Assertions ─────────────────────────────────────────────
  assertFirstNameErrorVisible() {
    cy.get(this.firstNameError).should("be.visible");
  }

  assertLastNameErrorVisible() {
    cy.get(this.lastNameError).should("be.visible");
  }

  assertOnRegisterPage() {
    cy.url().should("include", "/auth/register");
  }
}

module.exports = RegisterPage;
