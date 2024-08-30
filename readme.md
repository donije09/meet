# Meet App

A simple, intuitive event management app that allows users to browse events, view event details, manage event display settings, use the app offline, add shortcuts to their home screen, and visualize event data through charts.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [User Stories and Scenarios](#user-stories-and-scenarios)
  - [Feature 2: Show/Hide Event Details](#feature-2-showhide-event-details)
  - [Feature 3: Specify Number of Events](#feature-3-specify-number-of-events)
  - [Feature 4: Use the App When Offline](#feature-4-use-the-app-when-offline)
  - [Feature 5: Add an App Shortcut to the Home Screen](#feature-5-add-an-app-shortcut-to-the-home-screen)
  - [Feature 6: Display Charts Visualizing Event Details](#feature-6-display-charts-visualizing-event-details)

## Introduction

Meet App is designed to provide a seamless experience for users who want to explore upcoming events in their area or other cities. It includes features that allow users to view and hide event details, specify the number of events displayed, use the app offline, add the app as a shortcut to their home screen, and visualize event data through charts.

## Features

- Show/hide event details
- Specify the number of events displayed
- Use the app when offline
- Add an app shortcut to the home screen
- Display charts visualizing event details

## Installation

To install the app, follow these steps:

1. Clone the repository: `git clone https://github.com/donije09/meet.git`
2. Navigate to the project directory: `cd meet-app`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`

## User Stories and Scenarios

### Feature 2: Show/Hide Event Details

**User Story:**  
As a user, I want to be able to expand and collapse event details so that I can view more information or hide it as needed.

#### Scenarios:

1. **Scenario 1: An event element is collapsed by default.**
   - **Given** the app is displaying a list of events,
   - **When** the user views the events list,
   - **Then** each event element should be collapsed by default, hiding the detailed information.

2. **Scenario 2: User can expand an event to see details.**
   - **Given** the app is displaying a list of events with collapsed details,
   - **When** the user clicks on an event,
   - **Then** the details of the event should expand and become visible to the user.

3. **Scenario 3: User can collapse an event to hide details.**
   - **Given** an event's details are expanded,
   - **When** the user clicks on the expanded event again,
   - **Then** the event's details should collapse and be hidden from view.

### Feature 3: Specify Number of Events

**User Story:**  
As a user, I want to specify the number of events displayed so that I can control the amount of information I see.

#### Scenarios:

1. **Scenario 1: When user hasn’t specified a number, 32 events are shown by default.**
   - **Given** the user has not specified a number of events to display,
   - **When** the app displays events,
   - **Then** it should show 32 events by default.

2. **Scenario 2: User can change the number of events displayed.**
   - **Given** the app is displaying events,
   - **When** the user specifies a different number of events (e.g., 20),
   - **Then** the app should update to display the specified number of events.

### Feature 4: Use the App When Offline

**User Story:**  
As a user, I want the app to function offline so that I can access previously viewed events without an internet connection.

#### Scenarios:

1. **Scenario 1: Show cached data when there’s no internet connection.**
   - **Given** the user is offline with no internet connection,
   - **When** the user opens the app,
   - **Then** the app should display cached event data that was previously loaded.

2. **Scenario 2: Show error when user changes search settings (city, number of events).**
   - **Given** the user is offline and the app is displaying cached data,
   - **When** the user attempts to change search settings (e.g., change city or number of events),
   - **Then** the app should display an error message indicating that the search cannot be completed without an internet connection.

### Feature 5: Add an App Shortcut to the Home Screen

**User Story:**  
As a user, I want to add a shortcut for the app to my home screen so that I can quickly access it.

#### Scenario:

1. **Scenario 1: User can install the meet app as a shortcut on their device home screen.**
   - **Given** the user has accessed the app via a web browser,
   - **When** the user selects the option to add the app to their home screen,
   - **Then** a shortcut icon for the app should be added to the device’s home screen.

### Feature 6: Display Charts Visualizing Event Details

**User Story:**  
As a user, I want to see visual charts of event data so that I can quickly understand event distribution across cities.

#### Scenario:

1. **Scenario 1: Show a chart with the number of upcoming events in each city.**
   - **Given** the app has event data for multiple cities,
   - **When** the user views the event charts section,
   - **Then** a chart should be displayed showing the number of upcoming events for each city.


           +-----------------------------------+
           |          React Frontend           |
           |-----------------------------------|
           |  - Event Filtering by City        |
           |  - Show/Hide Event Details        |
           |  - Specify Number of Events       |
           |  - Data Visualization (Charts)    |
           |  - Service Worker (Offline Mode)  |
           +-----------------------------------+
                       |
                       | OAuth2 Authentication
                       |
        +------------------------------+
        | AWS Lambda (Authorization)   | <-----> Google Calendar API
        +------------------------------+
                       |   Serverless Functions
                       |
  +----------------------------+       +---------------------------------+
  | AWS Lambda Functions       |<----->|  Data Processing and Filtering |
  | - Event Filtering          |       |  Data Aggregation for Charts   |
  | - Data Aggregation         |       +---------------------------------+
  +----------------------------+
                       |
                       | Data Retrieval
                       |
       +-----------------------------+
       |     Google Calendar API     |
       +-----------------------------+
                       |
          Data Fetching for Events
                       |
       +-----------------------------+
       |       GitHub Pages          |
       |  (Hosting and Deployment)   |
       +-----------------------------+
                       |
      +--------------------------------+
      | Performance Monitoring Tool    |
      | (e.g., AWS CloudWatch)         |
      +--------------------------------+


