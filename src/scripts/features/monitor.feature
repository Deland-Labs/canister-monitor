@monitor
Feature: Canister Monitor test

  Background:
    Given Reinstall dft canisters
      | key  | name  | symbol | decimals | total_supply | owner         |
      | dicp | D ICP | DICP   | 8        | 10^9         | icnaming_main |


  @dev
  Scenario: test
    Given Check Monitor Status

  @dev
  Scenario: test2
    Given Check Monitors Status
