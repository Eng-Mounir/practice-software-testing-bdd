@authentication
Feature: User Authentication
  As a customer of the Practice Software Testing Toolshop
  I want to login, register and logout
  So that I can securely access my account and manage purchases

  Background:
    Given I am on the home page

  # ── TC-001 ──────────────────────────────────────────────────
  @smoke @positive
  Scenario: TC-001 - Successful login with valid credentials
    Given I am on the login page
    When I enter email "customer@practicesoftwaretesting.com"
    And I enter password "welcome01"
    And I click the login button
    Then I should be redirected to the account page
    And the page title should display "My account"
    And the user navigation menu should be visible

  # ── TC-002 ──────────────────────────────────────────────────
  @negative
  Scenario: TC-002 - Login fails with invalid email
    Given I am on the login page
    When I enter email "invaliduser@test.com"
    And I enter password "wrongpassword"
    And I click the login button
    Then I should see the error message "Invalid email or password"
    And I should remain on the login page
    And the email field should still be visible

  # ── TC-003 ──────────────────────────────────────────────────
  @negative
  Scenario: TC-003 - Login fails with invalid password
    Given I am on the login page
    When I enter email "nonexistent@test.com"
    And I enter password "Test@123"
    And I click the login button
    Then I should see a message containing "Invalid"
    And I should remain on the login page
    And the password field should still be visible

  # ── TC-004 ──────────────────────────────────────────────────
  @negative @validation
  Scenario: TC-004 - Validation errors on empty login form
    Given I am on the login page
    When I click the login button
    Then the email validation error should be visible
    And the password validation error should be visible
    And I should remain on the login page

  # ── TC-005 ──────────────────────────────────────────────────
  @validation
  Scenario: TC-005 - Registration form required field validation
    Given I am on the registration page
    When I click the register submit button
    Then the first name validation error should be visible
    And the last name validation error should be visible
    And I should remain on the registration page

  # ── TC-006 ──────────────────────────────────────────────────
  @smoke @positive
  Scenario: TC-006 - Successful logout
    Given I am logged in as "customer@practicesoftwaretesting.com" with password "welcome01"
    When I click the sign out button
    Then I should not be on the account page
    And the user navigation menu should not exist
    And the sign in link should be visible
