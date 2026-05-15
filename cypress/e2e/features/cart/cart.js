// ============================================================
// STEP DEFINITIONS: Cart (TC-015 → TC-021)
// ============================================================
const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const HomePage = require("../../../pages/HomePage");
const ProductDetailPage = require("../../../pages/ProductDetailPage");
const CartPage = require("../../../pages/CartPage");
const NavBar = require("../../../pages/NavBar");

const homePage = new HomePage();
const productDetail = new ProductDetailPage();
const cartPage = new CartPage();
const navBar = new NavBar();

// ── Given ────────────────────────────────────────────────────

Given("I am on the home page", () => {
  cy.visit("/");
});

// ── When ─────────────────────────────────────────────────────

When("I search for {string}", (term) => {
  homePage.searchProduct(term);
});

When("I click on the product {string}", (name) => {
  homePage.clickProduct(name);
});

When("I add {int} item(s) to the cart", (qty) => {
  productDetail.addToCart(qty);
});

When("I navigate to the cart", () => {
  navBar.clickCart();
});

When("I update the quantity of {string} to {int}", (name, qty) => {
  cartPage.updateQuantity(name, qty);
});

When("I remove {string} from the cart", (name) => {
  cartPage.removeProduct(name);
});

When("I proceed to checkout", () => {
  cartPage.proceedToCheckout();
});

When("I click continue shopping", () => {
  cartPage.clickContinueShopping();
});

// ── Then ─────────────────────────────────────────────────────

Then("the cart quantity should show {string}", (qty) => {
  navBar.assertCartQuantity(qty);
});

Then("the add to cart button should be visible", () => {
  productDetail.assertAddToCartButtonVisible();
});

Then("the product {string} should still be visible", (name) => {
  productDetail.assertProductNameContains(name);
});

Then("the quantity input should be visible", () => {
  productDetail.assertQuantityInputVisible();
});

Then("the add to cart button should not be disabled", () => {
  productDetail.assertAddToCartNotDisabled();
});

Then("the URL should contain {string}", (path) => {
  cy.url().should("include", path);
});

Then("{string} should be in the cart", (name) => {
  cartPage.assertProductInCart(name);
});

Then("the quantity of {string} should be at least {int}", (name, qty) => {
  cartPage.assertQuantityAtLeast(name, qty);
});

Then("the cart total should be visible", () => {
  cartPage.assertCartTotalVisible();
});

Then("the quantity of {string} should be {string}", (name, qty) => {
  cartPage.assertQuantityValue(name, qty);
});

Then("the cart total should be greater than zero", () => {
  cartPage.assertCartTotalGreaterThanZero();
});

Then("{string} should not be in the cart", (name) => {
  cartPage.assertProductRemoved(name);
});

Then("the cart should show empty state or remaining products", () => {
  cartPage.assertEmptyOrRemainingProducts();
});

Then("both {string} and {string} should be in the cart", (name1, name2) => {
  cartPage.assertCartContainsBothProducts(name1, name2);
});

Then("the cart total should match line items", () => {
  cartPage.assertCartTotalMatchesLineItems();
});

Then("I should be back on the home page", () => {
  cartPage.assertBackOnHomePage();
});

Then("the products listing should be visible", () => {
  cartPage.assertSearchQueryVisible();
});
