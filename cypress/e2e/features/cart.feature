@cart
Feature: Shopping Cart
  As a customer of the Practice Software Testing Toolshop
  I want to manage products in my shopping cart
  So that I can prepare my order before checkout

  Background:
    Given I am on the home page

  # ── TC-015 ──────────────────────────────────────────────────
  @smoke @add
  Scenario: TC-015 - Add product to cart successfully
    When I search for "Combination Pliers"
    And I click on the product "Combination Pliers"
    And I add 1 item to the cart
    Then the cart quantity should show "1"
    And the add to cart button should be visible
    And the product "Combination Pliers" should still be visible

  # ── TC-016 ──────────────────────────────────────────────────
  @add
  Scenario: TC-016 - Add multiple quantities of same product
    When I search for "Combination Pliers"
    And I click on the product "Combination Pliers"
    And I add 3 items to the cart
    Then the cart quantity should show "3"
    And the quantity input should be visible
    And the add to cart button should not be disabled

  # ── TC-017 ──────────────────────────────────────────────────
  @view
  Scenario: TC-017 - View cart contents
    When I search for "Combination Pliers"
    And I click on the product "Combination Pliers"
    And I add 2 items to the cart
    And I navigate to the cart
    Then the URL should contain "/checkout"
    And "Combination Pliers" should be in the cart
    And the quantity of "Combination Pliers" should be at least 2

  # ── TC-018 ──────────────────────────────────────────────────
  @update
  Scenario: TC-018 - Update product quantity in cart
    When I search for "Combination Pliers"
    And I click on the product "Combination Pliers"
    And I add 1 item to the cart
    And I navigate to the cart
    And I update the quantity of "Combination Pliers" to 5
    Then the cart total should be visible
    And the quantity of "Combination Pliers" should be "5"
    And the cart total should be greater than zero

  # ── TC-019 ──────────────────────────────────────────────────
  @remove
  Scenario: TC-019 - Remove product from cart
    When I search for "Combination Pliers"
    And I click on the product "Combination Pliers"
    And I add 1 item to the cart
    And I navigate to the cart
    And I remove "Combination Pliers" from the cart
    Then "Combination Pliers" should not be in the cart
    And the cart should show empty state or remaining products
    And the URL should contain "/checkout"

  # ── TC-020 ──────────────────────────────────────────────────
  @calculation
  Scenario: TC-020 - Calculate correct cart total with multiple products
    When I search for "Combination Pliers"
    And I click on the product "Combination Pliers"
    And I add 2 items to the cart
    And I search for "Claw Hammer"
    And I click on the product "Claw Hammer"
    And I add 1 item to the cart
    And I navigate to the cart
    Then both "Combination Pliers" and "Claw Hammer" should be in the cart
    And the cart total should be visible
    And the cart total should match line items

  # ── TC-021 ──────────────────────────────────────────────────
  @navigation
  Scenario: TC-021 - Continue shopping from cart
    When I search for "Combination Pliers"
    And I click on the product "Combination Pliers"
    And I add 1 item to the cart
    And I navigate to the cart
    And I click continue shopping
    Then I should be back on the home page
    And the products listing should be visible
    And the cart quantity should show "1"
