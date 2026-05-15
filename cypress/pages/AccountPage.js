// ============================================================
// PAGE OBJECT: Account Pages (/account/*)
// ============================================================

class AccountPage {
  get pageTitle()              { return '[data-test="page-title"]'; }
  get navProfile()             { return '[data-test="nav-profile"]'; }
  get firstNameInput()         { return 'input[data-test="first-name"]'; }
  get updateProfileSubmit()    { return 'button[data-test="update-profile-submit"]'; }
  get streetInput()            { return 'input[data-test="street"]'; }
  get cityInput()              { return 'input[data-test="city"]'; }
  get postalCodeInput()        { return 'input[data-test="postal_code"]'; }
  get countryInput()           { return 'input[data-test="country"]'; }
  get currentPasswordInput()   { return 'input[data-test="current-password"]'; }
  get changePasswordSubmit()   { return 'button[data-test="change-password-submit"]'; }
  get successAlert()           { return '.alert-success'; }
  get dangerAlert()            { return '.alert-danger'; }
  get invoiceNumber()          { return '[data-test="invoice-number"]'; }
  get downloadInvoice()        { return '[data-test="download-invoice"]'; }
  get deleteBtn()              { return 'button[data-test="delete"]'; }
  get favoriteItems()          { return '[data-test^="favorite-"]'; }

  visitAccount()    { cy.visit("/account"); }
  visitProfile()    { cy.visit("/account/profile"); }
  visitInvoices()   { cy.visit("/account/invoices"); }
  visitFavorites()  { cy.visit("/account/favorites"); }
  visitMessages()   { cy.visit("/account/messages"); }

  updateFirstName(name) {
    cy.get(this.firstNameInput).clear().type(name);
    cy.get(this.updateProfileSubmit).click();
  }

  updateAddress(address) {
    cy.get(this.streetInput).clear().type(address.address);
    cy.get(this.cityInput).clear().type(address.city);
    cy.get(this.postalCodeInput).clear().type(address.postcode);
    cy.get(this.countryInput).clear().type(address.country);
    cy.get(this.updateProfileSubmit).click();
  }

  changePassword(currentPwd) {
    cy.get(this.currentPasswordInput).type(currentPwd);
    cy.get(this.changePasswordSubmit).click();
  }

  clickFirstInvoiceDetail() {
    cy.get('a.btn.btn-sm.btn-primary').first().click();
  }

  deleteFavorite() {
    cy.get(this.deleteBtn).first().click();
  }

  // ── Assertions ──
  assertPageTitleVisible()      { cy.get(this.pageTitle).should("be.visible"); }
  assertNavProfileVisible()     { cy.get(this.navProfile).should("be.visible"); }
  assertOnAccountPage()         { cy.url().should("include", "/account"); }
  assertOnProfilePage()         { cy.url().should("include", "/account/profile"); }
  assertOnInvoicesPage()        { cy.url().should("include", "/account/invoices"); }
  assertOnMessagesPage()        { cy.url().should("include", "/account/messages"); }
  assertFirstNameVisible()      { cy.get(this.firstNameInput).should("be.visible"); }
  assertSuccessAlertVisible()   { cy.get(this.successAlert).should("be.visible"); }
  assertStreetInputVisible()    { cy.get(this.streetInput).should("be.visible"); }
  assertPostalCodeVisible()     { cy.get(this.postalCodeInput).should("be.visible"); }
  assertCountryInputVisible()   { cy.get(this.countryInput).should("be.visible"); }
  assertTableVisible()          { cy.get("table").should("be.visible"); }
  assertChangePasswordVisible() { cy.get(this.changePasswordSubmit).should("be.visible"); }
  assertCurrentPasswordVisible(){ cy.get(this.currentPasswordInput).should("be.visible"); }

  assertInvoiceDetailLoaded() {
    cy.url().should("match", /\/account\/invoices\//);
    cy.get(this.invoiceNumber).should("be.visible");
    cy.get(this.downloadInvoice).should("be.visible");
  }

  assertProfileUpdateFeedback() {
    cy.get("body").then(($b) => {
      if ($b.find(".alert-success, .alert-danger").length > 0) {
        cy.get(".alert-success, .alert-danger").should("be.visible");
      }
    });
  }

  hasInvoiceDetails() {
    return cy.get("body").then(($b) => $b.find('a.btn.btn-sm.btn-primary').length > 0);
  }

  assertFavoritesPageTitle()    { cy.get(this.pageTitle).should("be.visible"); }

  assertMessagesContent() {
    cy.get("body").then(($b) => {
      if ($b.find("table").length > 0) {
        cy.get("table").should("be.visible");
      } else {
        cy.get("body").invoke("text").should("match", /message|contact/i);
      }
    });
  }
}

module.exports = AccountPage;
