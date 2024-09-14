Feature: Specify Number of Events

Scenario: User can specify the number of events they want to see
  Given the user has not specified a number of events
  When the user enters a number in the input field
  Then the number of events displayed should match the user’s input
