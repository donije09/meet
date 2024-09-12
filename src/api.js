// src/api.js

import mockData from './mock-data';

/**
 * Extracts unique locations from the events array.
 * @param {*} events - An array of event objects
 * @returns {Array} - An array of unique locations
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)]; // Removes duplicates
  return locations;
};

/**
 * Fetches the list of events. Uses mock data for local testing,
 * otherwise fetches real events from the Google Calendar API.
 */
export const getEvents = async () => {
  if (window.location.href.startsWith("http://localhost")) {
    return mockData; // Use mock data for local development
  }

  const token = await getAccessToken(); // Get access token

  if (token) {
    removeQuery(); // Clean up the URL after token retrieval
    const url = "https://pa9s7eitp0.execute-api.eu-central-1.amazonaws.com/dev/api/get-events" + '/' + token;
    const response = await fetch(url);
    const result = await response.json();

    if (result) {
      return result.events; // Return real events from API
    }
  }

  return null; // Return null if no events found
};

/**
 * Gets the access token from localStorage or fetches it from the Google OAuth2 flow.
 * If no valid token exists, it redirects the user to the Google Authorization screen.
 */
export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken)); // Validate token

  if (!accessToken || tokenCheck.error) {
    // Remove invalid token from localStorage
    await localStorage.removeItem("access_token");

    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code"); // Get authorization code from URL

    if (!code) {
      // Fetch the Google Authorization URL
      const response = await fetch(
        "https://pa9s7eitp0.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
      );
      const result = await response.json();
      const { authUrl } = result;

      // Redirect the user to the Google Authorization URL
      return (window.location.href = authUrl);
    }

    // If authorization code exists, fetch access token
    return code && getToken(code);
  }

  return accessToken; // Return valid access token
};

/**
 * Checks if the access token is valid.
 * @param {String} accessToken - The token to check
 * @returns {Object} - The result of the token check
 */
const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

/**
 * Fetches a new access token using the authorization code.
 * @param {String} code - The authorization code
 * @returns {String} - The new access token
 */
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(
    'https://pa9s7eitp0.execute-api.eu-central-1.amazonaws.com/dev/api/token' + '/' + encodeCode
  );
  const { access_token } = await response.json();
  
  // Store the new access token in localStorage
  if (access_token) {
    localStorage.setItem("access_token", access_token);
  }

  return access_token;
};

/**
 * Removes query parameters from the URL to clean up the address bar after token exchange.
 */
const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};
