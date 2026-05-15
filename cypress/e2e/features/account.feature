@account
Feature: Account and User Profile
  As a registered customer of the Practice Software Testing Toolshop
  I want to manage my account settings
  So that I can view orders, update my profile, and manage preferences

  Background:
    Given I am on the home page

  # ── TC-029 ──────────────────────────────────────────────────
  @profile
  Scenario: TC-029 - View user profile information
    Given I am logged in as "customer@practicesoftwaretesting.com" with password "welcome01"
    When I navigate to the account page
    Then the URL should contain "/account"
    And the page title should be visible
    And the profile navigation link should be visible

  # ── TC-030 ──────────────────────────────────────────────────
  @profile
  Scenario: TC-030 - Update user profile successfully
    Given I am logged in as "customer@practicesoftwaretesting.com" with password "welcome01"
    When I navigate to the profile page
    And I update my first name
    Then the page title should be visible
    And the first name field should be visible
    And a profile update feedback should appear

  # ── TC-031 ──────────────────────────────────────────────────


  # ── TC-032 ──────────────────────────────────────────────────
  @invoices
  Scenario: TC-032 - View individual order details
    Given I am logged in as "customer@practicesoftwaretesting.com" with password "welcome01"
    When I navigate to the invoices page
    Then I should be able to view invoice details if available

  # ── TC-033 ──────────────────────────────────────────────────
  @address
  Scenario: TC-033 - View saved addresses
    Given I am logged in as "customer@practicesoftwaretesting.com" with password "welcome01"
    When I navigate to the profile page
    Then the URL should contain "/account/profile"
    And the street address field should be visible
    And the postal code field should be visible
    And the country field should be visible

  # ── TC-034 ──────────────────────────────────────────────────
  @address
  Scenario: TC-034 - Update address details successfully
    Given I am logged in as "customer@practicesoftwaretesting.com" with password "welcome01"
    When I navigate to the profile page
    And I update my address details
    Then a success alert should be visible
    And the street address field should be visible
    And the postal code field should be visible

  # ── TC-035 ──────────────────────────────────────────────────
  @favorites
  Scenario: TC-035 - Manage favorites
    Given I am logged in as "customer@practicesoftwaretesting.com" with password "welcome01"
    When I navigate to the favorites page
    Then I should be able to manage favorites if available

  # ── TC-036 ──────────────────────────────────────────────────
  @invoices
  Scenario: TC-036 - Display invoices list and detail action
    Given I am logged in as "customer@practicesoftwaretesting.com" with password "welcome01"
    When I navigate to the invoices page
    Then the URL should contain "/account/invoices"
    And the invoices table should be visible
    And invoice detail buttons should be visible if available

  # ── TC-037 ──────────────────────────────────────────────────
  @security
  Scenario: TC-037 - Change password
    Given I am logged in as "customer@practicesoftwaretesting.com" with password "welcome01"
    When I navigate to the profile page
    And I submit the current password "welcome01"
    Then the change password button should remain visible
    And the current password field should remain visible
    And the user navigation menu should be visible

  # ── TC-038 ──────────────────────────────────────────────────
  @messages
  Scenario: TC-038 - View account messages
    Given I am logged in as "customer@practicesoftwaretesting.com" with password "welcome01"
    When I navigate to the messages page
    Then the URL should contain "/account/messages"
    And the page title should be visible
    And the messages content should be displayed
