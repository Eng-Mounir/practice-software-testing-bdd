# 🧪 Practice Software Testing — Cypress BDD Test Suite

[![Cypress BDD Tests](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/cypress.yml/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/cypress.yml)

> **Professional-grade** end-to-end testing framework for [practicesoftwaretesting.com](https://practicesoftwaretesting.com) using **Cypress**, **BDD Cucumber**, **Page Object Model**, and **GitHub Actions CI/CD**.

---

## 📋 Table of Contents

- [Architecture](#-architecture)
- [Test Coverage](#-test-coverage)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Running Tests](#-running-tests)
- [Project Structure](#-project-structure)
- [Page Object Model](#-page-object-model)
- [BDD Cucumber](#-bdd-cucumber)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Fixtures & Custom Commands](#-fixtures--custom-commands)

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   GitHub Actions CI/CD                   │
│         (Chrome + Firefox matrix, artifacts)             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ┌──────────────┐    ┌─────────────────────────────┐   │
│   │  .feature    │───>│  Step Definitions (.js)     │   │
│   │  (Gherkin)   │    │  Given / When / Then        │   │
│   └──────────────┘    └──────────┬──────────────────┘   │
│                                  │                      │
│                        ┌─────────▼─────────┐            │
│                        │  Page Objects     │            │
│                        │  (POM Pattern)    │            │
│                        └─────────┬─────────┘            │
│                                  │                      │
│                        ┌─────────▼─────────┐            │
│                        │ Custom Commands   │            │
│                        │ + Fixtures (JSON) │            │
│                        └─────────┬─────────┘            │
│                                  │                      │
│                        ┌─────────▼─────────┐            │
│                        │   Cypress Engine  │            │
│                        └───────────────────┘            │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 Test Coverage

| # | Suite | Test Cases | Scenarios |
|---|-------|-----------|-----------|
| 1 | **Authentication** | TC-001 → TC-006 | Login, invalid login, empty form, registration validation, logout |
| 2 | **Products** | TC-007 → TC-014 | Search, no results, category filter, price filter, sort, product detail, pagination |
| 3 | **Cart** | TC-015 → TC-021 | Add to cart, multiple quantities, view cart, update qty, remove, total calculation, continue shopping |
| 4 | **Checkout** | TC-022 → TC-028 | Proceed to checkout, shipping address, address validation, payment, payment methods, credit card, guest checkout |
| 5 | **Account** | TC-029 → TC-038 | Profile view, profile update, order history, invoice details, addresses, address update, favorites, invoices list, change password, messages |
| | **Total** | **38 Test Cases** | |

---

## 🛠 Tech Stack

| Component | Technology |
|-----------|-----------|
| Test Framework | Cypress v15 |
| BDD Layer | `@badeball/cypress-cucumber-preprocessor` |
| Bundler | `@bahmutov/cypress-esbuild-preprocessor` |
| Language | JavaScript (CommonJS) |
| Pattern | Page Object Model (POM) |
| CI/CD | GitHub Actions |
| Assertions | Chai (built-in) + Custom Commands |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# Install all dependencies
npm install
```

---

## 🧪 Running Tests

### BDD Cucumber Tests

```bash
# Run ALL BDD feature tests (headless)
npm run test:bdd

# Run specific feature suite
npm run test:bdd:auth        # Authentication (TC-001 → TC-006)
npm run test:bdd:products    # Products (TC-007 → TC-014)
npm run test:bdd:cart        # Cart (TC-015 → TC-021)
npm run test:bdd:checkout    # Checkout (TC-022 → TC-028)
npm run test:bdd:account     # Account (TC-029 → TC-038)

# Open Cypress GUI (interactive)
npm run test:bdd:open
```

### Original .cy.js Tests

```bash
# Run original test files
npm run test:original

# Run ALL tests (BDD + original)
npm run test:all
```

### Browser-specific

```bash
npm run test:chrome
npm run test:firefox
npm run test:headed
```

---

## 📁 Project Structure

```
testing3/
├── .github/
│   └── workflows/
│       └── cypress.yml                    # CI/CD Pipeline
├── cypress/
│   ├── e2e/
│   │   ├── 01-authentication.cy.js        # Original Project 1 tests
│   │   ├── 02-products.cy.js
│   │   ├── 03-cart.cy.js
│   │   ├── 04-checkout.cy.js
│   │   ├── 05-account.cy.js
│   │   └── features/                      # ✨ BDD Cucumber
│   │       ├── authentication.feature     # Gherkin scenarios
│   │       ├── authentication/
│   │       │   └── authentication.js      # Step definitions
│   │       ├── products.feature
│   │       ├── products/
│   │       │   └── products.js
│   │       ├── cart.feature
│   │       ├── cart/
│   │       │   └── cart.js
│   │       ├── checkout.feature
│   │       ├── checkout/
│   │       │   └── checkout.js
│   │       ├── account.feature
│   │       └── account/
│   │           └── account.js
│   ├── fixtures/                          # Test data (JSON)
│   │   ├── users.json
│   │   ├── products.json
│   │   └── checkout.json
│   ├── pages/                             # ✨ Page Object Model
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   ├── HomePage.js
│   │   ├── ProductDetailPage.js
│   │   ├── CartPage.js
│   │   ├── CheckoutPage.js
│   │   ├── AccountPage.js
│   │   └── NavBar.js
│   └── support/
│       ├── commands.js                    # Custom Cypress commands
│       └── e2e.js                         # Global hooks & config
├── cypress.config.js                      # Cypress + Cucumber config
├── package.json
├── .gitignore
└── README.md
```

---

## 🏛 Page Object Model

Each page of the application has a dedicated **Page Object class** that encapsulates:

- **Selectors** — CSS/data-test attribute selectors as getter properties
- **Actions** — Methods that perform user interactions (click, type, navigate)
- **Assertions** — Methods that verify expected outcomes

```javascript
// Example: LoginPage.js
class LoginPage {
  get emailInput()     { return '[data-test="email"]'; }
  get passwordInput()  { return '[data-test="password"]'; }
  get loginSubmitBtn() { return '[data-test="login-submit"]'; }

  login(email, password) {
    this.visit();
    this.fillEmail(email);
    this.fillPassword(password);
    this.clickSubmit();
  }

  assertOnLoginPage() {
    cy.url().should("include", "/auth/login");
  }
}
```

### Page Objects

| Page Object | Covers |
|-------------|--------|
| `LoginPage` | `/auth/login` — email, password, submit, errors |
| `RegisterPage` | `/auth/register` — form fields, validation |
| `HomePage` | `/` — search, filter, sort, pagination |
| `ProductDetailPage` | `/product/*` — name, description, add to cart |
| `CartPage` | `/checkout` step 1 — items, quantities, totals |
| `CheckoutPage` | `/checkout` steps 2-4 — shipping, payment |
| `AccountPage` | `/account/*` — profile, invoices, favorites |
| `NavBar` | Navigation bar — cart, menu, sign in/out |

---

## 🥒 BDD Cucumber

Tests are written in **Gherkin** syntax using `.feature` files:

```gherkin
@authentication @smoke
Scenario: TC-001 - Successful login with valid credentials
  Given I am on the login page
  When I enter email "customer@practicesoftwaretesting.com"
  And I enter password "welcome01"
  And I click the login button
  Then I should be redirected to the account page
  And the page title should display "My account"
  And the user navigation menu should be visible
```

**Step definitions** map Gherkin steps to Cypress commands using Page Objects:

```javascript
Given("I am on the login page", () => {
  loginPage.visit();
});

When("I enter email {string}", (email) => {
  loginPage.fillEmail(email);
});
```

---

## ⚙ CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/cypress.yml`) runs:

1. **BDD Tests** across Chrome and Firefox (matrix strategy)
2. **Regression Tests** using original `.cy.js` files
3. **Artifact Upload** — screenshots and videos on failure

```yaml
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
```

---

## 📦 Fixtures & Custom Commands

### Fixtures (`cypress/fixtures/`)

| File | Purpose |
|------|---------|
| `users.json` | Valid/invalid user credentials, registration data |
| `products.json` | Product names, categories, price ranges, sort options |
| `checkout.json` | Shipping addresses, payment methods, order data |

### Custom Commands (`cypress/support/commands.js`)

| Command | Description |
|---------|-------------|
| `cy.login(email, pass)` | Login with auto-recovery on account lock |
| `cy.logout()` | Sign out via navigation menu |
| `cy.searchProduct(term)` | Search for a product by name |
| `cy.viewProductDetails(name)` | Click into product detail page |
| `cy.addToCart(qty)` | Add current product to cart |
| `cy.viewCart()` | Navigate to cart page |
| `cy.filterByCategory(cat)` | Check category filter checkbox |
| `cy.filterByPrice(min, max)` | API-verified price range filter |
| `cy.sortProducts(option)` | Sort products dropdown |
| `cy.proceedToCheckout()` | Click proceed to checkout |
| `cy.fillShippingAddress(addr)` | Fill shipping form |
| `cy.completePayment(data)` | Complete bank transfer payment |
| `cy.verifyErrorMessage(msg)` | Assert error text visible |
| `cy.verifyProductInCart(name)` | Assert product exists in cart |

---

## 📄 License

ISC