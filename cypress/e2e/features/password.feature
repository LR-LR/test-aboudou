Feature: Password

    As a User I want to be able to change my password

  Background:
    Given I open Equad's testing website

  Scenario: Change password
    When I enter my login credentials
    And I click on submit button
    Then I am connected
    When I enter my actual password
    And I enter 2 times my new password
    And I click on submit button
    Then My password is changed
