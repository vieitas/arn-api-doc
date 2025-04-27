import React from 'react';
import { Link } from 'react-router-dom';
import OnThisPage from '../components/common/OnThisPage';
import Alert from '../components/common/Alert';

const Home: React.FC = () => {
  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
    },
    {
      id: 'authentication-overview',
      title: 'Authentication',
    },
    {
      id: 'environments',
      title: 'Environments',
    },
    {
      id: 'available-endpoints',
      title: 'Available Endpoints',
    },
    {
      id: 'important-notes',
      title: 'Important Notes',
    },
  ];

  return (
    <>
      <div className="content-header">
        <h1>ARN API Documentation</h1>
        <p>Welcome to the Alliance Reservation Network API documentation</p>
      </div>


      <div id="introduction" className="section">
      <OnThisPage sections={sections} />
        <h2>Introduction</h2>
        <p>
          Welcome to the Alliance Reservation Network API documentation. This API allows you to search for hotels,
          view rates, make reservations, and manage bookings programmatically.
        </p>
        <p>
          Use this documentation to learn how to integrate with our API and leverage its capabilities in your applications.
        </p>

        <Alert type="info" title="Getting Started">
          <p>
            If you're new to the ARN API, we recommend starting with the
            <Link to="/getting-started"> Getting Started</Link> guide.
          </p>
        </Alert>

        <Alert type="info" title="API Resources">
          <p>
            Check out our <Link to="/resources">Resources</Link> page for Postman collections and other tools to help you integrate with the ARN API.
          </p>
        </Alert>
      </div>

      <div id="authentication-overview" className="section">
        <h2>Authentication</h2>
        <p>
          All API requests require authentication. You'll need to include your API credentials in the request headers
          and use Basic Authentication with your API username and password.
        </p>

        <h3>Required Headers</h3>
        <table>
          <thead>
            <tr>
              <th>Header</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>Site-Id</code></td>
              <td>Your site ID</td>
            </tr>
            <tr>
              <td><code>API-ClientUsername</code></td>
              <td>Your API username</td>
            </tr>
            <tr>
              <td><code>API-ClientPassword</code></td>
              <td>Your API password</td>
            </tr>
          </tbody>
        </table>
      </div>



      <div id="environments" className="section">
        <h2>Environments</h2>
        <p>
          The API is available in both test and production environments. We recommend using the test environment
          for development and testing before moving to production.
        </p>

        <h3>Test Environment</h3>
        <p>
          The test environment is available at <code>https://api.travsrv.com</code>. Use the test credentials
          provided in the Authentication section to access the test environment.
        </p>

        <h3>Production Environment</h3>
        <p>
          The production environment is also available at <code>https://api.travsrv.com</code>. You'll need to
          use your production credentials to access the production environment.
        </p>
      </div>

      <div id="available-endpoints" className="section">
        <h2>Available Endpoints</h2>

        <h3>Typeahead Endpoints</h3>
        <ul>
          <li>
            <Link to="/endpoints/typeahead/city-search">
              <span className="http-method-get">GET</span> City Search
            </Link>
            <p>Search for cities by name or partial name</p>
          </li>
          <li>
            <Link to="/endpoints/typeahead/landmark-search">
              <span className="http-method-get">GET</span> Landmark Search
            </Link>
            <p>Search for landmarks by name or partial name</p>
          </li>
          <li>
            <Link to="/endpoints/typeahead/airport-search">
              <span className="http-method-get">GET</span> Airport Search
            </Link>
            <p>Search for airports by code or name</p>
          </li>
          <li>
            <Link to="/endpoints/typeahead/property-search">
              <span className="http-method-get">GET</span> Property Search
            </Link>
            <p>Search for properties by name or partial name</p>
          </li>
        </ul>

        <h3>Hotel Endpoints</h3>
        <ul>
          <li>
            <Link to="/endpoints/hotel/availability">
              <span className="http-method-get">GET</span> Availability Search
            </Link>
            <p>Search for available hotels based on location, dates, and occupancy</p>
          </li>
          <li>
            <Link to="/endpoints/hotel/rate-details">
              <span className="http-method-get">GET</span> Rate Details
            </Link>
            <p>Get detailed rate information for a specific hotel</p>
          </li>
          <li>
            <Link to="/endpoints/hotel/reservation-creation">
              <span className="http-method-post">POST</span> Reservation Creation
            </Link>
            <p>Create a new hotel reservation</p>
          </li>
          <li>
            <Link to="/endpoints/hotel/itinerary-by-locator">
              <span className="http-method-get">GET</span> Itinerary by Reservation Locator
            </Link>
            <p>Retrieve reservation details using a reservation locator</p>
          </li>
          <li>
            <Link to="/endpoints/hotel/itinerary-by-confirmation">
              <span className="http-method-get">GET</span> Itinerary by Confirmation Number
            </Link>
            <p>Retrieve reservation details using a confirmation number</p>
          </li>
          <li>
            <Link to="/endpoints/hotel/reservation-cancellation">
              <span className="http-method-post">POST</span> Reservation Cancellation
            </Link>
            <p>Cancel an existing reservation</p>
          </li>
        </ul>

        <h3>Content Endpoints</h3>
        <ul>
          <li>
            <Link to="/endpoints/content/featured-hotel-deals">
              <span className="http-method-get">GET</span> Featured Hotel Deals
            </Link>
            <p>Get a list of featured hotel deals</p>
          </li>
          <li>
            <Link to="/endpoints/content/featured-location-deals">
              <span className="http-method-get">GET</span> Featured Location Deals
            </Link>
            <p>Get a list of featured location deals</p>
          </li>
          <li>
            <Link to="/endpoints/content/property-info">
              <span className="http-method-get">GET</span> Property Info
            </Link>
            <p>Get detailed information about a property</p>
          </li>
        </ul>
      </div>

      <div id="important-notes" className="section">
        <h2>Important Notes</h2>
        <ul>
          <li>All dates should be in <code>YYYY-MM-DD</code> format</li>
          <li>All API responses are available in JSON format</li>
          <li>Rate limits apply to all API endpoints</li>
          <li>Always test your integration in the test environment before moving to production</li>
          <li>API credentials should be kept secure and not exposed in client-side code</li>
        </ul>


      </div>
    </>
  );
};

export default Home;
