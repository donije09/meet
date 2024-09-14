Feature: Show/Hide Event Details

Scenario: User can expand an event to see its details
  Given the user is viewing a list of events
  When the user clicks on "Show Details" for an event
  Then the event's details should be displayed

Scenario: User can hide the details of an event
  Given the user has expanded an event's details
  When the user clicks on "Hide Details"
  Then the event's details should be hidden
