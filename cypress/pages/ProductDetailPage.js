// ============================================================
// PAGE OBJECT: Product Detail Page (/product/{slug})
// ============================================================

class ProductDetailPage {
  // ── Selectors ──────────────────────────────────────────────
  get productName()      { return '[data-test="product-name"]'; }
  get productDesc()      { return '[data-test="product-description"]'; }
  get quantityInput()    { return 'input[data-test="quantity"]'; }
  get addToCartBtn()     { return 'button[data-test="add-to-cart"]'; }

  // ── Actions ────────────────────────────────────────────────
  setQuantity(qty) {
    cy.get(this.quantityInput).click().type(`{selectAll}{backspace}${qty}`);
  }

  clickAddToCart() {
    cy.get(this.addToCartBtn).click();
    cy.wait(1000);
  }

  addToCart(qty = 1) {
    this.setQuantity(qty);
    this.clickAddToCart();
  }

  // ── Assertions ─────────────────────────────────────────────
  assertProductNameVisible() {
    cy.get(this.productName).should("be.visible");
  }

  assertProductDescriptionVisible() {
    cy.get(this.productDesc).should("be.visible");
  }

  assertAddToCartButtonVisible() {
    cy.get(this.addToCartBtn).should("be.visible");
  }

  assertAddToCartNotDisabled() {
    cy.get(this.addToCartBtn).should("not.be.disabled");
  }

  assertQuantityInputVisible() {
    cy.get(this.quantityInput).should("be.visible");
  }

  assertProductNameContains(name) {
    cy.contains(name).should("be.visible");
  }
}

module.exports = ProductDetailPage;
