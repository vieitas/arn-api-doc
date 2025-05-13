import React from 'react';
import OnThisPage from '../../components/common/OnThisPage';
import Alert from '../../components/common/Alert';
import TechRefCodeBlock from '../../components/technical-reference/TechRefCodeBlock';
import './WebhookIntegration.css';

const WebhookIntegration: React.FC = () => {
  const sections = [
    {
      id: 'overview',
      title: 'Overview',
    },
    {
      id: 'webhook-events',
      title: 'Webhook Events',
    },
    {
      id: 'webhook-format',
      title: 'Webhook Format',
    },
    {
      id: 'reservation-webhook',
      title: 'Reservation Webhook',
    },
    {
      id: 'cancellation-webhook',
      title: 'Cancellation Webhook',
    },
    {
      id: 'implementing-webhooks',
      title: 'Implementing Webhooks',
    },
    {
      id: 'testing-webhooks',
      title: 'Testing Webhooks',
    },
    {
      id: 'best-practices',
      title: 'Best Practices',
    },
  ];

  return (
    <>
      <div className="content-header">
        <h1>Webhook Integration</h1>
        <p>Receive real-time notifications about reservation events</p>
      </div>

      <OnThisPage sections={sections} />

      <div id="overview" className="section">
        <h2>Overview</h2>
        <p>
          Webhooks allow ARN to push data to your application when certain events occur on the hotel platform, such as
          reservation creation and cancellation. This enables you to build real-time integrations that respond immediately
          to changes in reservation status.
        </p>
        <Alert type="info" title="XML Format">
          <p>
            Webhooks are sent as HTTP POST requests with raw XML body and Content-Type set to 'text/xml'. Further webhook
            details can be found in the XML Web Services Support Guide.
          </p>
        </Alert>
      </div>

      <div id="webhook-events" className="section">
        <h2>Webhook Events</h2>
        <p>
          ARN currently supports the following webhook events:
        </p>
        <table className="webhook-events-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Reservation Creation</td>
              <td>Triggered when a new reservation is created</td>
            </tr>
            <tr>
              <td>Reservation Cancellation</td>
              <td>Triggered when a reservation is cancelled</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="webhook-format" className="section">
        <h2>Webhook Format</h2>
        <p>
          All webhooks are sent as HTTP POST requests with the following characteristics:
        </p>
        <ul className="webhook-format-list">
          <li><strong>Content-Type:</strong> text/xml</li>
          <li><strong>Body Format:</strong> Raw XML</li>
          <li><strong>Authentication:</strong> None (you should validate webhooks based on their content)</li>
        </ul>
        <p>
          Your webhook endpoint should respond with a 200 OK status code to acknowledge receipt of the webhook.
          If ARN doesn't receive a 200 OK response, it will retry sending the webhook several times.
        </p>
      </div>

      <div id="reservation-webhook" className="section">
        <h2>Reservation Webhook</h2>
        <p>
          The reservation webhook is triggered when a new reservation is created. It contains detailed information about
          the reservation, including guest details, room information, and payment details.
        </p>
        <h3>Reservation Webhook Example</h3>
        <TechRefCodeBlock
          code={`<ArnResponse>
  <Info SiteID="9852" Username="WBE" IpAddress="192.168.100.242" TimeReceived="2007-03-30T22:14:28.484" TimeCompleted="2007-03-30T22:14:32.046" Version="1.0.0.0" ServiceUrl="http://tripauthority.com/hotel.asmx" RequestID="D392A38B-79EC-4064-9C8F-E2C9AFC2EEE6"/>
  <Reservation DisplayCurrency="USD" ItineraryID="678595" RecordLocator="4fa67dc1-9d40-46f4-aa34-eb236117781c">
    <HotelReservation InDate="2007-03-30" OutDate="2007-03-31" Rooms="1" Adults="2" Children="0" ReservationID="860964" CustomerConfirmationNumber="40156457">
      <Hotel HotelID="10731">
        <RatePlan Code="AAA" Description="QUALIFYING MEMBER RATE: Aaa/CAA Rate 1 King Bed /1 Room Suite/Partial Room Divider /Microwave Refrigerator/Computer Hookup Guest Must Show Some Form Of Aaa Membership Rate Is Applicable To AAA Members Only And Only On Rooms They Stay In Themselv" Gateway="4">
          <Room Code="Z303AAA" Name="Room" Description="QUALIFYING MEMBER RATE: Aaa/CAA Rate 1 King Bed /1 Room Suite/Partial Room Divider /Microwave Refrigerator/Computer Hookup Guest Must Show Some Form Of Aaa Membership Rate Is Applicable To AAA Members Only And Only On Rooms They Stay In Themselv" CurrencyCode="USD" DisplayCurrencyMultiplier="1" USDMultiplier="1" ExchangeGMT="2007-03-30T17:15:04.627" MaximumBookable="1">
            <NightlyRate Date="2007-03-30" Price="98.95"/>
            <Tax Percent="0.00" Amount="0.00"/>
            <GatewayFee Amount="0.00"/>
            <Total Amount="98.95" IncludesBookingFee="false"/>
            <BookingFee Amount="5.00" CurrencyCode="USD" DisplayCurrencyMultiplier="1" RoomCurrencyMultiplier="1" ExchangeGMT="2007-03-30T17:15:04.627"/>
          </Room>
          <Policy>
            <ExtraPersonPrice Adult="5.00" Child="0.00" CurrencyCode="USD" DisplayCurrencyMultiplier="1" USDMultiplier="1" ExchangeGMT="2007-03-30T17:15:04.627"/>
            <Guarantee Description="RESERVATION WILL BE HELD TILL 4PM LOCAL TIME Booking fee is not included in the total and it's value is expressed in United States Dollars. Booking fee will be charged at the time of the booking."/>
            <Cancel Description="CANCEL BY 4 PM LOCAL HTL TIME DOA" LatestCancelTime="2007-03-29T10:00:00.000" GMTOffSet="0">
              <Fee Amount="0.00" CurrencyCode="USD" DisplayCurrencyMultiplier="1" RoomCurrencyMultiplier="1" ExchangeGMT="2007-03-30T17:15:04.627"/>
              <Penalty Amount="98.95" CurrencyCode="USD" DisplayCurrencyMultiplier="1" USDMultiplier="1" ExchangeGMT="2007-03-30T17:15:04.627"/>
            </Cancel>
            <Deposit Description="None"/>
            <Payment Description="Tax is not included in the total."/>
            <Payment Description="With your credit card information, the room(s) you book are guaranteed for late arrival."/>
            <Property Description="Check-In Time" Value="150000"/>
            <Property Description="Check-Out Time" Value="1100"/>
            <Payment Description="This discount rate requires a $5.00 (USD) per room per night non-refundable service fee at time of reservation and will appear on your credit card under Alliance Reservations Network, Phoenix, AZ."/>
          </Policy>
        </RatePlan>
      </Hotel>
      <Guests>
        <Primary Title="" FirstName="Eddie" MiddleName="" LastName="Collins" Message="Smoking room requested. " Email="XXX@yahoo.com" PhoneCountry="1" PhoneArea="313" PhoneNumber="5555555" PhoneExtension="" AgeGroup="Adult">
          <Address Type="Home" Address="main st" City="detroit" Region="MI" PostalCode="48234" CountryCode="US" ExtraInfo=""/>
        </Primary>
      </Guests>
      <Service ExchangeGMT="2007-03-30T17:15:04.627">
        <RoomCurrency CurrencyCode="USD">
          <Cost Price="98.95" TaxPercent="0.00" TaxAmount="0.00" GatewayFee="0.00" BookingFee="5.00" TotalAmount="103.95" TotalAmountIncludesBookingFee="true"/>
          <Charge Paid="5.00" Due="98.95"/>
        </RoomCurrency>
        <DisplayCurrency CurrencyCode="USD">
          <Cost Price="98.95" TaxPercent="0.00" TaxAmount="0.00" GatewayFee="0.00" BookingFee="5.00" TotalAmount="103.95" TotalAmountIncludesBookingFee="true"/>
          <Charge Paid="5.00" Due="98.95"/>
        </DisplayCurrency>
        <USD CurrencyCode="USD">
          <Cost Price="98.95" TaxPercent="0.00" TaxAmount="0.00" GatewayFee="0.00" BookingFee="5.00" TotalAmount="103.95" TotalAmountIncludesBookingFee="true"/>
          <Charge Paid="5.00" Due="98.95"/>
        </USD>
      </Service>
    </HotelReservation>
  </Reservation>
</ArnResponse>`}
          language="xml"
          title="Reservation Webhook Example"
        />
      </div>

      <div id="cancellation-webhook" className="section">
        <h2>Cancellation Webhook</h2>
        <p>
          The cancellation webhook is triggered when a reservation is cancelled. It contains information about the
          cancelled reservation, including the cancellation reason and timestamp.
        </p>
        <h3>Cancellation Webhook Example</h3>
        <TechRefCodeBlock
          code={`<ArnResponse>
  <Info SiteID="1478" Username="CustService" IpAddress="192.168.100.242" TimeReceived="2007-06-26T19:16:35.581" TimeCompleted="2007-06-26T19:16:36.065" Version="1.0.0.0" ServiceUrl="http://tripauthority.com/service.asmx" RequestID="52AEC4E5-BBB9-44CB-BF09-CFEE7462FE97"/>
  <Cancellation DisplayCurrency="USD" ItineraryID="733525">
    <HotelCancellation Success="true" CancelGMT="2007-06-26T19:16:36.065" CancellationID="ARN342559-C" InDate="2007-06-29" OutDate="2007-06-30" Rooms="1" Adults="2" Children="0" ReservationID="915892" CustomerConfirmationNumber="ARN342559">
      <Hotel HotelID="219295">
        <RatePlan Code="ARN" Description="Internet Special" Gateway="1">
          <Room Code="3979" Name="Double Room" Description="Double Room - one double bed, satellite television, minibar, coffee maker, in-room safe, work desk, air conditioning, hairdryer, private bathroom, complimentary breakfast buffet. <b>Rate includes transportation from the airport to the hotel. Please enter your Airline and Flight Number in the 'Other Special Requests' field when placing your reservation.</b> Rates based on single or double occupancy. (Maximum 2 people)" CurrencyCode="USD" DisplayCurrencyMultiplier="1" USDMultiplier="1" ExchangeGMT="2007-06-23T17:15:03.443" MaximumBookable="5">
            <NightlyRate Date="2007-06-29" Price="144.00"/>
            <Tax Percent="20.00" Amount="28.80"/>
            <GatewayFee Amount="0.00"/>
            <Total Amount="172.80" IncludesBookingFee="false"/>
            <BookingFee Amount="3.60" CurrencyCode="USD" DisplayCurrencyMultiplier="1" RoomCurrencyMultiplier="1" ExchangeGMT="2007-06-23T17:15:03.443"/>
          </Room>
          <Policy>
            <ExtraPersonPrice Adult="0.00" Child="0.00" CurrencyCode="USD" DisplayCurrencyMultiplier="1" USDMultiplier="1" ExchangeGMT="2007-06-23T17:15:03.443"/>
            <Guarantee Description="No prices or hotel availability are guaranteed until full payment is received. Booking fee is not included in the total and it's value is expressed in United States Dollars. Booking fee will be charged at the time of the booking."/>
            <Cancel Description="You must cancel your reservation before 2:00 pm hotel time at least 1 day(s) prior to check-in or you will be charged for one night's room plus taxes & fees." LatestCancelTime="2007-06-28T14:00:00.000" GMTOffSet="0">
              <Fee Amount="10.00" CurrencyCode="USD" DisplayCurrencyMultiplier="1" RoomCurrencyMultiplier="1" ExchangeGMT="2007-06-23T17:15:03.443"/>
              <Penalty Amount="172.80" CurrencyCode="USD" DisplayCurrencyMultiplier="1" USDMultiplier="1" ExchangeGMT="2007-06-23T17:15:03.443"/>
            </Cancel>
            <Deposit Description="Credit card is charged for the total cost of the room at the time of booking."/>
            <Payment Description="Tax is included in the total."/>
            <Payment Description="Total Room Cost includes tax recovery charge and fees."/>
            <Payment Description="This discount rate requires full payment of reservation at time of booking."/>
            <Payment Description="Payment will appear on your credit card under Alliance Reservations Network, Phoenix, AZ"/>
            <Payment Description="Rooms are guaranteed once full payment is received."/>
            <Property Description="Check-In Time" Value="1600"/>
            <Property Description="Check-Out Time" Value="1100"/>
          </Policy>
        </RatePlan>
      </Hotel>
      <Guests>
        <Primary Title="" FirstName="Mary" MiddleName="" LastName="Andersen" Message="Non-smoking room requested." Email="karianan@xxx.com" PhoneCountry="0047" PhoneArea="0" PhoneNumber="5555555" PhoneExtension="" AgeGroup="Adult">
          <Address Type="Home" Address="Vaar Frue gt 2" City="Zeud" Region="" PostalCode="7013" CountryCode="NO" ExtraInfo=""/>
        </Primary>
      </Guests>
      <Service ExchangeGMT="2007-06-23T17:15:03.443">
        <RoomCurrency CurrencyCode="USD">
          <Cost Price="144.00" TaxPercent="20.00" TaxAmount="28.80" GatewayFee="0.00" BookingFee="3.60" TotalAmount="176.40" TotalAmountIncludesBookingFee="true"/>
          <Charge Paid="176.40" Due="0.00"/>
        </RoomCurrency>
        <DisplayCurrency CurrencyCode="USD">
          <Cost Price="144.00" TaxPercent="20.00" TaxAmount="28.80" GatewayFee="0.00" BookingFee="3.60" TotalAmount="176.40" TotalAmountIncludesBookingFee="true"/>
          <Charge Paid="176.40" Due="0.00"/>
        </DisplayCurrency>
        <USD CurrencyCode="USD">
          <Cost Price="144.00" TaxPercent="20.00" TaxAmount="28.80" GatewayFee="0.00" BookingFee="3.60" TotalAmount="176.40" TotalAmountIncludesBookingFee="true"/>
          <Charge Paid="176.40" Due="0.00"/>
        </USD>
      </Service>
    </HotelCancellation>
  </Cancellation>
</ArnResponse>`}
          language="xml"
          title="Cancellation Webhook Example"
        />
      </div>

      <div id="implementing-webhooks" className="section">
        <h2>Implementing Webhooks</h2>
        <p>
          To implement webhooks in your application, follow these steps:
        </p>
        <ol className="implementing-webhooks-list">
          <li>
            <strong>Create a webhook endpoint</strong> in your application that can receive HTTP POST requests with XML content.
            <TechRefCodeBlock
              code={`// Example webhook endpoint in Node.js with Express
const express = require('express');
const app = express();
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ explicitArray: false });

// Configure Express to accept raw XML
app.use(express.text({ type: 'text/xml' }));

// Reservation webhook endpoint
app.post('/webhooks/reservation', async (req, res) => {
  try {
    // Parse the XML body
    const result = await parser.parseStringPromise(req.body);

    // Process the reservation data
    const arnResponse = result.ArnResponse;
    const reservation = arnResponse.Reservation;
    const hotelReservation = reservation.HotelReservation;
    console.log('New reservation received:', reservation.RecordLocator);
    console.log('Confirmation Number:', hotelReservation.CustomerConfirmationNumber);

    // Your business logic here...

    // Acknowledge receipt
    res.status(200).send('OK');
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).send('Error processing webhook');
  }
});

// Cancellation webhook endpoint
app.post('/webhooks/cancellation', async (req, res) => {
  try {
    // Parse the XML body
    const result = await parser.parseStringPromise(req.body);

    // Process the cancellation data
    const arnResponse = result.ArnResponse;
    const cancellation = arnResponse.Cancellation;
    const hotelCancellation = cancellation.HotelCancellation;
    console.log('Cancellation received:', hotelCancellation.CustomerConfirmationNumber);
    console.log('Cancellation ID:', hotelCancellation.CancellationID);

    // Your business logic here...

    // Acknowledge receipt
    res.status(200).send('OK');
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).send('Error processing webhook');
  }
});

app.listen(3000, () => {
  console.log('Webhook server listening on port 3000');
});`}
              language="javascript"
              title="Webhook Implementation Example"
            />
          </li>
          <li>
            <strong>Make your endpoint publicly accessible</strong> so that ARN can send webhooks to it. This typically
            involves deploying your application to a server with a public IP address or using a service like ngrok for
            local development.
          </li>
          <li>
            <strong>Register your webhook URL</strong> with ARN by contacting support through the Partner Request form.
            Provide the following information:
            <ul>
              <li>Your Site ID</li>
              <li>The URL of your webhook endpoint</li>
              <li>The events you want to receive (reservation creation, cancellation, or both)</li>
            </ul>
          </li>
          <li>
            <strong>Implement validation logic</strong> to ensure that the webhooks you receive are legitimate and contain
            valid data.
          </li>
          <li>
            <strong>Implement error handling</strong> to gracefully handle any issues that may arise when processing webhooks.
          </li>
        </ol>
      </div>

      <div id="testing-webhooks" className="section">
        <h2>Testing Webhooks</h2>
        <p>
          To test your webhook implementation, you can use the following approaches:
        </p>
        <ul className="testing-webhooks-list">
          <li>
            <strong>Create test reservations</strong> in the ARN test environment using the API. This will trigger
            reservation webhooks to be sent to your registered endpoint.
          </li>
          <li>
            <strong>Cancel test reservations</strong> to trigger cancellation webhooks.
          </li>
          <li>
            <strong>Use a webhook testing tool</strong> like ngrok or Webhook.site to inspect and debug the webhooks
            you receive.
          </li>
        </ul>
        <Alert type="info" title="Test Mode">
          <p>
            Webhooks sent from the test environment will have slightly different data than production webhooks.
            Test webhooks will contain simulated data and will be clearly marked as test data.
          </p>
        </Alert>
      </div>

      <div id="best-practices" className="section">
        <h2>Best Practices</h2>
        <p>
          Follow these best practices when implementing webhooks:
        </p>
        <ul className="best-practices-list">
          <li>
            <strong>Respond quickly</strong> to webhook requests. Your endpoint should acknowledge receipt of the webhook
            as soon as possible by returning a 200 OK status code, even if you need to process the data asynchronously.
          </li>
          <li>
            <strong>Implement idempotency</strong> to handle duplicate webhooks. ARN may send the same webhook multiple
            times if your endpoint doesn't respond with a 200 OK status code.
          </li>
          <li>
            <strong>Validate webhook data</strong> before processing it to ensure it's legitimate and contains all the
            required fields.
          </li>
          <li>
            <strong>Implement proper error handling</strong> to gracefully handle any issues that may arise when processing
            webhooks.
          </li>
          <li>
            <strong>Log webhook data</strong> for debugging and auditing purposes, but be careful not to log sensitive
            information like credit card details.
          </li>
          <li>
            <strong>Implement retry logic</strong> for any actions that depend on external services, as these may fail
            temporarily.
          </li>
        </ul>
      </div>
    </>
  );
};

export default WebhookIntegration;
