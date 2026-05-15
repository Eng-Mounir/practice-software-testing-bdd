// ============================================================
// STEP DEFINITIONS: Account (TC-029 → TC-038)
// ============================================================
const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const AccountPage = require("../../../pages/AccountPage");
const NavBar = require("../../../pages/NavBar");

const accountPage = new AccountPage();
const navBar = new NavBar();

// ── Given ────────────────────────────────────────────────────

Given("I am on the home page", () => {
  cy.visit("/");
});

Given("I am logged in as {string} with password {string}", (email, pwd) => {
  cy.login(email, pwd);
});

// ── When ─────────────────────────────────────────────────────

When("I navigate to the account page", () => {
  accountPage.visitAccount();
});

When("I navigate to the profile page", () => {
  accountPage.visitProfile();
});

When("I navigate to the invoices page", () => {
  accountPage.visitInvoices();
});

When("I navigate to the favorites page", () => {
  accountPage.visitFavorites();
});

When("I navigate to the messages page", () => {
  accountPage.visitMessages();
});

When("I update my first name", () => {
  const updatedName = `Auto${Date.now()}`;
  accountPage.updateFirstName(updatedName);
});

When("I update my address details", () => {
  cy.fixture("checkout").then((data) => {
    accountPage.updateAddress(data.shippingAddresses[1]);
  });
});

When("I submit the current password {string}", (password) => {
  accountPage.changePassword(password);
});

// ── Then ─────────────────────────────────────────────────────

Then("the URL should contain {string}", (path) => {
  cy.url().should("include", path);
});

Then("the page title should be visible", () => {
  accountPage.assertPageTitleVisible();
});

Then("the profile navigation link should be visible", () => {
  accountPage.assertNavProfileVisible();
});

Then("the first name field should be visible", () => {
  accountPage.assertFirstNameVisible();
});

Then("a profile update feedback should appear", () => {
  accountPage.assertProfileUpdateFeedback();
});

Then("the invoices table should be visible", () => {
  accountPage.assertTableVisible();
});

Then("I should be able to view invoice details if available", () => {
  cy.get("body").then(($body) => {
    const hasBtn = $body.find("a.btn.btn-sm.btn-primary").length > 0;
    if (!hasBtn) {
      accountPage.assertTableVisible();
      return;
    }
    accountPage.clickFirstInvoiceDetail();
    accountPage.assertInvoiceDetailLoaded();
  });
});

Then("the street address field should be visible", () => {
  accountPage.assertStreetInputVisible();
});

Then("the postal code field should be visible", () => {
  accountPage.assertPostalCodeVisible();
});

Then("the country field should be visible", () => {
  accountPage.assertCountryInputVisible();
});

Then("a success alert should be visible", () => {
  accountPage.assertSuccessAlertVisible();
});

Then("I should be able to manage favorites if available", () => {
  cy.get("body").then(($body) => {
    const count = $body.find('[data-test^="favorite-"]').length;
    if (count === 0) {
      accountPage.assertPageTitleVisible();
      return;
    }
    cy.get('[data-test^="favorite-"]').its("length").then((before) => {
      accountPage.deleteFavorite();
      cy.get('[data-test^="favorite-"]').its("length").should("be.lt", before);
    });
    accountPage.assertFavoritesPageTitle();
  });
});

Then("invoice detail buttons should be visible if available", () => {
  cy.get("body").then(($body) => {
    if ($body.find("a.btn.btn-sm.btn-primary").length > 0) {
      cy.get("a.btn.btn-sm.btn-primary").first().should("be.visible");
    }
  });
});

Then("the change password button should remain visible", () => {
  accountPage.assertChangePasswordVisible();
});

Then("the current password field should remain visible", () => {
  accountPage.assertCurrentPasswordVisible();
});

Then("the user navigation menu should be visible", () => {
  navBar.assertMenuVisible();
});

Then("the messages content should be displayed", () => {
  accountPage.assertMessagesContent();
});
