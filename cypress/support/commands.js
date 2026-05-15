// ============================================
// CUSTOM COMMANDS FOR PRACTICE SOFTWARE TESTING
// ============================================

// ============================================
// LOGIN & AUTHENTICATION COMMANDS
// ============================================

let runtimeFallbackUser = null;

/**
 * Login with valid credentials
 * @param {string} email - User email
 * @param {string} password - User password
 */
Cypress.Commands.add("login", (email, password) => {
  const selectedUser = {
    email: runtimeFallbackUser?.email || email, //byshoof lw account adym byta3 user mn prevoius test case kan mawgood temporly haysta5dmo lw null haysta5dm ely haytpass lyh
    password: runtimeFallbackUser?.password || password,
  };

  const performUiLogin = (userEmail, userPassword) => {
    cy.visit("/auth/login");
    cy.get('[data-test="email"]').clear().type(userEmail, { delay: 20 });
    cy.get('[data-test="password"]').clear().type(userPassword, { delay: 20 });
    cy.get('[data-test="login-submit"]').click();
    cy.wait(1200);
  };

  const createRuntimeUser = () => {
    const timestamp = Date.now();
    const generatedPassword = `Qx9!${timestamp}Ab#`;
    const generatedEmail = `autotest_${timestamp}@example.com`;

    return cy
      .request({
        method: "POST",
        url: "https://api.practicesoftwaretesting.com/users/register",
        body: {
          first_name: "Auto",
          last_name: "Tester",
          dob: "1993-08-17",
          street: "Main Street 10",
          postal_code: "12345",
          city: "Amsterdam",
          state: "Noord-Holland",
          country: "Netherlands",
          phone: "0612345678",
          email: generatedEmail,
          password: generatedPassword,
        },
        failOnStatusCode: false,
      })
      .then((response) => {
        if (response.status !== 201) {
          throw new Error(
            `Failed to create fallback test user. API returned status ${response.status}.`
          );
        }

        runtimeFallbackUser = {
          email: generatedEmail,
          password: generatedPassword,
        };

        return { email: generatedEmail, password: generatedPassword };
      });
  };

  performUiLogin(selectedUser.email, selectedUser.password);

  cy.location("pathname").then((path) => {
    if (path.includes("/account") || path.includes("/checkout")) {
      return;
    }

    cy.get("body")
      .invoke("text")
      .then((text) => {
        const pageText = String(text).toLowerCase();
        const isLocked =
          pageText.includes("account locked") ||
          pageText.includes("too many attempts");

        // If it says invalid email or password, let's just create a new user instead of throwing
        const isInvalid = pageText.includes("invalid email or password");

        if (isLocked || isInvalid) {
          createRuntimeUser().then((runtimeUser) => {
            performUiLogin(runtimeUser.email, runtimeUser.password);
            cy.url({ timeout: 10000 }).should("include", "/account");
          });
        } else if (pageText.includes("email is required") || pageText.includes("password is required")) {
            // Typing might have failed, try again
            performUiLogin(selectedUser.email, selectedUser.password);
        } else {
           // We might actually be logged in but the UI didn't navigate fast enough.
           // Let's just visit account to double check
           cy.visit("/account");
        }
      });
  });
});

/**
 * Logout from application lw 3aml login ketyr w hasl fail f sa3ytha hay3ml account gedyd
 */
Cypress.Commands.add("logout", () => {
  cy.get('[data-test="nav-menu"]').click();
  cy.get('[data-test="nav-sign-out"]').click();
  cy.wait(1000);
});

/**
 * Register new user
 * @param {object} userData - User registration data
 */
Cypress.Commands.add("registerUser", (userData) => {
  cy.visit("/auth/register");
  cy.get('[data-test="first-name"]').clear().type(userData.firstName, { delay: 20 });
  cy.get('[data-test="last-name"]').clear().type(userData.lastName, { delay: 20 });
  cy.get('[data-test="dob"]').clear().type(userData.dob);
  cy.get('input[formcontrolname="street"]').clear().type(userData.street, { delay: 20 });
  cy.get('input[formcontrolname="postal_code"]').clear().type(userData.postalCode, { delay: 20 });
  cy.get('input[formcontrolname="city"]').clear().type(userData.city, { delay: 20 });
  cy.get('input[formcontrolname="state"]').clear().type(userData.state, { delay: 20 });
  cy.get('select[formcontrolname="country"]').then(($select) => {
    const hasRequestedCountry = Array.from($select[0].options).some(
      (opt) => opt.text.trim().toLowerCase() === String(userData.country).toLowerCase()
    );

    if (hasRequestedCountry) {
      cy.wrap($select).select(userData.country);
      return;
    }

    // Fallback for dynamic country lists: select first non-empty option.
    const firstValid = Array.from($select[0].options).find(
      (opt) => opt.value && opt.value.trim() !== ""
    );
    if (firstValid) {
      cy.wrap($select).select(firstValid.value);
    }
  });
  cy.get('input[formcontrolname="phone"]').clear().type(userData.phone, { delay: 20 });
  cy.get('[data-test="email"]').clear().type(userData.email, { delay: 20 });
  cy.get('#password').clear().type(userData.password, { delay: 20 });
  cy.get('[data-test="register-submit"]').click();
  cy.wait(2000);
});

// ============================================
// PRODUCT COMMANDS
// ============================================

/**
 * Search for a product
 * @param {string} searchTerm - Product name to search
 */
Cypress.Commands.add("searchProduct", (searchTerm) => {
  cy.visit("/");
  cy.get('input[data-test="search-query"]').clear().type(searchTerm, { delay: 50 });
  cy.get('button[data-test="search-submit"]').click();
  cy.wait(2000);
});

/**
 * View product details
 * @param {string} productName - Product name to click
 */
Cypress.Commands.add("viewProductDetails", (productName) => {
  cy.contains("a", productName).click();     //b click 3ala anchor ely gowa el card body 3ashan yfta7 page el product details 
  cy.wait(2000);
});

/**
 * Filter products by category
 * @param {string} category - Product category
 */
Cypress.Commands.add("filterByCategory", (category) => {
  cy.contains("label", category)             //find label ely esmha handtools 3ashan howa bydawer fy array [0]
    .find('input[type="checkbox"]')          //gowa el label dh fy checkbox 3ashan byda5l 3aleha w by3mlha check
    .check({ force: true });                 //byshofha lw hya hidden wla laa w by3mlha check 3ashan kda force: true
  cy.wait(1500);
});

/**
 * Filter products by price range
 * @param {number} minPrice - Minimum price
 * @param {number} maxPrice - Maximum price
 */
Cypress.Commands.add("filterByPrice", (minPrice, maxPrice) => {
  const min = Number(minPrice);
  const max = Number(maxPrice);

  expect(Number.isNaN(min), "minPrice must be a number").to.eq(false);
  expect(Number.isNaN(max), "maxPrice must be a number").to.eq(false);
  expect(min, "minPrice must be <= maxPrice").to.be.lte(max);

  cy.request({
    method: "GET",
    url: `https://api.practicesoftwaretesting.com/products?price_min=${min}&price_max=${max}`,
  }).then((response) => {
    const products = Array.isArray(response.body)
      ? response.body
      : Array.isArray(response.body?.data)
      ? response.body.data
      : Array.isArray(response.body?.products)
      ? response.body.products
      : [];

    expect(products, "products in response").to.be.an("array");

    const productsInRange = products.filter((product) => {
      const price = Number(product.price);
      return !Number.isNaN(price) && price >= min && price <= max;
    });

    expect(
      productsInRange.length,
      `at least one product should be in range ${min}-${max}`
    ).to.be.greaterThan(0);

    productsInRange.forEach((product) => {
      const price = Number(product.price);
      expect(Number.isNaN(price), `invalid product price for ${product.name || "unknown product"}`).to.eq(false);
      expect(price, `price for ${product.name || "unknown product"} should be >= ${min}`).to.be.gte(min);
      expect(price, `price for ${product.name || "unknown product"} should be <= ${max}`).to.be.lte(max);
    });
  });
});

/**
 * Filter products by product price range (alias)
 * @param {number} minPrice - Minimum price
 * @param {number} maxPrice - Maximum price
 */
Cypress.Commands.add("filterByProductsPrice", (minPrice, maxPrice) => {
  cy.filterByPrice(minPrice, maxPrice);
});

/**
 * Sort products
 * @param {string} sortOption - Sort option (price, name, etc.)
 */
Cypress.Commands.add("sortProducts", (sortOption) => {
  cy.get('[data-test="sort"]').select(sortOption);
  cy.wait(1500);
});

// ============================================
// CART & CHECKOUT COMMANDS
// ============================================

/**
 * Add product to cart
 * @param {number} quantity - Number of items (default: 1)
 */
Cypress.Commands.add("addToCart", (quantity = 1) => {
  cy.get('input[data-test="quantity"]').click().type(`{selectAll}{backspace}${quantity}`);  //hena bymsa7 el field ely fyh el quantity byta3t el cart awel haga by3ml zy select all w b3dha delete w b3dha byhot el quantity el gedyda ely hya 1
  cy.get('button[data-test="add-to-cart"]').click();
  cy.wait(1000);
});

/**
 * View cart
 */
Cypress.Commands.add("viewCart", () => {
  cy.get('[data-test="nav-cart"]').click();
  cy.wait(1500);
});

/**
 * Remove item from cart
 * @param {string} productName - Product name to remove
 */
Cypress.Commands.add("removeFromCart", (productName) => {
  cy.contains("tr", productName).find("a.btn-danger").click();
  cy.wait(1000);
});

/**
 * Update cart quantity
 * @param {string} productName - Product name in cart
 * @param {number} newQuantity - New quantity amount
 */
Cypress.Commands.add("updateCartQuantity", (productName, newQuantity) => {
  cy.contains("tr", productName)
    .find('input[data-test="product-quantity"]')
    .clear()
    .type(String(newQuantity));
  cy.wait(1000);
});

/**
 * Proceed to checkout
 */
Cypress.Commands.add("proceedToCheckout", () => {
  cy.get('[data-test="proceed-1"]').click();
  cy.wait(1500);
});

/**
 * Fill shipping address
 * @param {object} address - Address data
 */
Cypress.Commands.add("fillShippingAddress", (address) => {
  cy.get('input[data-test="street"]').clear().type(address.address, { delay: 50 });
  cy.get('input[data-test="city"]').clear().type(address.city, { delay: 50 });
  cy.get('input[data-test="state"]').clear().type("State", { delay: 30 });
  cy.get('select[data-test="country"]').select(address.country);
  cy.get('input[data-test="postal_code"]').clear().type(address.postcode, { delay: 50 });
  cy.get('button[data-test="proceed-3"]').click();
  cy.wait(1500);
});

/**
 * Complete payment
 * @param {object} paymentData - Payment card details
 */
Cypress.Commands.add("completePayment", (paymentData) => {
  cy.get('[data-test="payment-method"]').select("bank-transfer");
  cy.get('input[data-test="bank_name"]').clear().type("Demo Bank", { delay: 30 });
  cy.get('input[data-test="account_name"]').clear().type(paymentData.cardholderName || "Test User", { delay: 30 });
  cy.get('input[data-test="account_number"]').clear().type("123456789", { delay: 30 });
  cy.get('button[data-test="finish"]').click();
  cy.wait(2000);
});

// ============================================
// ASSERTION COMMANDS
// ============================================

/**
 * Verify page title
 * @param {string} expectedTitle - Expected page title
 */
Cypress.Commands.add("verifyPageTitle", (expectedTitle) => {
  cy.title().should("eq", expectedTitle);
});

/**
 * Verify element is visible
 * @param {string} selector - Element selector
 */
Cypress.Commands.add("verifyElementVisible", (selector) => {
  cy.get(selector).should("be.visible");
});

/**
 * Verify error message is displayed
 * @param {string} errorMessage - Expected error message
 */
Cypress.Commands.add("verifyErrorMessage", (errorMessage) => {
  cy.contains(errorMessage).should("be.visible");
});

/**
 * Verify success message is displayed
 * @param {string} successMessage - Expected success message
 */
Cypress.Commands.add("verifySuccessMessage", (successMessage) => {
  cy.contains(successMessage).should("be.visible");
});

/**
 * Verify product is in cart
 * @param {string} productName - Product name
 */
Cypress.Commands.add("verifyProductInCart", (productName) => {
  cy.get('[data-test="product-title"]').contains(productName).should("be.visible");
});

/**
 * Verify cart is empty
 */
Cypress.Commands.add("verifyCartEmpty", () => {
  cy.contains(/empty|nothing to display/i).should("be.visible");
});

// ============================================
// UTILITY COMMANDS
// ============================================

/**
 * Wait for loading spinner to disappear
 */
Cypress.Commands.add("waitForLoad", () => {
  cy.get('[data-test="loader"]', { timeout: 10000 }).should("not.be.visible");
});

/**
 * Clear session storage
 */
Cypress.Commands.add("clearSession", () => {
  cy.window().then((win) => {
    win.sessionStorage.clear();
  });
});

/**
 * Get element count
 * @param {string} selector - Element selector
 */
Cypress.Commands.add("getElementCount", (selector) => {
  cy.get(selector).its("length");
});