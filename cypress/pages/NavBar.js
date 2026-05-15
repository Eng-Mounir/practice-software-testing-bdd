// ============================================================
// PAGE OBJECT: Navigation Bar Component
// ============================================================

class NavBar {
  get cartQuantity()   { return '[data-test="cart-quantity"]'; }
  get navCart()         { return '[data-test="nav-cart"]'; }
  get navMenu()        { return '[data-test="nav-menu"]'; }
  get navSignOut()     { return '[data-test="nav-sign-out"]'; }
  get navSignIn()      { return '[data-test="nav-sign-in"]'; }

  clickCart() {
    cy.get(this.navCart).click();
    cy.wait(1500);
  }

  clickMenu() {
    cy.get(this.navMenu).click();
  }

  clickSignOut() {
    this.clickMenu();
    cy.get(this.navSignOut).click();
    cy.wait(1000);
  }

  assertCartQuantity(expected) {
    cy.get(this.cartQuantity).should("contain", String(expected));
  }

  assertMenuVisible() {
    cy.get(this.navMenu).should("be.visible");
  }

  assertMenuNotExist() {
    cy.get(this.navMenu).should("not.exist");
  }

  assertSignInVisible() {
    cy.get(this.navSignIn).should("be.visible");
  }

  assertNotOnAccountPage() {
    cy.url().should("not.include", "/account");
  }
}

module.exports = NavBar;
