// ============================================================
// PAGE OBJECT: Cart / Checkout Step 1 (/checkout)
// ============================================================

class CartPage {
  // ── Selectors ──────────────────────────────────────────────
  get cartTotal()          { return '[data-test="cart-total"]'; }
  get cartSubtotal()       { return '[data-test="cart-subtotal"]'; }
  get productTitle()       { return '[data-test="product-title"]'; }
  get proceedBtn1()        { return '[data-test="proceed-1"]'; }
  get continueShoppingBtn(){ return '[data-test="continue-shopping"]'; }

  // ── Actions ────────────────────────────────────────────────
  getProductQuantityInput(productName) {
    return cy.contains("tr", productName).find('input[data-test="product-quantity"]');
  }

  updateQuantity(productName, newQty) {
    this.getProductQuantityInput(productName).clear().type(String(newQty));
    cy.wait(1000);
  }

  removeProduct(productName) {
    cy.contains("tr", productName).find("a.btn-danger").click();
    cy.wait(1000);
  }

  proceedToCheckout() {
    cy.get(this.proceedBtn1).click();
    cy.wait(1500);
  }

  clickContinueShopping() {
    cy.get(this.continueShoppingBtn).click();
  }

  // ── Assertions ─────────────────────────────────────────────
  assertOnCheckoutPage() {
    cy.url().should("include", "/checkout");
  }

  assertProductInCart(name) {
    cy.get(this.productTitle).contains(name).should("be.visible");
  }

  assertQuantityValue(productName, expectedQty) {
    this.getProductQuantityInput(productName).should("have.value", String(expectedQty));
  }

  assertQuantityAtLeast(productName, minQty) {
    this.getProductQuantityInput(productName).invoke("val").then((val) => {
      expect(Number(val)).to.be.gte(minQty);
    });
  }

  assertCartTotalVisible() {
    cy.get(this.cartTotal).should("be.visible");
  }

  assertCartTotalGreaterThanZero() {
    cy.get(this.cartTotal).then(($el) => {
      const total = parseFloat($el.text().replace("$", ""));
      expect(total).to.be.greaterThan(0);
    });
  }

  assertProductRemoved(productName) {
    cy.get("body").should("not.contain", productName);
  }

  assertEmptyOrRemainingProducts() {
    cy.get("body").then(($body) => {
      const hasRow = $body.find('[data-test="product-title"]').length > 0;
      if (!hasRow) {
        cy.contains(/empty|nothing/i).should("be.visible");
      } else {
        cy.get(this.cartTotal).should("be.visible");
      }
    });
  }

  assertCartContainsBothProducts(name1, name2) {
    cy.get(this.productTitle).should("contain", name1);
    cy.get(this.productTitle).should("contain", name2);
  }

  assertCartTotalMatchesLineItems() {
    cy.get("body").then(($body) => {
      const parseMoney = (text) => Number(String(text).replace(/[^\d.-]/g, ""));
      const shownTotal = parseMoney($body.find('[data-test="cart-total"]').text());

      const hasSubtotal = $body.find('[data-test="cart-subtotal"]').length > 0;
      if (hasSubtotal) {
        const subtotal = parseMoney($body.find('[data-test="cart-subtotal"]').text());
        const discount = $body.find('[data-test="cart-discount"]').length
          ? parseMoney($body.find('[data-test="cart-discount"]').text())
          : 0;
        const ecoDiscount = $body.find('[data-test="cart-eco-discount"]').length
          ? parseMoney($body.find('[data-test="cart-eco-discount"]').text())
          : 0;
        const expectedTotal = Number((subtotal - discount - ecoDiscount).toFixed(2));
        expect(Math.abs(shownTotal - expectedTotal)).to.be.lessThan(0.02);
        return;
      }

      let rowSum = 0;
      $body.find("tbody tr").each((_, row) => {
        const $row = Cypress.$(row);
        const discountedLine = $row.find("#discount-total-price").text();
        const regularLine = $row.find('[data-test="line-price"]').text();
        const effectiveText = discountedLine || regularLine;
        if (effectiveText) {
          rowSum += parseMoney(effectiveText);
        }
      });

      const expectedFromRows = Number(rowSum.toFixed(2));
      expect(Math.abs(shownTotal - expectedFromRows)).to.be.lessThan(0.02);
    });
  }

  assertBackOnHomePage() {
    cy.url().should("match", /practicesoftwaretesting\.com\/$/);
  }

  assertSearchQueryVisible() {
    cy.get('[data-test="search-query"]').should("be.visible");
  }
}

module.exports = CartPage;
