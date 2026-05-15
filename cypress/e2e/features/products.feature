@products
Feature: Product Browsing and Search
  As a customer of the Practice Software Testing Toolshop
  I want to search, filter, sort, and browse products
  So that I can find the tools I need to purchase

  Background:
    Given I am on the home page

  # ── TC-007 ──────────────────────────────────────────────────
  @smoke @search
  Scenario: TC-007 - Search for a product successfully
    When I search for "Combination Pliers"
    Then the search caption should be visible
    And the search term should contain "Combination Pliers"
    And the product "Combination Pliers" should be visible
    And at least one product card should be displayed

  # ── TC-008 ──────────────────────────────────────────────────
  @negative @search
  Scenario: TC-008 - Search with no results
    When I search for "NonexistentProductXYZ123"
    Then the no results message should be visible
    And the search term should contain "NonexistentProductXYZ123"
    And no product cards should be displayed

  # ── TC-009 ──────────────────────────────────────────────────
  @filter
  Scenario: TC-009 - Filter products by category
    When I filter by category "Hand Tools"
    Then the "Hand Tools" category checkbox should be checked
    And at least one product card should be displayed
    And the first product name should be visible

  # ── TC-010 ──────────────────────────────────────────────────
  @filter
  Scenario: TC-010 - Filter products by price range
    When I filter by price range 0 to 25
    Then the sort dropdown should be visible
    And all product prices should be numeric and positive
    And the first product name should be visible

  # ── TC-011 ──────────────────────────────────────────────────
  @sort
  Scenario: TC-011 - Sort products by name A-Z
    When I sort products by "name,asc"
    Then the sort value should be "name,asc"
    And more than one product should be displayed
    And product names should be in ascending order

  # ── TC-012 ──────────────────────────────────────────────────
  @sort
  Scenario: TC-012 - Sort products by price Low to High
    When I sort products by "price,asc"
    Then the sort value should be "price,asc"
    And more than one product price should be displayed
    And product prices should be in ascending order

  # ── TC-013 ──────────────────────────────────────────────────
  @detail
  Scenario: TC-013 - View product details
    When I search for "Combination Pliers"
    And I click on the product "Combination Pliers"
    Then the product name should be visible on the detail page
    And the product description should be visible
    And the add to cart button should be visible

  # ── TC-014 ──────────────────────────────────────────────────
  @pagination
  Scenario: TC-014 - Pagination navigation
    Then I should be able to navigate through product pages
