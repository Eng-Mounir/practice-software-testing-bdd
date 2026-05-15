// ============================================================
// PAGE OBJECT: Home / Product Listing Page (/)
// ============================================================

class HomePage {
  // ── Selectors ──────────────────────────────────────────────
  get searchInput()      { return 'input[data-test="search-query"]'; }
  get searchSubmitBtn()  { return 'button[data-test="search-submit"]'; }
  get searchCaption()    { return '[data-test="search-caption"]'; }
  get searchTerm()       { return '[data-test="search-term"]'; }
  get noResults()        { return '[data-test="no-results"]'; }
  get productCards()     { return '[data-test^="product-"]'; }
  get productNames()     { return '[data-test="product-name"]'; }
  get productPrices()    { return '[data-test="product-price"]'; }
  get sortDropdown()     { return '[data-test="sort"]'; }
  get pagination()       { return '.pagination'; }
  get activePage()       { return '.pagination .page-item.active .page-link'; }
  get nextPageBtn()      { return '.pagination .page-link[aria-label="Next"]'; }

  // ── Actions ────────────────────────────────────────────────
  visit() {
    cy.visit("/");
  }

  searchProduct(term) {
    this.visit();
    cy.get(this.searchInput).clear().type(term, { delay: 50 });
    cy.get(this.searchSubmitBtn).click();
    cy.wait(2000);
  }

  filterByCategory(category) {
    cy.contains("label", category)
      .find('input[type="checkbox"]')
      .check({ force: true });
    cy.wait(1500);
  }

  sortProducts(sortOption) {
    cy.get(this.sortDropdown).select(sortOption);
    cy.wait(1500);
  }

  clickProduct(productName) {
    cy.contains("a", productName).click();
    cy.wait(2000);
  }

  clickNextPage() {
    cy.get(this.nextPageBtn).click({ force: true });
  }

  // ── Assertions ─────────────────────────────────────────────
  assertSearchCaptionVisible() {
    cy.get(this.searchCaption).should("be.visible");
  }

  assertSearchTermContains(term) {
    cy.get(this.searchTerm).should("contain", term);
  }

  assertProductVisible(name) {
    cy.contains(name).should("be.visible");
  }

  assertProductCardsExist() {
    cy.get(this.productCards).should("have.length.greaterThan", 0);
  }

  assertNoProductCards() {
    cy.get(this.productCards).should("have.length", 0);
  }

  assertNoResultsVisible() {
    cy.get(this.noResults).should("be.visible");
  }

  assertSortValue(value) {
    cy.get(this.sortDropdown).should("have.value", value);
  }

  assertSortDropdownVisible() {
    cy.get(this.sortDropdown).should("be.visible");
  }

  assertProductNamesCount(minCount) {
    cy.get(this.productNames).should("have.length.greaterThan", minCount);
  }

  assertFirstProductNameVisible() {
    cy.get(this.productNames).first().should("be.visible");
  }

  assertNamesInAscendingOrder() {
    cy.get(this.productNames).first().then(($first) => {
      const firstName = $first.text().trim().toLowerCase();
      cy.get(this.productNames).last().then(($last) => {
        const lastName = $last.text().trim().toLowerCase();
        expect(firstName <= lastName).to.be.true;
      });
    });
  }

  assertPricesInAscendingOrder() {
    cy.get(this.productPrices).then(($prices) => {
      const prices = [...$prices].map((el) =>
        parseFloat(el.textContent.replace("$", "").trim())
      );
      for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).to.be.lte(prices[i + 1]);
      }
    });
  }

  assertPricesAreNumericAndPositive() {
    cy.get(this.productPrices).each(($el) => {
      const price = parseFloat($el.text().replace("$", "").trim());
      expect(Number.isNaN(price)).to.eq(false);
      expect(price).to.be.gte(0);
    });
  }

  assertPaginationExists() {
    return cy.get("body").then(($body) => {
      return $body.find(this.pagination).length > 0;
    });
  }

  assertActivePageChanged(initialPage) {
    cy.get(this.activePage).invoke("text").should((newPage) => {
      expect(newPage.trim()).to.not.eq(initialPage.trim());
    });
  }

  getActivePageText() {
    return cy.get(this.activePage).invoke("text");
  }
}

module.exports = HomePage;
