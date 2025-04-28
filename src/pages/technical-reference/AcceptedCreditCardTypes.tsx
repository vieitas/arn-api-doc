import React from 'react';
import OnThisPage from '../../components/common/OnThisPage';
import Alert from '../../components/common/Alert';
import TechRefCodeBlock from '../../components/technical-reference/TechRefCodeBlock';
import './AcceptedCreditCardTypes.css';

const AcceptedCreditCardTypes: React.FC = () => {
  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
    },
    {
      id: 'accepted-card-types',
      title: 'Accepted Card Types',
    },
    {
      id: 'card-validation',
      title: 'Card Validation',
    },
    {
      id: 'implementation-guidelines',
      title: 'Implementation Guidelines',
    },
  ];

  const creditCardTypes = [
    {
      id: 'AX',
      name: 'American Express',
      description: 'American Express'
    },
    {
      id: 'CA',
      name: 'Mastercard',
      description: 'Mastercard'
    },
    {
      id: 'VI',
      name: 'Visa',
      description: 'Visa'
    },
    {
      id: 'DS',
      name: 'Discover',
      description: 'Discover'
    }
  ];

  return (
    <>
      <div className="content-header">
        <h1>Hotels API Accepted Credit Card Types</h1>
        <p>Reference information about the credit card types accepted for payment in the Hotels API</p>
      </div>

      <OnThisPage sections={sections} />

      <div id="introduction" className="section">
        <h2>Introduction</h2>
        <p>
          When creating reservations through the Hotels API, you'll need to provide credit card information for payment.
          This page provides reference information about the credit card types accepted by the Hotels API, as well as
          validation rules and implementation guidelines.
        </p>
        <Alert type="info" title="Test Environment">
          <p>
            In the test environment, you can use test credit cards to simulate payments without using real credit cards.
            See the <a href="/technical-reference/test-credit-card-exception-triggers">Test Credit Card Exception Triggers</a> page for more information.
          </p>
        </Alert>
      </div>

      <div id="accepted-card-types" className="section">
        <h2>Accepted Card Types</h2>
        <p>
          The Hotels API accepts the following credit card types for payment:
        </p>
        <table className="credit-card-types-table">
          <thead>
            <tr>
              <th>CCType</th>
              <th>Credit Card</th>
            </tr>
          </thead>
          <tbody>
            {creditCardTypes.map((card) => (
              <tr key={card.id}>
                <td><code>{card.id}</code></td>
                <td>{card.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Alert type="warning" title="Production Environment">
          <p>
            In the production environment, you must use real credit cards for payment. The test cards listed above
            will only work in the test environment.
          </p>
        </Alert>
      </div>

      <div id="card-validation" className="section">
        <h2>Card Validation</h2>
        <p>
          When accepting credit card information from users, it's important to validate the card details before
          submitting them to the API. This helps prevent errors and improves the user experience.
        </p>
        <h3>Card Number Validation</h3>
        <p>
          Credit card numbers should be validated using the following criteria:
        </p>
        <ul>
          <li>The card number should match the pattern for the selected card type</li>
          <li>The card number should have the correct length for the selected card type</li>
          <li>The card number should pass the Luhn algorithm check</li>
        </ul>
        <h3>Luhn Algorithm</h3>
        <p>
          The Luhn algorithm is a simple checksum formula used to validate credit card numbers. Here's a JavaScript
          implementation of the Luhn algorithm:
        </p>
        <TechRefCodeBlock
          code={`function isValidCardNumber(cardNumber) {
  // Remove spaces and dashes
  cardNumber = cardNumber.replace(/\\s+|-/g, '');

  // Check if the card number contains only digits
  if (!/^\\d+$/.test(cardNumber)) {
    return false;
  }

  // Luhn algorithm
  let sum = 0;
  let shouldDouble = false;

  // Loop through the card number from right to left
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i));

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}`}
          language="javascript"
          title="Card Number Validation"
        />
        <h3>CVV Validation</h3>
        <p>
          The CVV (Card Verification Value) should be validated based on the selected card type:
        </p>
        <ul>
          <li>For American Express cards, the CVV should be 4 digits</li>
          <li>For all other card types, the CVV should be 3 digits</li>
        </ul>
        <h3>Expiry Date Validation</h3>
        <p>
          The expiry date should be validated to ensure it's in the future:
        </p>
        <TechRefCodeBlock
          code={`function isValidExpiryDate(month, year) {
  // Convert to numbers
  month = parseInt(month, 10);
  year = parseInt(year, 10);

  // Get current date
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // JavaScript months are 0-indexed
  const currentYear = now.getFullYear();

  // Check if the expiry date is in the future
  if (year > currentYear) {
    return true;
  }
  if (year === currentYear && month >= currentMonth) {
    return true;
  }

  return false;
}`}
          language="javascript"
          title="Expiry Date Validation"
        />
      </div>

      <div id="implementation-guidelines" className="section">
        <h2>Implementation Guidelines</h2>
        <p>
          When implementing credit card processing in your application, follow these guidelines:
        </p>
        <h3>Security Considerations</h3>
        <ul>
          <li>Never store full credit card numbers in your database</li>
          <li>Use HTTPS for all communications involving credit card data</li>
          <li>Implement PCI DSS compliance measures</li>
          <li>Consider using a client-side tokenization solution to avoid handling credit card data directly</li>
        </ul>
        <h3>User Experience</h3>
        <ul>
          <li>Automatically format credit card numbers as the user types (e.g., add spaces every 4 digits)</li>
          <li>Automatically detect the card type based on the first few digits</li>
          <li>Show appropriate validation errors in real-time</li>
          <li>Provide clear instructions for CVV location based on the card type</li>
        </ul>
        <h3>API Integration</h3>
        <p>
          When submitting credit card information to the Hotels API, follow these guidelines:
        </p>
        <ul>
          <li>Remove all spaces and dashes from the card number</li>
          <li>Include the card type in the request</li>
          <li>Format the expiry date as MM/YYYY</li>
          <li>Include the CVV</li>
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
    "cardNumber": "4111111111111111",
    "cardHolderName": "John Doe",
    "expiryMonth": "12",
    "expiryYear": "2030",
    "cvv": "123"
  }
}`}
          language="json"
          title="API Request Example"
        />
      </div>
    </>
  );
};

export default AcceptedCreditCardTypes;
