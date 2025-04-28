import React from 'react';
import OnThisPage from '../../components/common/OnThisPage';
import Alert from '../../components/common/Alert';
import TechRefCodeBlock from '../../components/technical-reference/TechRefCodeBlock';
import './ErrorCodes.css';
import './error-codes-table.css';

const ErrorCodes: React.FC = () => {
  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
    },
    {
      id: 'http-status-codes',
      title: 'HTTP Status Codes',
    },
    {
      id: 'api-specific-error-codes',
      title: 'API-Specific Error Codes',
    },
    {
      id: 'error-response-format',
      title: 'Error Response Format',
    },
    {
      id: 'handling-errors',
      title: 'Handling Errors',
    },
  ];
  const httpErrorCodes = [
    {
      code: '400',
      message: 'Bad Request',
      description: 'Your request is invalid.'
    },
    {
      code: '401',
      message: 'Unauthorized',
      description: 'Your API credentials are wrong.'
    },
    {
      code: '403',
      message: 'Forbidden',
      description: 'You are not allowed in there.'
    },
    {
      code: '404',
      message: 'Not Found',
      description: 'The specified hotel or endpoint could not be found.'
    },
    {
      code: '405',
      message: 'Method Not Allowed',
      description: 'You tried to access an endpoint with an invalid method.'
    },
    {
      code: '406',
      message: 'Not Acceptable',
      description: 'You requested a format that isn\'t json or xml.'
    },
    {
      code: '410',
      message: 'Gone',
      description: 'The hotel requested has been removed from our servers.'
    },
    {
      code: '429',
      message: 'Too Many Requests',
      description: 'You are sending requests too often! Slow down!'
    },
    {
      code: '500',
      message: 'Internal Server Error',
      description: 'We had a problem with our server. Try again later.'
    },
    {
      code: '503',
      message: 'Service Unavailable',
      description: 'We\'re temporarily offline for maintenance. Please try again later.'
    }
  ];

  const apiErrorCodes = [
    {
      code: 'CCAUTHD',
      description: 'The credit card that you have supplied to us is not working. Please verify your credit card information and try again or, try another credit card.'
    },
    {
      code: 'CCAUTHF',
      description: 'The credit card that you have supplied to us is not working. Please verify your credit card information and try again or, try another credit card.'
    },
    {
      code: 'CCAUTHA',
      description: 'The credit card address that you have supplied to us is not working. Please verify your billing address information and try again or, try another credit card.'
    },
    {
      code: 'CCAUTHX',
      description: 'We\'re sorry but American Express can only be used for US Dollar Transactions.'
    },
    {
      code: 'CCAUTH27114',
      description: 'In order to confirm your reservation, please use your PayPal Extras or your eBay MasterCard.'
    },
    {
      code: 'AUTHAMTCreditCardFailedException',
      description: 'The credit card that you have supplied to us is not working. Please verify your credit card information including: your credit card number, verification code and billing address then, please try again. If that doesn\'t work, you may need to use a different credit card.'
    }
  ];

  return (
    <>
      <div className="content-header">
        <h1>Hotels API Error Codes</h1>
        <p>Reference information about error codes returned by the Hotels API</p>
      </div>

      <OnThisPage sections={sections} />

      <div id="introduction" className="section">
        <h2>Introduction</h2>
        <p>
          The Hotels API uses standard HTTP status codes to indicate the success or failure of an API request.
          In addition to the standard HTTP status codes, the Hotels API also returns specific error codes for more detailed information.
        </p>
        <p>
          Understanding these error codes is important for effectively handling errors in your application
          and providing a good user experience.
        </p>
        <Alert type="info" title="Debugging">
          <p>
            When developing your integration, it's helpful to log all error responses for debugging purposes.
            This will make it easier to identify and fix issues.
          </p>
        </Alert>
      </div>

      <div id="http-status-codes" className="section">
        <h2>HTTP Status Codes</h2>
        <p>
          The Hotels API uses the following HTTP status codes:
        </p>
        <table className="error-codes-table">
          <thead>
            <tr>
              <th>HTTP Error Code</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {httpErrorCodes.map((error, index) => (
              <tr key={index}>
                <td><code>{error.code}</code> - {error.message}</td>
                <td>{error.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div id="api-specific-error-codes" className="section">
        <h2>Hotels API-Specific Error Codes</h2>
        <p>
          In addition to the standard HTTP status codes, the Hotels API also returns specific error codes for more detailed information.
          These error codes are returned in the response body and provide more context about the error.
        </p>
        <table className="error-codes-table">
          <thead>
            <tr>
              <th>Error Code</th>
              <th>Example Response</th>
            </tr>
          </thead>
          <tbody>
            {apiErrorCodes.map((error, index) => (
              <tr key={index}>
                <td><code>{error.code}</code></td>
                <td>{error.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Alert type="warning" title="Error Handling">
          <p>
            Always check for both HTTP status codes and API-specific error codes in your error handling logic.
            Some errors may only be indicated by an API-specific error code.
          </p>
        </Alert>
      </div>

      <div id="error-response-format" className="section">
        <h2>Error Response Format</h2>
        <p>
          When an error occurs, the Hotels API returns a response with an appropriate HTTP status code and may include additional error details in the body.
        </p>
        <TechRefCodeBlock
          code={`{
  "error": {
    "code": "CCAUTHD",
    "message": "Credit Card Authorization Declined",
    "details": "The credit card that you have supplied to us is not working. Please verify your credit card information and try again or, try another credit card."
  }
}`}
          language="json"
          title="Error Response Example"
        />
        <p>
          The error response typically contains the following fields:
        </p>
        <ul>
          <li><code>code</code>: The specific error code</li>
          <li><code>message</code>: A short description of the error</li>
          <li><code>details</code>: A more detailed description of the error, which may include suggestions for how to fix the issue</li>
        </ul>
      </div>

      <div id="handling-errors" className="section">
        <h2>Handling Errors</h2>
        <p>
          When handling errors in your application, you should:
        </p>
        <ol>
          <li>Check the HTTP status code to determine the general category of the error</li>
          <li>Check the error code in the response body for more specific information</li>
          <li>Display a user-friendly error message based on the error code and message</li>
          <li>Log the error details for debugging purposes</li>
        </ol>

        <h3>Example Error Handling</h3>
        <TechRefCodeBlock
          code={`// Example error handling in JavaScript
fetch('https://api.travsrv.com/api/hotel?type=availability&inDate=2025-05-23&outDate=2025-05-24')
  .then(response => {
    if (!response.ok) {
      // Handle HTTP error status codes
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your API credentials.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please slow down your requests.');
      } else {
        return response.json().then(errorData => {
          throw new Error(\`\${errorData.error.code}: \${errorData.error.details || errorData.error.message}\`);
        });
      }
    }
    return response.json();
  })
  .then(data => {
    // Handle successful response
    console.log(data);
  })
  .catch(error => {
    // Handle error
    console.error('API Error:', error.message);
    // Display user-friendly error message
    alert('An error occurred while searching for availability. Please try again later.');
  });`}
          language="javascript"
          title="Error Handling Example"
        />

        <h3>Common Error Scenarios</h3>
        <p>
          Here are some common error scenarios you may encounter and how to handle them:
        </p>
        <ul>
          <li><strong>Authentication Errors (401)</strong>: Verify that you're using the correct API credentials (publictest/testme)</li>
          <li><strong>Rate Limiting (429)</strong>: Reduce the frequency of your API requests</li>
          <li><strong>Invalid Parameters (400)</strong>: Check that all required parameters are included and formatted correctly</li>
          <li><strong>Credit Card Errors</strong>: Verify the credit card information and provide clear instructions to the user</li>
          <li><strong>Server Errors (500, 503)</strong>: Wait and retry the request after a short delay</li>
        </ul>

        <Alert type="info" title="Testing Error Handling">
          <p>
            You can use the <a href="/technical-reference/test-credit-card-triggers">Test Credit Card Triggers</a> to simulate various error scenarios
            and test your error handling logic in the test environment.
          </p>
        </Alert>
      </div>
    </>
  );
};

export default ErrorCodes;
