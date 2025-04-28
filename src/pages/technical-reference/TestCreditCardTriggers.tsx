import React from 'react';
import OnThisPage from '../../components/common/OnThisPage';
import Alert from '../../components/common/Alert';
import TechRefCodeBlock from '../../components/technical-reference/TechRefCodeBlock';
import './TestCreditCardTriggers.css';

const TestCreditCardTriggers: React.FC = () => {
  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
    },
    {
      id: 'exception-triggers',
      title: 'Exception Triggers',
    },
    {
      id: 'usage-guidelines',
      title: 'Usage Guidelines',
    },
    {
      id: 'testing-scenarios',
      title: 'Testing Scenarios',
    },
  ];

  const exceptionTriggers = [
    {
      cardNumber: '4111 1111 1111 1111',
      description: 'Generic test credit card to utilize for test bookings when API is in TEST MODE (Garbled room descriptions returned)'
    },
    {
      cardNumber: '4321 4321 4321 4327',
      description: 'Trigger a Credit Card authorization Declined response from a booking'
    },
    {
      cardNumber: '4716 7125 4417 0282',
      description: 'Trigger a Credit Card Address Verification Check Declined response from a booking'
    },
    {
      cardNumber: '4164 7905 8973 7550',
      description: 'Trigger a Credit Card CVV Validation Check Declined response from a booking'
    },
    {
      cardNumber: '5454 5454 5454 5454',
      description: 'Trigger exception due to the amount of the reservation authorization being different what needs to be booked.'
    },
    {
      cardNumber: '4000 0000 0000 0093',
      description: 'Trigger exception when the Bookable Rate that returned from the supplier has gone UP from your requested booking rate amount.'
    },
    {
      cardNumber: '4000 0000 0000 0077',
      description: 'Trigger exception when the Bookable Rate that returned from the supplier has gone DOWN from your requested booking rate amount.'
    }
  ];

  return (
    <>
      <div className="content-header">
        <h1>Hotels API Test Credit Card Triggers</h1>
        <p>Reference information about test credit cards that trigger specific exceptions in the Hotels API</p>
      </div>

      <OnThisPage sections={sections} />

      <div id="introduction" className="section">
        <h2>Introduction</h2>
        <p>
          When testing your integration with the Hotels API, it's important to test how your application handles
          various payment exceptions and errors. This page provides reference information about test credit
          cards that can be used to trigger specific exceptions in the Hotels API test environment.
        </p>
        <Alert type="warning" title="Test Environment Only">
          <p>
            These test credit cards should only be used in the test environment. They will not work in the production
            environment, and attempting to use them there may result in errors or declined transactions.
          </p>
        </Alert>
      </div>

      <div id="exception-triggers" className="section">
        <h2>Exception Triggers</h2>
        <p>
          The following test credit cards can be used to trigger specific exceptions in the Hotels API test environment:
        </p>
        <table className="exception-triggers-table">
          <thead>
            <tr>
              <th>Credit Card Number</th>
              <th>Exception Triggered on Booking</th>
            </tr>
          </thead>
          <tbody>
            {exceptionTriggers.map((trigger, index) => (
              <tr key={index}>
                <td><code>{trigger.cardNumber}</code></td>
                <td>{trigger.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div id="usage-guidelines" className="section">
        <h2>Usage Guidelines</h2>
        <p>
          When using these test credit cards, please follow these guidelines:
        </p>
        <ul>
          <li>Use any valid future date for the expiry date (e.g., "12/2030")</li>
          <li>Use any name for the cardholder name</li>
          <li>Do not include spaces or dashes when submitting the card number in API requests</li>
          <li>These test cards will only work in the test environment (api.travsrv.com with test credentials)</li>
        </ul>
        <h3>Example API Request</h3>
        <TechRefCodeBlock
          code={`POST https://api.travsrv.com/api/hotel?type=reservation

{
  "reservationDetails": {
    // Other reservation details...
  },
  "paymentDetails": {
    "cardType": "VI",
    "cardNumber": "4321432143214327",
    "cardHolderName": "Test User",
    "expiryMonth": "12",
    "expiryYear": "2030",
    "cvv": "123"
  }
}`}
          language="json"
          title="API Request Example"
        />
      </div>

      <div id="testing-scenarios" className="section">
        <h2>Testing Scenarios</h2>
        <p>
          Here are some common testing scenarios and how to use the exception triggers to test them:
        </p>
        <h3>Testing Successful Booking</h3>
        <p>
          Use the <code>4111 1111 1111 1111</code> card to test successful booking in test mode.
          Note that this will return garbled room descriptions as expected in the test environment.
        </p>
        <h3>Testing Authorization Declined</h3>
        <p>
          Use <code>4321 4321 4321 4327</code> to test how your application handles credit card authorization declined scenarios.
          Your application should display an appropriate error message and allow the user to try a different card.
        </p>
        <h3>Testing Address Verification Failure</h3>
        <p>
          Use <code>4716 7125 4417 0282</code> to test how your application handles address verification failures.
          Your application should prompt the user to verify their billing address information.
        </p>
        <h3>Testing CVV Validation Failure</h3>
        <p>
          Use <code>4164 7905 8973 7550</code> to test how your application handles CVV validation failures.
          Your application should prompt the user to verify their CVV code.
        </p>
        <h3>Testing Rate Changes</h3>
        <p>
          Use <code>4000 0000 0000 0093</code> or <code>4000 0000 0000 0077</code> to test how your application handles
          rate changes between the time of search and booking. Your application should notify the user of the rate change.
        </p>
        <Alert type="info" title="Testing Best Practices">
          <p>
            We recommend testing all possible payment scenarios to ensure your application handles both successful and
            failed payments correctly. This helps provide a better user experience when real-world issues occur.
          </p>
        </Alert>
      </div>
    </>
  );
};

export default TestCreditCardTriggers;
