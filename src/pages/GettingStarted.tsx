import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OnThisPage from '../components/common/OnThisPage';
import CodeBlock from '../components/common/CodeBlock';
import FormValidator from '../components/common/FormValidator';
import './GettingStarted.css';

const GettingStarted: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = async (formData: FormData) => {
    // Convert FormData to a plain object for easier handling
    const formValues: Record<string, string> = {};
    formData.forEach((value, key) => {
      formValues[key] = value.toString();
    });

    // In a real application, you would send this data to your server
    console.log('Form values:', formValues);

    // Simulate an API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setFormSubmitted(true);
        resolve();
      }, 1000);
    });
  };
  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
    },
    {
      id: 'getting-started-steps',
      title: 'Getting Started Steps',
    },
    {
      id: 'authentication',
      title: 'Authentication',
    },
    {
      id: 'environments',
      title: 'Environments',
    },
    {
      id: 'api-versions',
      title: 'API Versions',
    },
    {
      id: 'first-request',
      title: 'First Request',
      subsections: [
        {
          id: 'request-parameters',
          title: 'Request Parameters',
        },
        {
          id: 'request-example',
          title: 'Request Example',
        },
        {
          id: 'response-example',
          title: 'Response Example',
        },
        {
          id: 'response-parameters',
          title: 'Response Parameters',
        },
      ],
    },
    {
      id: 'testing-resources',
      title: 'Testing Resources',
    },
    {
      id: 'next-steps',
      title: 'Next Steps',
    },

  ];

  return (
    <>
      <div className="content-header">
        <h1>Getting Started with ARN Hotels API</h1>
        <p>
          The Alliance Reservation Network (ARN) Hotels API provides programmatic access to hotel search, booking, and content services.
          This guide will help you get started with integrating the Hotels API into your application.
        </p>
      </div>

      <OnThisPage sections={sections} />

      <div className="section" id="introduction">
        <h2>Introduction</h2>
        <p>
          The Alliance Reservation Network (ARN) Hotels API provides programmatic access to hotel search, booking, and content services.
          This guide will help you get started with integrating the Hotels API into your application.
        </p>
      </div>

      <div className="section" id="getting-started-steps">
        <h2>Getting Started Steps</h2>
        <p>
          To begin testing our API, follow these steps:
        </p>
        <ol>
          <li>Fill out the registration form below to request developer access</li>
          <li>Review the API documentation on this site to understand the available endpoints</li>
          <li>Request test credentials for integration testing from your Account Manager</li>
        </ol>

        <div className="registration-form">
          <h3>Developer Registration Form</h3>
          <p>Please complete this form to request developer access. One of our Account Managers will contact you.</p>

          <FormValidator
            className="cert-form"
            onSubmit={handleFormSubmit}
            emailTo="vieitas@gmail.com"
            successMessage="Thank you for your registration! We will contact you shortly."
            errorMessage="There was an error submitting the form. Please try again or contact support."
          >
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input type="text" id="fullName" name="fullName" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Business Email *</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input type="tel" id="phone" name="phone" required />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company Name *</label>
              <input type="text" id="company" name="company" required />
            </div>

            <div className="form-group">
              <label htmlFor="website">Company Website *</label>
              <input type="url" id="website" name="website" required />
            </div>

            <div className="form-group">
              <label htmlFor="companySize">Company Size *</label>
              <select id="companySize" name="companySize" required>
                <option value="">Select an option</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501+">501+ employees</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="businessType">Business Type *</label>
              <select id="businessType" name="businessType" required>
                <option value="">Select an option</option>
                <option value="OTA">Online Travel Agency (OTA)</option>
                <option value="travelAgency">Travel Agency</option>
                <option value="tourOperator">Tour Operator</option>
                <option value="hotelChain">Hotel Chain</option>
                <option value="technologyProvider">Technology Provider</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="otherBusinessType">If Other, please specify</label>
              <input type="text" id="otherBusinessType" name="otherBusinessType" />
            </div>

            <div className="form-group">
              <label htmlFor="monthlyBookings">Estimated Monthly Bookings *</label>
              <select id="monthlyBookings" name="monthlyBookings" required>
                <option value="">Select an option</option>
                <option value="<100">Less than 100</option>
                <option value="100-500">100-500</option>
                <option value="501-1000">501-1,000</option>
                <option value="1001-5000">1,001-5,000</option>
                <option value="5001+">More than 5,000</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="integrationPurpose">Integration Purpose *</label>
              <textarea id="integrationPurpose" name="integrationPurpose" rows={4} required
                placeholder="Please describe how you plan to use our API"></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="technicalContact">Technical Contact Name *</label>
              <input type="text" id="technicalContact" name="technicalContact" required />
            </div>

            <div className="form-group">
              <label htmlFor="technicalEmail">Technical Contact Email *</label>
              <input type="email" id="technicalEmail" name="technicalEmail" required />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">Submit Registration</button>
            </div>

            <p className="form-note">* Required fields</p>
          </FormValidator>
        </div>
      </div>

      <div className="section" id="authentication">
        <h2>Authentication</h2>
        <p>
          All Hotels API requests require authentication. You'll need to include your Hotels API credentials in the request headers
          and use Basic Authentication with your API username and password.
        </p>

        <h3>Required Headers</h3>
        <div className="parameter-table-container">
          <table className="parameter-table header-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Required</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>Site-Id</code></td>
                <td>Yes</td>
                <td></td>
              </tr>
              <tr>
                <td><code>API-ClientUsername</code></td>
                <td>Yes</td>
                <td></td>
              </tr>
              <tr>
                <td><code>API-ClientPassword</code></td>
                <td>Yes</td>
                <td></td>
              </tr>
              <tr>
                <td><code>Content-Type</code></td>
                <td>Yes</td>
                <td><code>application/json</code></td>
              </tr>
              <tr>
                <td><code>Accept-version</code></td>
                <td>No</td>
                <td><code>2.1</code></td>
              </tr>
              <tr>
                <td><code>Authorization</code></td>
                <td>Yes</td>
                <td><code>Basic (Base64 encoded username:password)</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Basic Authentication</h3>
        <p>
          In addition to the headers above, you'll need to use Basic Authentication with your API username and password.
          The username and password are the same as the <code>API-ClientUsername</code> and <code>API-ClientPassword</code> headers.
        </p>
      </div>

      <div className="section" id="environments">
        <h2>Environments</h2>
        <p>
          The Hotels API is available in both test and production environments. We recommend using the test environment
          for development and testing before moving to production.
        </p>

        <h3>Test Environment</h3>
        <p>
          The Hotels API test environment is available at <code>https://api.travsrv.com</code>. Use the test credentials
          provided by your Account Manager to access the test environment.
        </p>

        <h3>Production Environment</h3>
        <p>
          The Hotels API production environment is also available at <code>https://api.travsrv.com</code>. You'll need to
          use your production credentials to access the production environment.
        </p>

        <h3>Differences Between Environments</h3>
        <p>
          The test environment has the following limitations:
        </p>
        <ul>
          <li>Limited set of hotels and locations</li>
          <li>Test credit cards only (no real charges)</li>
          <li>Reservations are not sent to hotels</li>
          <li>Rate limits are more relaxed</li>
        </ul>
      </div>

      <div className="section" id="api-versions">
        <h2>Hotels API Versions</h2>
        <p>
          Hotels API versions can be controlled using the <code>Accept-version</code> header on each request.
          Version 1 is the default version returned, but version 2.1 is the recommended version to use for new integrations.
        </p>

        <h3>Specifying the API Version</h3>
        <p>
          You can specify the API version using the <code>Accept-version</code> header. For example:
        </p>
        <CodeBlock
          code="Accept-version: 2"
          language="http"
        />

        <h3>Version History</h3>
        <table>
          <thead>
            <tr>
              <th>Version</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Version 1 is the initial release of the Hotel API. Default version that is returned by API.</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Version 2 introduces consistent array structures for Hotel, RatePlan, Room and NightlyRate in JSON responses.</td>
            </tr>
            <tr>
              <td>2.1</td>
              <td>
                Version 2.1 introduces the DueOnArrival element, with information related to fees that are due at property,
                and the bestdeal sort type option. <strong>Version 2.1 is the recommended version to use for new integrations.</strong>
              </td>
            </tr>
          </tbody>
        </table>

        <h3>DueOnArrival Example</h3>
        <p>
          The DueOnArrival element introduced in version 2.1 provides information about fees that are due at the property:
        </p>
        <CodeBlock
          code={`"Room": {
  "DueOnArrival": {
    "Total": {
      "@Amount": "34.20",
      "@CurrencyCode": "USD"
    },
    "Fee": {
      "@Title": "Resort Fee"
    }
  }
}`}
          language="json"
          title="DueOnArrival Example"
        />
      </div>

      <div className="section" id="first-request">
        <h2>First Request</h2>
        <p>
          Once you receive your test credentials from your Account Manager, you can make your first request to the API.
          Let's look at a simple request to the City Search endpoint as an example.
        </p>

        <h3 id="request-parameters">Request Parameters</h3>
        <p>The following parameters should be included in the query string:</p>
        <table>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Type</th>
              <th>Required</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>type</td>
              <td>string</td>
              <td>Yes</td>
              <td>Must be "cities" for this endpoint</td>
            </tr>
            <tr>
              <td>query</td>
              <td>string</td>
              <td>Yes</td>
              <td>The search term (city name or partial name)</td>
            </tr>
            <tr>
              <td>maxresults</td>
              <td>integer</td>
              <td>No</td>
              <td>Maximum number of results to return (default: 10)</td>
            </tr>
            <tr>
              <td>_type</td>
              <td>string</td>
              <td>No</td>
              <td>Response format (json or xml, default: json)</td>
            </tr>
          </tbody>
        </table>

        <h3 id="request-example">Request Example</h3>
        <CodeBlock
          code="https://api.travsrv.com/api/widget?type=cities&query=new&maxresults=5&_type=json"
          language="http"
          title="HTTP Request"
        />

        <h3 id="response-example">Response Example</h3>
        <p>
          The response is a JSON array containing cities that match the search query "new". Each city object includes
          detailed information such as the city ID, name, country, state, and geographic coordinates.
        </p>
        <CodeBlock
          code={`[
  {
    "Id": 29805,
    "Name": "New York, NY, United States",
    "Type": "City",
    "Country": "US",
    "CountryName": "United States",
    "State": "NY",
    "StateName": "New York",
    "Latitude": 40.7127753,
    "Longitude": -74.0059728
  },
  {
    "Id": 29806,
    "Name": "New Orleans, LA, United States",
    "Type": "City",
    "Country": "US",
    "CountryName": "United States",
    "State": "LA",
    "StateName": "Louisiana",
    "Latitude": 29.9510658,
    "Longitude": -90.0715323
  },
  {
    "Id": 29807,
    "Name": "Newark, NJ, United States",
    "Type": "City",
    "Country": "US",
    "CountryName": "United States",
    "State": "NJ",
    "StateName": "New Jersey",
    "Latitude": 40.7357,
    "Longitude": -74.1724
  },
  {
    "Id": 29808,
    "Name": "Newport Beach, CA, United States",
    "Type": "City",
    "Country": "US",
    "CountryName": "United States",
    "State": "CA",
    "StateName": "California",
    "Latitude": 33.6189,
    "Longitude": -117.9298
  },
  {
    "Id": 29809,
    "Name": "New Haven, CT, United States",
    "Type": "City",
    "Country": "US",
    "CountryName": "United States",
    "State": "CT",
    "StateName": "Connecticut",
    "Latitude": 41.3082,
    "Longitude": -72.9282
  }
]`}
          language="json"
          title="JSON Response"
        />

        <h3 id="response-parameters">Response Parameters</h3>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Id</td>
              <td>Integer</td>
              <td>Unique identifier for the city</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>String</td>
              <td>Full name of the city, including state and country</td>
            </tr>
            <tr>
              <td>Type</td>
              <td>String</td>
              <td>Type of location (City)</td>
            </tr>
            <tr>
              <td>Country</td>
              <td>String</td>
              <td>Country code (e.g., US)</td>
            </tr>
            <tr>
              <td>CountryName</td>
              <td>String</td>
              <td>Full country name</td>
            </tr>
            <tr>
              <td>State</td>
              <td>String</td>
              <td>State/province code (e.g., NY)</td>
            </tr>
            <tr>
              <td>StateName</td>
              <td>String</td>
              <td>Full state/province name</td>
            </tr>
            <tr>
              <td>Latitude</td>
              <td>Float</td>
              <td>Latitude coordinate of the city</td>
            </tr>
            <tr>
              <td>Longitude</td>
              <td>Float</td>
              <td>Longitude coordinate of the city</td>
            </tr>
          </tbody>
        </table>

      </div>

      <div className="section" id="testing-resources">
        <h2>Testing Resources</h2>
        <p>
          To help you test your integration with the Hotels API, we provide several resources that you can use during development:
        </p>

        <h3>Test Credentials</h3>
        <p>
          After registering for API access, you'll receive test credentials to use with the test environment.
          These credentials include:
        </p>
        <ul>
          <li>API username and password</li>
          <li>Site ID</li>
        </ul>
        <p>
          These credentials provide access to the full functionality of the API in the test environment.
        </p>


        <h3>Test Data</h3>
        <p>
          In the test environment, you can use any hotel available in the system for your testing purposes.
        </p>
        <p>
          For test credit cards, we provide a variety of test card numbers that trigger different responses.
          See the <Link to="/technical-reference/test-credit-card-triggers">Test Credit Card Triggers</Link> documentation
          for specific card numbers and their behaviors.
        </p>
        <p>
          The test environment allows you to simulate the complete booking flow, including availability search,
          rate details, reservation creation, and cancellation, without creating actual bookings at hotels.
        </p>

        <h3>Postman Collection</h3>
        <p>
          We provide a Postman collection that includes pre-configured requests for all API endpoints.
          This collection makes it easy to test the API and understand the request/response format.
        </p>
        <p>
          Visit the <Link to="/resources">Resources</Link> page to access the Postman collection and other helpful tools.
        </p>
      </div>

      <div className="section" id="next-steps">
        <h2>Next Steps</h2>
        <p>
          Now that you've made your first request, you can explore the other endpoints available in the API.
          Here are some suggestions for what to try next:
        </p>
        <ul>
          <li>
            Try the <Link to="/endpoints/typeahead/city-search">City Search</Link> endpoint with different query parameters
          </li>
          <li>
            Explore other Typeahead endpoints like <Link to="/endpoints/typeahead/airport-search">Airport Search</Link> or <Link to="/endpoints/typeahead/landmark-search">Landmark Search</Link>
          </li>
          <li>
            Learn about the <Link to="/endpoints/hotel/availability">Hotel Availability Search</Link> endpoint to find available hotels
          </li>
          <li>
            Check out the <Link to="/technical-reference/error-codes">Error Codes</Link> documentation to understand possible API responses
          </li>
        </ul>
        <p>
          Remember to use the test credentials provided by your Account Manager while you're developing and testing your integration.
          When you're ready to go live, you'll need to request production credentials through the certification process.
        </p>
      </div>


    </>
  );
};

export default GettingStarted;
