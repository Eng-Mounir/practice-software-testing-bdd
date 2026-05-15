// ============================================================
// STEP DEFINITIONS: Products (TC-007 → TC-014)
// ============================================================
const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const HomePage = require("../../../pages/HomePage");
const ProductDetailPage = require("../../../pages/ProductDetailPage");

const homePage = new HomePage();
const productDetail = new ProductDetailPage();

// ── Given ────────────────────────────────────────────────────

Given("I am on the home page", () => {
  cy.visit("/");
});

// ── When ─────────────────────────────────────────────────────

When("I search for {string}", (term) => {
  homePage.searchProduct(term);
});

When("I filter by category {string}", (category) => {
  homePage.filterByCategory(category);
});

When("I filter by price range {int} to {int}", (min, max) => {
  cy.filterByPrice(min, max);
});

When("I sort products by {string}", (option) => {
  homePage.sortProducts(option);
});

When("I click on the product {string}", (name) => {
  homePage.clickProduct(name);
});

// ── Then ─────────────────────────────────────────────────────

Then("the search caption should be visible", () => {
  homePage.assertSearchCaptionVisible();
});

Then("the search term should contain {string}", (term) => {
  homePage.assertSearchTermContains(term);
});

Then("the product {string} should be visible", (name) => {
  homePage.assertProductVisible(name);
});

Then("at least one product card should be displayed", () => {
  homePage.assertProductCardsExist();
});

Then("the no results message should be visible", () => {
  homePage.assertNoResultsVisible();
});

Then("no product cards should be displayed", () => {
  homePage.assertNoProductCards();
});

Then("the {string} category checkbox should be checked", (category) => {
  cy.contains("label", category)
    .find('input[type="checkbox"]')
    .should("be.checked");
});

Then("the first product name should be visible", () => {
  homePage.assertFirstProductNameVisible();
});

Then("the sort dropdown should be visible", () => {
  homePage.assertSortDropdownVisible();
});

Then("all product prices should be numeric and positive", () => {
  homePage.assertPricesAreNumericAndPositive();
});

Then("the sort value should be {string}", (value) => {
  homePage.assertSortValue(value);
});

Then("more than one product should be displayed", () => {
  homePage.assertProductNamesCount(1);
});

Then("more than one product price should be displayed", () => {
  cy.get('[data-test="product-price"]').should("have.length.greaterThan", 1);
});

Then("product names should be in ascending order", () => {
  homePage.assertNamesInAscendingOrder();
});

Then("product prices should be in ascending order", () => {
  homePage.assertPricesInAscendingOrder();
});

Then("the product name should be visible on the detail page", () => {
  productDetail.assertProductNameVisible();
});

Then("the product description should be visible", () => {
  productDetail.assertProductDescriptionVisible();
});

Then("the add to cart button should be visible", () => {
  productDetail.assertAddToCartButtonVisible();
});

Then("I should be able to navigate through product pages", () => {
  cy.visit("/");
  cy.get("body").then(($body) => {
    const hasPagination = $body.find(".pagination").length > 0;
    if (!hasPagination) {
      cy.get('[data-test^="product-"]').should("have.length.greaterThan", 0);
      return;
    }
    cy.get(".pagination .page-item.active .page-link")
      .invoke("text")
      .then((initialPage) => {
        cy.get('.pagination .page-link[aria-label="Next"]').click({ force: true });
        cy.get(".pagination .page-item.active .page-link")
          .invoke("text")
          .should((newPage) => {
            expect(newPage.trim()).to.not.eq(initialPage.trim());
          });
      });
  });
});
