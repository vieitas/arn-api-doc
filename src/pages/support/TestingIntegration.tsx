import React from 'react';
import OnThisPage from '../../components/common/OnThisPage';
import Alert from '../../components/common/Alert';
import TechRefCodeBlock from '../../components/technical-reference/TechRefCodeBlock';
import { Link } from 'react-router-dom';
import './TestingIntegration.css';

const TestingIntegration: React.FC = () => {
  const sections = [
    {
      id: 'overview',
      title: 'Overview',
    },
    {
      id: 'test-environment',
      title: 'Test Environment',
    },
    {
      id: 'test-credentials',
      title: 'Test Credentials',
    },
    {
      id: 'test-gateways',
      title: 'Test Gateways',
    },
    {
      id: 'test-credit-cards',
      title: 'Test Credit Cards',
    },
    {
      id: 'testing-workflow',
      title: 'Testing Workflow',
    },
    {
      id: 'refunds-during-testing',
      title: 'Refunds During Testing',
    },
  ];

  return (
    <>
      <div className="content-header">
        <h1>Testing Your Integration</h1>
        <p>Guidelines and best practices for testing your ARN API integration</p>
      </div>

      <OnThisPage sections={sections} />

      <div id="overview" className="section">
        <h2>Overview</h2>
        <p>
          Before deploying your integration to production, it's important to thoroughly test it in the ARN test environment.
          This page provides information on how to use the test environment, test credentials, and test data to ensure your
          integration works correctly.
        </p>
        <Alert type="info" title="Test Mode">
          <p>
            By default, your new account will be in test mode that will replace the live gateways and query results with fake test data
            that can be queried and booked using fake credit cards without any consequences.
          </p>
        </Alert>
      </div>

      <div id="test-environment" className="section">
        <h2>Test Environment</h2>
        <p>
          The ARN API test environment is a fully functional replica of the production environment, but with simulated data.
          This allows you to test your integration without making real bookings or charges.
        </p>
        <p>
          The test environment uses the same endpoints as the production environment, but with different credentials:
        </p>
        <TechRefCodeBlock
          code="https://api.travsrv.com/api/hotel?type=availability&inDate=2025-05-23&outDate=2025-05-24&siteid=YOUR_SITE_ID"
          language="http"
          title="Test Environment Endpoint Example"
        />
        <p>
          The <code>siteid</code> parameter should be set to the Site ID provided by your Account Manager.
        </p>
      </div>

      <div id="test-credentials" className="section">
        <h2>Test Credentials</h2>
        <p>
          To obtain test credentials for the API, please complete the registration form on the <Link to="/getting-started">Getting Started</Link> page.
          Once your registration is approved, an Account Manager will provide you with the necessary test credentials.
        </p>
        <p>
          These credentials should be included in the Basic Authentication header of your API requests:
        </p>
        <TechRefCodeBlock
          code={`// Example of setting up Basic Authentication in JavaScript
const username = 'YOUR_USERNAME';
const password = 'YOUR_PASSWORD';
const authHeader = 'Basic ' + btoa(username + ':' + password);

fetch('https://api.travsrv.com/api/hotel?type=availability&inDate=2025-05-23&outDate=2025-05-24&siteid=YOUR_SITE_ID', {
  headers: {
    'Authorization': authHeader,
    'Accept-version': '2'
  }
})`}
          language="javascript"
          title="Authentication Example"
        />
      </div>

      <div id="test-gateways" className="section">
        <h2>Test Gateways</h2>
        <p>
          In the test environment, gateways 28 and 29 are designated as test gateways. These gateways return simulated data
          that can be used for testing your integration.
        </p>
        <Alert type="warning" title="Important">
          <p>
            The room and rate descriptions for test gateways will be obviously fake data gibberish. This is expected behavior
            in the test environment. If you book a reservation on any other gateway, you are responsible for it as it is a real
            reservation with real charges and penalties.
          </p>
        </Alert>
        <p>
          When testing, you should focus on these test gateways to avoid creating real bookings:
        </p>
        <TechRefCodeBlock
          code="https://api.travsrv.com/api/hotel?type=rateDetails&hotelids=123456&inDate=2025-05-23&outDate=2025-05-24&siteid=YOUR_SITE_ID&rooms=1&adults=2&children=0&gateway=28"
          language="http"
          title="Test Gateway Example"
        />
      </div>

      <div id="test-credit-cards" className="section">
        <h2>Test Credit Cards</h2>
        <p>
          You can use the following test credit cards in the test environment:
        </p>
        <table className="test-credit-cards-table">
          <thead>
            <tr>
              <th>Credit Card Number</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>4111 1111 1111 1111</code></td>
              <td>Successful booking (returns garbled room descriptions)</td>
            </tr>
            <tr>
              <td><code>4321 4321 4321 4327</code></td>
              <td>Authorization declined error</td>
            </tr>
            <tr>
              <td><code>5454 5454 5454 5454</code></td>
              <td>Amount that must be charged is different from amount authorized error</td>
            </tr>
          </tbody>
        </table>
        <p>
          For a complete list of test credit cards and their behaviors, see the <Link to="/technical-reference/test-credit-card-triggers">Test Credit Card Triggers</Link> page.
        </p>
      </div>

      <div id="testing-workflow" className="section">
        <h2>Testing Workflow</h2>
        <p>
          We recommend testing your integration using the following workflow:
        </p>
        <ol className="testing-workflow-list">
          <li>
            <strong>Search for availability</strong> using the Availability Search endpoint with test parameters
            <TechRefCodeBlock
              code="GET https://api.travsrv.com/api/hotel?type=availability&inDate=2025-05-23&outDate=2025-05-24&siteid=YOUR_SITE_ID&rooms=1&adults=2&children=0&locationId=12345"
              language="http"
              title="Availability Search Example"
            />
          </li>
          <li>
            <strong>Get rate details</strong> for a selected hotel using the Rate Details endpoint
            <TechRefCodeBlock
              code="GET https://api.travsrv.com/api/hotel?type=rateDetails&hotelids=123456&inDate=2025-05-23&outDate=2025-05-24&siteid=YOUR_SITE_ID&rooms=1&adults=2&children=0&ratePlanCode=ABC123&roomCode=XYZ789&gateway=28"
              language="http"
              title="Rate Details Example"
            />
          </li>
          <li>
            <strong>Create a reservation</strong> using the Reservation Creation endpoint with a test credit card
            <TechRefCodeBlock
              code={`POST https://api.travsrv.com/api/hotel?type=reservation&siteid=YOUR_SITE_ID&_type=json

{
  "hotelids": "123456",
  "inDate": "2025-05-23",
  "outDate": "2025-05-24",
  "gateway": 28,
  "ratePlanCode": "ABC123",
  "roomCode": "XYZ789",
  "rooms": 1,
  "adults": 2,
  "children": 0,
  "creditCardType": "VI",
  "creditCardNumber": "4111111111111111",
  "creditCardHolder": "Test User",
  "creditCardExpiration": "12/30",
  "creditCardCVV2": "123",
  // Other required fields...
}`}
              language="json"
              title="Reservation Creation Example"
            />
          </li>
          <li>
            <strong>Retrieve the reservation</strong> using the Itinerary by Reservation Locator endpoint
            <TechRefCodeBlock
              code="GET https://api.travsrv.com/api/hotel?type=itinerary&reservationLocator=ABC123XYZ&siteid=YOUR_SITE_ID"
              language="http"
              title="Itinerary Retrieval Example"
            />
          </li>
          <li>
            <strong>Cancel the reservation</strong> using the Reservation Cancellation endpoint
            <TechRefCodeBlock
              code="POST https://api.travsrv.com/api/hotel?type=cancel&reservationLocator=ABC123XYZ&siteid=YOUR_SITE_ID"
              language="http"
              title="Reservation Cancellation Example"
            />
          </li>
        </ol>
        <p>
          Make sure to test both successful scenarios and error scenarios using the different test credit cards.
        </p>
      </div>

      <div id="refunds-during-testing" className="section">
        <h2>Refunds During Testing</h2>
        <p>
          If you accidentally make a real booking during testing (using a gateway other than 28 or 29), you can request a refund:
        </p>
        <ol>
          <li>Cancel the reservation as soon as possible</li>
          <li>Email the cancellation acknowledgement to <a href="mailto:customerservice@allresnet.com">customerservice@allresnet.com</a></li>
          <li>Use the subject line "Credit for Service Fee of TEST Reservation"</li>
        </ol>
        <Alert type="info" title="Refund Policy">
          <p>
            Upon request, ARN will refund any booking fees that may have been charged during testing. For service fee credits,
            if any, email the cancellation acknowledgement as described above.
          </p>
        </Alert>
      </div>
    </>
  );
};

export default TestingIntegration;
