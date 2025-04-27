import React from 'react';
import Alert from '../../../components/common/Alert';
import EndpointPage from '../../../components/endpoints/EndpointPage';
import './ReservationCreation.css';

const ReservationCreation: React.FC = () => {
  const sections = [
    {
      id: 'endpoint',
      title: 'Endpoint',
    },
    {
      id: 'headers',
      title: 'Headers',
    },
    {
      id: 'request',
      title: 'Request',
      subsections: [
        {
          id: 'request-parameters',
          title: 'Request Parameters',
        },
        {
          id: 'request-example',
          title: 'Request Example',
        },
      ],
    },
    {
      id: 'response',
      title: 'Response',
      subsections: [
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
      id: 'differences-production',
      title: 'Test x Production',
    },
    {
      id: 'code-examples',
      title: 'Code Examples',
    },
    {
      id: 'next-steps',
      title: 'Next Steps',
    },
  ];

  return (
    <EndpointPage
        title="Reservation Creation"
        description="Create a hotel reservation using the selected rate"
        sections={sections}
        endpoint={{
          method: 'POST',
          url: 'https://api.travsrv.com/api/hotel?type=reservation',
          id: 'reservation-creation',
          category: 'hotel',
          endpointDescription: "This endpoint is used to create a hotel reservation based on a previously selected rate. Once the guest has decided to book a particular rate and has viewed all the relevant details, policies, and charges, you should use the information contained within the Rate Details response, combined with guest information to build a reservation creation request. <br><br> All reservation requests should be considered limited to only one room per reservation. Our advice is to take a single room detail response and make a booking request from it; that's what it'll be validated against. For collections and accounting reasons, this request must be made for a single room, with the number of guests that will be in this room. <br><br> The reservation response will contain three important values: the reservation ID, itinerary ID (both needed to cancel a reservation), and the confirmation number which you'll provide to the guest. You must store all of these for later use. <br><br> <strong>Important:</strong> This endpoint requires data to be sent as multipart/form-data, not as JSON.",
          requestParametersDescription: "The request should be sent as multipart/form-data with the following parameters.",
          nextSteps: "After creating a reservation, you can view the reservation details using the <a href='/endpoints/hotel/itinerary-by-locator'>Itinerary by Reservation Locator</a> endpoint. Make sure to note the <code>reservationId</code>, <code>itineraryId</code>, and <code>confirmationNumber</code> from the response as they will be required for managing the reservation."
      }}
      authentication={{
        required: true,
        headers: [
          {
            name: 'Site-Id',
            required: 'Yes'
          },
          {
            name: 'API-ClientUsername',
            required: 'Yes'
          },
          {
            name: 'API-ClientPassword',
            required: 'Yes'
          },
          {
            name: 'Content-Type',
            required: 'Yes',
            value: 'multipart/form-data'
          },
          {
            name: 'Accept-version',
            required: 'No',
            value: '2'
          },
          {
            name: 'Authorization',
            required: 'Yes',
            value: 'Basic (Base64 encoded username:password)'
          }
        ]
      }}
      requestParameters={[
        // Parâmetros básicos
        {
          name: 'type',
          type: 'string',
          required: true,
          description: 'Must be set to "reservation"',
          example: 'reservation',
          section: 'Basic Parameters'
        },
        {
          name: 'inDate',
          type: 'string',
          required: true,
          description: 'Desired check-in date (format: YYYY-MM-DD based on UTC-7 (MST) time zone)',
          example: '2025-06-15',
          section: 'Basic Parameters'
        },
        {
          name: 'outDate',
          type: 'string',
          required: true,
          description: 'Desired check-out date (format: YYYY-MM-DD based on UTC-7 (MST) time zone)',
          example: '2025-06-20',
          section: 'Basic Parameters'
        },
        {
          name: 'siteid',
          type: 'integer',
          required: true,
          description: 'The siteID is the site (particular set of settings) in which you want to utilize for your search (provided by your Account Manager)',
          example: 'YOUR_SITE_ID',
          section: 'Basic Parameters'
        },
        {
          name: 'rooms',
          type: 'integer',
          required: true,
          description: 'Number of rooms needed. When searching for more than one room, responses are based on the same room type and occupancy for every room. Maximum: 9 (best results with no more than 4)',
          example: '1',
          section: 'Basic Parameters'
        },
        {
          name: 'adults',
          type: 'integer',
          required: true,
          description: 'Total number of adults. For instance, if rooms=2 and adults=2, then the search is for 1 room per adult. Maximum 8 adults per room',
          example: '2',
          section: 'Basic Parameters'
        },
        {
          name: 'children',
          type: 'integer',
          required: true,
          description: 'Total number of children. Maximum: 8. Note: Some legacy providers do not honor the children parameter',
          example: '0',
          section: 'Basic Parameters'
        },
        {
          name: 'childages',
          type: 'string',
          required: false,
          description: 'Child age or comma-separated list of ages',
          example: '10,12',
          section: 'Basic Parameters'
        },
        {
          name: 'currency',
          type: 'string',
          required: false,
          description: 'Default: "USD". Supported currencies are located in static database files. Major 3-letter currency references (e.g., "USD", "CNY", "CAD", etc.) are supported',
          example: 'USD',
          section: 'Basic Parameters'
        },
        {
          name: 'timeout',
          type: 'integer',
          required: false,
          description: 'Default: 15. Maximum time to allow for searching gateways, measured in seconds',
          example: '15',
          section: 'Basic Parameters'
        },
        {
          name: 'ipAddress',
          type: 'string',
          required: false,
          description: 'The IPv4 address of the person browsing your website. Requested for fraud checking and preventing booking failures',
          example: '192.168.1.1',
          section: 'Basic Parameters'
        },
        {
          name: 'locale',
          type: 'string',
          required: false,
          description: 'Default: "US". Specifies the response localization',
          example: 'US',
          section: 'Basic Parameters'
        },
        {
          name: 'userAgent',
          type: 'string',
          required: true,
          description: 'The userAgent of the app/browser of the person browsing your website. Used for fraud checking and preventing booking failures',
          example: 'Mozilla/5.0',
          section: 'Basic Parameters'
        },
        {
          name: 'userLanguage',
          type: 'string',
          required: true,
          description: 'The language of the browser of the person browsing your website. Used for fraud checking and preventing booking failures',
          example: 'en',
          section: 'Basic Parameters'
        },
        {
          name: 'hotelids',
          type: 'string',
          required: true,
          description: 'Hotel ID obtained from the Availability Search response',
          example: '34853',
          section: 'Booking Parameters'
        },
        {
          name: 'ratePlanCode',
          type: 'string',
          required: true,
          description: 'Rate plan code obtained from the Rate Details response',
          example: '62807arvlm5s3fvlx0iqsmxqb',
          section: 'Booking Parameters'
        },
        {
          name: 'roomCode',
          type: 'string',
          required: true,
          description: 'Room code obtained from the Rate Details response',
          example: '29h76bywy7siyzzpurzawjdyf',
          section: 'Booking Parameters'
        },
        {
          name: 'gateway',
          type: 'string',
          required: true,
          description: 'Gateway identifier obtained from the Rate Details response',
          example: '28',
          section: 'Booking Parameters'
        },
        {
          name: 'recordLocator',
          type: 'string',
          required: false,
          description: 'A unique GUID so a reservation can be looked up later. Format: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
          example: '12345678-1234-1234-1234-123456789012',
          section: 'Booking Parameters'
        },
        // Parâmetros de informações do hóspede
        {
          name: 'guestFirstName',
          type: 'string',
          required: true,
          description: 'Primary guest\'s first name',
          example: 'John',
          section: 'Guest Information'
        },
        {
          name: 'guestLastName',
          type: 'string',
          required: true,
          description: 'Primary guest\'s last name',
          example: 'Doe',
          section: 'Guest Information'
        },
        {
          name: 'guestEmail',
          type: 'string',
          required: true,
          description: 'Primary guest\'s email address',
          example: 'john.doe@example.com',
          section: 'Guest Information'
        },
        {
          name: 'guestPhoneCountry',
          type: 'string',
          required: true,
          description: 'Primary guest\'s phone country code (e.g., "1" for US)',
          example: '1',
          section: 'Guest Information'
        },
        {
          name: 'guestPhoneArea',
          type: 'string',
          required: true,
          description: 'Primary guest\'s phone area code',
          example: '123',
          section: 'Guest Information'
        },
        {
          name: 'guestPhoneNumber',
          type: 'string',
          required: true,
          description: 'Primary guest\'s phone number (numerical characters only)',
          example: '1234567890',
          section: 'Guest Information'
        },
        {
          name: 'guestPhoneExtension',
          type: 'string',
          required: false,
          description: 'Primary guest\'s phone extension',
          example: '123',
          section: 'Guest Information'
        },
        {
          name: 'guestTitle',
          type: 'string',
          required: false,
          description: 'Primary guest\'s title',
          example: 'Mr',
          section: 'Guest Information'
        },
        {
          name: 'guestMessage',
          type: 'string',
          required: false,
          description: 'Message from the guest to the hotel',
          example: 'Please provide a room with a view if possible',
          section: 'Guest Information'
        },
        {
          name: 'addressAddress',
          type: 'string',
          required: true,
          description: 'Primary guest\'s address',
          example: '123 Made Up Ln.',
          section: 'Guest Information'
        },
        {
          name: 'addressCity',
          type: 'string',
          required: true,
          description: 'Primary guest\'s city',
          example: 'New York',
          section: 'Guest Information'
        },
        {
          name: 'addressRegion',
          type: 'string',
          required: true,
          description: 'Primary guest\'s state/region',
          example: 'NY',
          section: 'Guest Information'
        },
        {
          name: 'addressPostalCode',
          type: 'string',
          required: true,
          description: 'Primary guest\'s postal code',
          example: '10001',
          section: 'Guest Information'
        },
        {
          name: 'addressCountryCode',
          type: 'string',
          required: true,
          description: 'Primary guest\'s country code',
          example: 'US',
          section: 'Guest Information'
        },
        {
          name: 'addressExtraInfo',
          type: 'string',
          required: false,
          description: 'Extra information about the guest\'s address',
          example: 'Apt 4B',
          section: 'Guest Information'
        },
        // Parâmetros de informações de pagamento
        {
          name: 'creditCardNumber',
          type: 'string',
          required: true,
          description: 'Credit card number',
          example: '4111111111111111',
          section: 'Payment Information'
        },
        {
          name: 'creditCardHolder',
          type: 'string',
          required: true,
          description: 'Credit card holder\'s full name',
          example: 'John Doe',
          section: 'Payment Information'
        },
        {
          name: 'creditCardExpiration',
          type: 'string',
          required: true,
          description: 'Expiration date of credit card (format: MM/YY)',
          example: '12/25',
          section: 'Payment Information'
        },
        {
          name: 'creditCardCVV2',
          type: 'string',
          required: true,
          description: 'Verification code from back of credit card',
          example: '123',
          section: 'Payment Information'
        },
        {
          name: 'creditCardType',
          type: 'string',
          required: true,
          description: 'Credit card type (e.g., "VI" for Visa, "MC" for MasterCard)',
          example: 'VI',
          section: 'Payment Information'
        },
        {
          name: 'creditCardAddress',
          type: 'string',
          required: true,
          description: 'Address of credit card owner',
          example: '123 Main St',
          section: 'Payment Information'
        },
        {
          name: 'creditCardCity',
          type: 'string',
          required: true,
          description: 'City of credit card owner',
          example: 'New York',
          section: 'Payment Information'
        },
        {
          name: 'creditCardRegion',
          type: 'string',
          required: true,
          description: 'Region/state of credit card owner',
          example: 'NY',
          section: 'Payment Information'
        },
        {
          name: 'creditCardPostalCode',
          type: 'string',
          required: true,
          description: 'Postal code of credit card owner',
          example: '10001',
          section: 'Payment Information'
        },
        {
          name: 'creditCardCountryCode',
          type: 'string',
          required: true,
          description: 'Country code of credit card owner',
          example: 'US',
          section: 'Payment Information'
        },
        // Parâmetros de informações de reserva (da resposta Rate Details)
        {
          name: 'roomCostPrice',
          type: 'string',
          required: true,
          description: 'Room cost price from Rate Details response',
          example: '1293.00',
          section: 'Booking Information'
        },
        {
          name: 'roomCostTaxAmount',
          type: 'string',
          required: true,
          description: 'Room tax amount from Rate Details response',
          example: '155.16',
          section: 'Booking Information'
        },
        {
          name: 'roomCostGatewayFee',
          type: 'string',
          required: true,
          description: 'Gateway fee amount from Rate Details response',
          example: '0.00',
          section: 'Booking Information'
        },
        {
          name: 'roomCostTotalAmount',
          type: 'string',
          required: true,
          description: 'Total amount from Rate Details response',
          example: '1448.16',
          section: 'Booking Information'
        },
        {
          name: 'roomCostCurrencyCode',
          type: 'string',
          required: true,
          description: 'Currency code from Rate Details response',
          example: 'EUR',
          section: 'Booking Information'
        },
        {
          name: 'bookingFeeAmount',
          type: 'string',
          required: false,
          description: 'Booking fee amount',
          example: '5.00',
          section: 'Booking Information'
        },
        {
          name: 'bookingFeeCurrencyCode',
          type: 'string',
          required: false,
          description: 'Currency code for booking fee',
          example: 'USD',
          section: 'Booking Information'
        },
        {
          name: 'specialRequests',
          type: 'string',
          required: false,
          description: 'Special requests for the hotel',
          example: 'This is a test reservation. Please do not actually book this room.',
          section: 'Additional Information'
        },
        {
          name: '_type',
          type: 'string',
          required: false,
          description: 'Default: json. Format of API response, formats available are \'json\' and \'xml\'',
          example: 'json',
          section: 'Additional Information'
        }
      ]}
      requestExample={{
        url: 'https://api.travsrv.com/api/hotel?type=reservation&siteid=64&_type=json',
        method: 'POST',
        headers: [
          {
            name: 'Host',
            value: 'api.travsrv.com'
          },
          {
            name: 'Site-Id',
            value: '64'
          },
          {
            name: 'API-ClientUsername',
            value: 'publictest'
          },
          {
            name: 'API-ClientPassword',
            value: 'testme1'
          },
          {
            name: 'Content-Type',
            value: 'multipart/form-data'
          },
          {
            name: 'Accept-version',
            value: '2'
          },
          {
            name: 'Authorization',
            value: 'Basic cHVibGljdGVzdDp0ZXN0bWUx'
          }
        ],
        body: `type=reservation
inDate=2025-06-15
outDate=2025-06-20
siteid=64
rooms=1
adults=2
children=0
userAgent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36
userLanguage=en-US
ipAddress=1.1.1.1
locale=en
currency=USD
_type=json
hotelids=34853
ratePlanCode=62807arvlm5s3fvlx0iqsmxqb
roomCode=29h76bywy7siyzzpurzawjdyf
gateway=28
guestFirstName=Test
guestLastName=Guest
guestEmail=guest@example.com
guestPhoneCountry=1
guestPhoneArea=123
guestPhoneNumber=1234567890
addressAddress=123 Made Up Ln.
addressCity=Example City
addressRegion=FL
addressPostalCode=12345
addressCountryCode=US
creditCardNumber=4111111111111111
creditCardHolder=Test Cardholder
creditCardExpiration=05/25
creditCardCVV2=123
creditCardType=VI
creditCardAddress=123 Test Street
creditCardCity=Test City
creditCardRegion=FL
creditCardPostalCode=12345
creditCardCountryCode=US
roomCostPrice=1293.00
roomCostTaxAmount=155.16
roomCostGatewayFee=0.00
roomCostTotalAmount=1448.16
roomCostCurrencyCode=EUR
bookingFeeAmount=5.00
bookingFeeCurrencyCode=USD
specialRequests=This is a test reservation. Please do not actually book this room.`
      }}
      responseExample={{
        status: 200,
        body: `{
  "ArnResponse": {
    "Info": {
      "@SiteID": "64",
      "@Username": "publictest",
      "@IpAddress": "10.172.25.255",
      "@TimeReceived": "2025-04-27T01:57:30.875",
      "@TimeCompleted": "2025-04-27T01:57:32.966",
      "@Version": "2",
      "@ServiceUrl": "http://api.travsrv.com/api/hotel?_type=json&siteid=64&type=reservation",
      "@RequestID": "50078345-2EBA-4FE6-BF24-B2788187B16B",
      "@ReturnedRateCount": "1"
    },
    "Reservation": {
      "@DisplayCurrency": "USD",
      "@RecordLocator": "c8eae170-d1c6-4c15-abfb-77ce2220782f",
      "@ItineraryID": "12907054",
      "HotelReservation": {
        "@InDate": "2025-06-15",
        "@OutDate": "2025-06-20",
        "@Rooms": "1",
        "@Adults": "2",
        "@Children": "0",
        "@ReservationID": "12955221",
        "@CustomerConfirmationNumber": "987618",
        "@ReservationLocator": "1286894",
        "Hotel": [
          {
            "@HotelID": "34853",
            "@HotelInfo": "https://api.travsrv.com/api/content/findpropertyinfo?propertyid=34853",
            "@Latitude": "28.36289",
            "@Longitude": "-81.50106",
            "@Name": "Bryan's Spanish Cove",
            "@Address1": "13875 State Road 535",
            "@City": "Orlando",
            "@State": "FL",
            "@CountryCode": "US",
            "@Postal": "32821",
            "@PercentMatch": "0",
            "@ImageThumbnail": "https://media.travsrv.com/images/34853/1385646434_70.jpg",
            "@LocationDescription": "",
            "@TripAdvisorReviewCount": "959",
            "@TripAdvisorRating": "4.6",
            "@RatingImageUrl": "https://media.travsrv.com/appSkins/64/v6/themes/standard/images/ratings/star-rating-four-and-half.png?v=4",
            "@PriceClass": "3 Stars",
            "@TripAdvisorPartnerLocationId": "133090",
            "@PropertyType": "Hotel",
            "@PropertyLink": "https://travsrv.com/v6?type=property&rooms=1&adults=1&children=0&checkIn=0001-01-01&checkOut=0001-01-01&siteid=64&property=34853",
            "RatePlan": [
              {
                "@Code": "62807arvlm5s3fvlx0iqsmxqb",
                "@Description": "Xroiuqy ucoyetn?",
                "@Gateway": "28",
                "@CommissionStatus": "Commissionable",
                "@BalanceDueAtHotel": "false",
                "Room": [
                  {
                    "@Code": "29h76bywy7siyzzpurzawjdyf",
                    "@Name": "Ivaysad jqimchs elrptdy xfcybxu rbemyfv hjqimnb aycphpl resiavu zttftmw dapaocy tjiddit ssqqfho nsxttte.",
                    "@Description": "Test Commissionable: Ivaysad jqimchs elrptdy xfcybxu rbemyfv hjqimnb aycphpl resiavu zttftmw dapaocy tjiddit ssqqfho nsxttte. Adults: 2 Children: 0",
                    "@CurrencyCode": "EUR",
                    "@DisplayCurrencyMultiplier": "1.1380448390",
                    "@USDMultiplier": "1.1380448390",
                    "@ExchangeGMT": "2025-04-27T01:00:09.423",
                    "@MaximumBookable": "15",
                    "@ETP": "0",
                    "@Refundable": "true",
                    "@CancellationFee": "0.00",
                    "NightlyRate": [
                      {
                        "@Date": "2025-06-15",
                        "@Price": "495.00"
                      },
                      {
                        "@Date": "2025-06-16",
                        "@Price": "266.00"
                      },
                      {
                        "@Date": "2025-06-17",
                        "@Price": "266.00"
                      },
                      {
                        "@Date": "2025-06-18",
                        "@Price": "266.00"
                      },
                      {
                        "@Date": "2025-06-19",
                        "@Price": "0.00"
                      }
                    ],
                    "Tax": {
                      "@Percent": "10.71",
                      "@Amount": "155.16"
                    },
                    "GatewayFee": {
                      "@Amount": "0.00"
                    },
                    "Total": {
                      "@Amount": "1448.16",
                      "@IncludesBookingFee": "false"
                    },
                    "BookingFee": {
                      "@Amount": "5.00",
                      "@CurrencyCode": "USD",
                      "@DisplayCurrencyMultiplier": "1",
                      "@RoomCurrencyMultiplier": "0.8787000000",
                      "@ExchangeGMT": "2025-04-27T01:00:09.423"
                    },
                    "DueOnArrival": null,
                    "AddedValue": null
                  }
                ],
                "Policy": {
                  "ExtraPersonPrice": {
                    "@Adult": "0.00",
                    "@Child": "0.00",
                    "@CurrencyCode": "EUR",
                    "@DisplayCurrencyMultiplier": "1.1380448390",
                    "@USDMultiplier": "1.1380448390",
                    "@ExchangeGMT": "2025-04-27T01:00:09.423"
                  },
                  "Guarantee": {
                    "@Description": "This is a test Guarantee policy, nothing is required."
                  },
                  "Cancel": {
                    "@Description": "This is a test Cancel policy, there are no penalties for cancelling it.  Thank you for testing.",
                    "@DescriptionRaw": "This is a test Cancel policy, there are no penalties for cancelling it.  Thank you for testing.",
                    "@LatestCancelTime": "2025-06-14T04:00:00.000",
                    "@GMTOffSet": "0",
                    "Fee": {
                      "@Amount": "0.00",
                      "@CurrencyCode": "USD",
                      "@DisplayCurrencyMultiplier": "1",
                      "@RoomCurrencyMultiplier": "0.8787000000",
                      "@ExchangeGMT": "2025-04-27T01:00:11.500"
                    },
                    "Penalty": {
                      "@Amount": "0.00",
                      "@CurrencyCode": "EUR",
                      "@DisplayCurrencyMultiplier": "1.1380448390",
                      "@USDMultiplier": "1.1380448390",
                      "@ExchangeGMT": "2025-04-27T01:00:09.423"
                    }
                  },
                  "Deposit": {
                    "@Description": "This is a test Deposit policy, nothing is required."
                  },
                  "ExtraFees": {
                    "@Description": "This price is based on the number of adults you specified in your search. The hotel may charge additional fees when more than two adults stay in a single room, per the hotel's individual policy. Any additional fees will be charged by the hotel directly at the time of checkout. For more details on fees associated with more than two adults staying in a single room, please contact the hotel directly. Guest will be responsible for additional fees such as additional guests, security deposit, incidentals, resort fees, and additional room nights. Guest will pay hotel directly for these charges if they exist."
                  },
                  "Payment": [
                    {
                      "@Description": "This reservation requires a non-refundable fee of 5.00 USD at time of reservation. This amount will appear on your credit card statement under Hotel Accommodations. ",
                      "@Type": "BookingFee"
                    },
                    {
                      "@Description": "Testing multiple payment policies again"
                    },
                    {
                      "@Description": "Testing multiple payment policies"
                    },
                    {
                      "@Description": "This is a test Payment policy, nothing is required."
                    },
                    {
                      "@Description": "Payment will appear on your credit card under Hotel Accommodations.  You will be charged immediately for the full amount in EUR. "
                    }
                  ],
                  "ChargeName": {
                    "@Description": "Hotel Accommodations"
                  },
                  "Property": [
                    {
                      "@Description": "Check-In Time",
                      "@Value": "4 PM"
                    },
                    {
                      "@Description": "Check-Out Time",
                      "@Value": "10 AM"
                    }
                  ],
                  "NoteToHotelPersonnel": {
                    "@Description": ""
                  },
                  "CheckInSupport": {
                    "@Description": ""
                  }
                }
              }
            ]
          }
        ],
        "Guests": {
          "Primary": {
            "@Title": "",
            "@FirstName": "Test",
            "@MiddleName": "",
            "@LastName": "Guest",
            "@Message": "",
            "@Email": "guest@example.com",
            "@PhoneCountry": "1",
            "@PhoneArea": "123",
            "@PhoneNumber": "1234567890",
            "@PhoneExtension": "",
            "@AgeGroup": "Adult",
            "Address": {
              "@Type": "Home",
              "@Address": "123 Made Up Ln.",
              "@City": "Example City",
              "@Region": "FL",
              "@PostalCode": "12345",
              "@CountryCode": "US",
              "@ExtraInfo": ""
            }
          }
        },
        "Service": {
          "@ExchangeGMT": "2025-04-27T01:00:09.423",
          "RoomCurrency": {
            "@CurrencyCode": "EUR",
            "Cost": {
              "@Price": "1293.00",
              "@TaxPercent": "10.71",
              "@TaxAmount": "155.16",
              "@GatewayFee": "0.00",
              "@BookingFee": "4.39",
              "@TotalAmount": "1452.55",
              "@TotalAmountIncludesBookingFee": "true"
            },
            "Charge": {
              "@Paid": "0.00",
              "@Due": "1452.55"
            }
          },
          "DisplayCurrency": {
            "@CurrencyCode": "USD",
            "Cost": {
              "@Price": "1471.49",
              "@TaxPercent": "10.71",
              "@TaxAmount": "176.58",
              "@GatewayFee": "0.00",
              "@BookingFee": "5.00",
              "@TotalAmount": "1653.07",
              "@TotalAmountIncludesBookingFee": "true"
            },
            "Charge": {
              "@Paid": "0.00",
              "@Due": "1653.07"
            }
          },
          "USD": {
            "Cost": {
              "@Price": "1471.49",
              "@TaxPercent": "10.71",
              "@TaxAmount": "176.58",
              "@GatewayFee": "0.00",
              "@BookingFee": "5.00",
              "@TotalAmount": "1653.07",
              "@TotalAmountIncludesBookingFee": "true"
            },
            "Charge": {
              "@Paid": "0.00",
              "@Due": "1653.07"
            }
          }
        }
      }
    }
  }
}`
      }}
      responseParameters={[
        // ArnResponse Object
        {
          name: 'ArnResponse',
          type: 'object',
          section: 'ArnResponse Object',
          description: 'Root object containing all response data'
        },
        {
          name: 'ArnResponse.Info',
          type: 'object',
          section: 'ArnResponse Object',
          description: 'Contains information about the API request'
        },
        {
          name: 'ArnResponse.Reservation',
          type: 'object',
          section: 'ArnResponse Object',
          description: 'Contains all reservation details'
        },

        // Info Object
        {
          name: 'Info',
          type: 'object',
          section: 'Info Object',
          description: 'Contains information about the API request'
        },
        {
          name: '@SiteID',
          type: 'string',
          section: 'Info Object',
          description: 'Site identifier used for the request'
        },
        {
          name: '@Username',
          type: 'string',
          section: 'Info Object',
          description: 'Username used for the request'
        },
        {
          name: '@IpAddress',
          type: 'string',
          section: 'Info Object',
          description: 'IP address of the client making the request'
        },
        {
          name: '@TimeReceived',
          type: 'string',
          section: 'Info Object',
          description: 'Timestamp when the request was received'
        },
        {
          name: '@TimeCompleted',
          type: 'string',
          section: 'Info Object',
          description: 'Timestamp when the request was completed'
        },
        {
          name: '@Version',
          type: 'string',
          section: 'Info Object',
          description: 'API version used for the request'
        },
        {
          name: '@ServiceUrl',
          type: 'string',
          section: 'Info Object',
          description: 'Service URL for the API'
        },
        {
          name: '@RequestID',
          type: 'string',
          section: 'Info Object',
          description: 'Unique identifier for the request'
        },
        {
          name: '@ReturnedRateCount',
          type: 'string',
          section: 'Info Object',
          description: 'Number of rates returned in the response'
        },

        // Reservation Object
        {
          name: 'Reservation',
          type: 'object',
          section: 'Reservation Object',
          description: 'Contains all reservation details'
        },
        {
          name: '@DisplayCurrency',
          type: 'string',
          section: 'Reservation Object',
          description: 'Currency used for displaying prices (e.g., "USD")'
        },
        {
          name: '@RecordLocator',
          type: 'string',
          section: 'Reservation Object',
          description: 'Unique identifier for the reservation record (IMPORTANT: store this value)'
        },
        {
          name: '@ItineraryID',
          type: 'string',
          section: 'Reservation Object',
          description: 'Unique identifier for the itinerary (IMPORTANT: store this value)'
        },
        {
          name: 'HotelReservation',
          type: 'object',
          section: 'Reservation Object',
          description: 'Contains details about the hotel reservation'
        },

        // HotelReservation Object
        {
          name: '@InDate',
          type: 'string',
          section: 'HotelReservation Object',
          description: 'Check-in date in YYYY-MM-DD format'
        },
        {
          name: '@OutDate',
          type: 'string',
          section: 'HotelReservation Object',
          description: 'Check-out date in YYYY-MM-DD format'
        },
        {
          name: '@Rooms',
          type: 'string',
          section: 'HotelReservation Object',
          description: 'Number of rooms booked'
        },
        {
          name: '@Adults',
          type: 'string',
          section: 'HotelReservation Object',
          description: 'Number of adults in the reservation'
        },
        {
          name: '@Children',
          type: 'string',
          section: 'HotelReservation Object',
          description: 'Number of children in the reservation'
        },
        {
          name: '@ReservationID',
          type: 'string',
          section: 'HotelReservation Object',
          description: 'Unique identifier for the reservation (IMPORTANT: store this value)'
        },
        {
          name: '@CustomerConfirmationNumber',
          type: 'string',
          section: 'HotelReservation Object',
          description: 'Confirmation number to provide to the guest (IMPORTANT: store this value)'
        },
        {
          name: '@ReservationLocator',
          type: 'string',
          section: 'HotelReservation Object',
          description: 'Locator code for the reservation'
        },
        {
          name: 'Hotel',
          type: 'array',
          section: 'HotelReservation Object',
          description: 'Array of hotel objects in the reservation'
        },

        // Hotel Object
        {
          name: 'Hotel',
          type: 'object',
          section: 'Hotel Object',
          description: 'Contains information about the booked hotel'
        },
        {
          name: '@HotelID',
          type: 'string',
          section: 'Hotel Object',
          description: 'Unique identifier for the hotel'
        },
        {
          name: '@HotelInfo',
          type: 'string',
          section: 'Hotel Object',
          description: 'URL to get detailed information about the hotel'
        },
        {
          name: '@Latitude',
          type: 'string',
          section: 'Hotel Object',
          description: 'Latitude coordinate of the hotel location'
        },
        {
          name: '@Longitude',
          type: 'string',
          section: 'Hotel Object',
          description: 'Longitude coordinate of the hotel location'
        },
        {
          name: '@Name',
          type: 'string',
          section: 'Hotel Object',
          description: 'Name of the hotel'
        },
        {
          name: '@Address1',
          type: 'string',
          section: 'Hotel Object',
          description: 'First line of the hotel address'
        },
        {
          name: '@City',
          type: 'string',
          section: 'Hotel Object',
          description: 'City where the hotel is located'
        },
        {
          name: '@State',
          type: 'string',
          section: 'Hotel Object',
          description: 'State/province where the hotel is located'
        },
        {
          name: '@CountryCode',
          type: 'string',
          section: 'Hotel Object',
          description: 'Country code where the hotel is located'
        },
        {
          name: '@Postal',
          type: 'string',
          section: 'Hotel Object',
          description: 'Postal/ZIP code of the hotel'
        },
        {
          name: '@ImageThumbnail',
          type: 'string',
          section: 'Hotel Object',
          description: 'URL to the hotel thumbnail image'
        },
        {
          name: '@TripAdvisorRating',
          type: 'string',
          section: 'Hotel Object',
          description: 'TripAdvisor rating (out of 5)'
        },
        {
          name: '@PropertyType',
          type: 'string',
          section: 'Hotel Object',
          description: 'Type of property (e.g., "Vac. Rental", "Hotel")'
        },
        {
          name: 'RatePlan',
          type: 'array',
          section: 'Hotel Object',
          description: 'Array containing the rate plan used for the reservation'
        },

        // RatePlan Object
        {
          name: 'RatePlan',
          type: 'object',
          section: 'RatePlan Object',
          description: 'Contains information about the rate plan used for the reservation'
        },
        {
          name: '@Code',
          type: 'string',
          section: 'RatePlan Object',
          description: 'Unique identifier for the rate plan'
        },
        {
          name: '@Description',
          type: 'string',
          section: 'RatePlan Object',
          description: 'Description of the rate plan'
        },
        {
          name: '@Gateway',
          type: 'string',
          section: 'RatePlan Object',
          description: 'Gateway identifier for the rate plan'
        },
        {
          name: '@CommissionStatus',
          type: 'string',
          section: 'RatePlan Object',
          description: 'Commission status (e.g., "Commissionable", "Wholesale")'
        },
        {
          name: '@BalanceDueAtHotel',
          type: 'string',
          section: 'RatePlan Object',
          description: 'Indicates if balance is due at the hotel'
        },
        {
          name: 'Room',
          type: 'array',
          section: 'RatePlan Object',
          description: 'Array containing the room booked with this rate plan'
        },
        {
          name: 'Policy',
          type: 'object',
          section: 'RatePlan Object',
          description: 'Contains policy information for this rate plan'
        },

        // Room Object
        {
          name: 'Room',
          type: 'object',
          section: 'Room Object',
          description: 'Contains information about the booked room'
        },
        {
          name: '@Code',
          type: 'string',
          section: 'Room Object',
          description: 'Unique identifier for the room'
        },
        {
          name: '@Name',
          type: 'string',
          section: 'Room Object',
          description: 'Name of the room type'
        },
        {
          name: '@Description',
          type: 'string',
          section: 'Room Object',
          description: 'Description of the room type'
        },
        {
          name: '@CurrencyCode',
          type: 'string',
          section: 'Room Object',
          description: 'Currency code for the room rates'
        },
        {
          name: '@Refundable',
          type: 'string',
          section: 'Room Object',
          description: 'Indicates if the rate is refundable'
        },
        {
          name: 'NightlyRate',
          type: 'array',
          section: 'Room Object',
          description: 'Array containing pricing information for each night of the stay'
        },
        {
          name: 'NightlyRate[].@Date',
          type: 'string',
          section: 'Room Object',
          description: 'Date of the nightly rate in YYYY-MM-DD format'
        },
        {
          name: 'NightlyRate[].@Price',
          type: 'string',
          section: 'Room Object',
          description: 'Price for the night'
        },
        {
          name: 'Tax',
          type: 'object',
          section: 'Room Object',
          description: 'Contains tax information for the room'
        },
        {
          name: 'Tax.@Percent',
          type: 'string',
          section: 'Room Object',
          description: 'Tax percentage'
        },
        {
          name: 'Tax.@Amount',
          type: 'string',
          section: 'Room Object',
          description: 'Tax amount'
        },
        {
          name: 'GatewayFee',
          type: 'object',
          section: 'Room Object',
          description: 'Contains gateway fee information'
        },
        {
          name: 'GatewayFee.@Amount',
          type: 'string',
          section: 'Room Object',
          description: 'Gateway fee amount'
        },
        {
          name: 'Total',
          type: 'object',
          section: 'Room Object',
          description: 'Contains total price information'
        },
        {
          name: 'Total.@Amount',
          type: 'string',
          section: 'Room Object',
          description: 'Total amount for the stay'
        },
        {
          name: 'Total.@IncludesBookingFee',
          type: 'string',
          section: 'Room Object',
          description: 'Indicates if the total includes booking fee'
        },
        {
          name: 'BookingFee',
          type: 'object',
          section: 'Room Object',
          description: 'Contains booking fee information'
        },
        {
          name: 'BookingFee.@Amount',
          type: 'string',
          section: 'Room Object',
          description: 'Booking fee amount'
        },
        {
          name: 'BookingFee.@CurrencyCode',
          type: 'string',
          section: 'Room Object',
          description: 'Currency code for the booking fee'
        },

        // Policy Object
        {
          name: 'ExtraPersonPrice',
          type: 'object',
          section: 'Policy Object',
          description: 'Contains pricing information for extra persons'
        },
        {
          name: 'Guarantee',
          type: 'object',
          section: 'Policy Object',
          description: 'Contains guarantee policy information'
        },
        {
          name: 'Cancel',
          type: 'object',
          section: 'Policy Object',
          description: 'Contains cancellation policy information'
        },
        {
          name: 'Deposit',
          type: 'object',
          section: 'Policy Object',
          description: 'Contains deposit policy information'
        },
        {
          name: 'ExtraFees',
          type: 'object',
          section: 'Policy Object',
          description: 'Contains information about additional fees'
        },
        {
          name: 'Payment',
          type: 'array',
          section: 'Policy Object',
          description: 'Array of payment policy information objects'
        },
        {
          name: 'Payment[].@Description',
          type: 'string',
          section: 'Policy Object',
          description: 'Description of the payment policy'
        },
        {
          name: 'Payment[].@Type',
          type: 'string',
          section: 'Policy Object',
          description: 'Type of payment policy (e.g., "BookingFee"). Optional attribute.'
        },
        {
          name: 'ChargeName',
          type: 'object',
          section: 'Policy Object',
          description: 'Contains information about how charges will appear'
        },
        {
          name: 'Property',
          type: 'array',
          section: 'Policy Object',
          description: 'Contains property policy information such as check-in/check-out times'
        },

        // Guests Object
        {
          name: 'Guests',
          type: 'object',
          section: 'Guests Object',
          description: 'Contains information about the guests'
        },
        {
          name: 'Primary',
          type: 'object',
          section: 'Guests Object',
          description: 'Contains information about the primary guest'
        },
        {
          name: 'Primary.@Title',
          type: 'string',
          section: 'Guests Object',
          description: 'Title of the primary guest'
        },
        {
          name: 'Primary.@FirstName',
          type: 'string',
          section: 'Guests Object',
          description: 'First name of the primary guest'
        },
        {
          name: 'Primary.@MiddleName',
          type: 'string',
          section: 'Guests Object',
          description: 'Middle name of the primary guest'
        },
        {
          name: 'Primary.@LastName',
          type: 'string',
          section: 'Guests Object',
          description: 'Last name of the primary guest'
        },
        {
          name: 'Primary.@Message',
          type: 'string',
          section: 'Guests Object',
          description: 'Message from the primary guest'
        },
        {
          name: 'Primary.@Email',
          type: 'string',
          section: 'Guests Object',
          description: 'Email address of the primary guest'
        },
        {
          name: 'Primary.@PhoneCountry',
          type: 'string',
          section: 'Guests Object',
          description: 'Phone country code of the primary guest'
        },
        {
          name: 'Primary.@PhoneArea',
          type: 'string',
          section: 'Guests Object',
          description: 'Phone area code of the primary guest'
        },
        {
          name: 'Primary.@PhoneNumber',
          type: 'string',
          section: 'Guests Object',
          description: 'Phone number of the primary guest'
        },
        {
          name: 'Primary.@PhoneExtension',
          type: 'string',
          section: 'Guests Object',
          description: 'Phone extension of the primary guest'
        },
        {
          name: 'Primary.@AgeGroup',
          type: 'string',
          section: 'Guests Object',
          description: 'Age group of the primary guest'
        },
        {
          name: 'Primary.Address',
          type: 'object',
          section: 'Guests Object',
          description: 'Address information of the primary guest'
        },
        {
          name: 'Primary.Address.@Type',
          type: 'string',
          section: 'Guests Object',
          description: 'Type of address (e.g., "Home")'
        },
        {
          name: 'Primary.Address.@Address',
          type: 'string',
          section: 'Guests Object',
          description: 'Street address of the primary guest'
        },
        {
          name: 'Primary.Address.@City',
          type: 'string',
          section: 'Guests Object',
          description: 'City of the primary guest'
        },
        {
          name: 'Primary.Address.@Region',
          type: 'string',
          section: 'Guests Object',
          description: 'Region/state of the primary guest'
        },
        {
          name: 'Primary.Address.@PostalCode',
          type: 'string',
          section: 'Guests Object',
          description: 'Postal code of the primary guest'
        },
        {
          name: 'Primary.Address.@CountryCode',
          type: 'string',
          section: 'Guests Object',
          description: 'Country code of the primary guest'
        },
        {
          name: 'Primary.Address.@ExtraInfo',
          type: 'string',
          section: 'Guests Object',
          description: 'Extra information about the address of the primary guest'
        },

        // Service Object
        {
          name: 'Service',
          type: 'object',
          section: 'Service Object',
          description: 'Contains service and pricing information'
        },
        {
          name: 'Service.@ExchangeGMT',
          type: 'string',
          section: 'Service Object',
          description: 'Timestamp of the exchange rate'
        },
        {
          name: 'Service.RoomCurrency',
          type: 'object',
          section: 'Service Object',
          description: 'Contains pricing information in the room currency'
        },
        {
          name: 'Service.DisplayCurrency',
          type: 'object',
          section: 'Service Object',
          description: 'Contains pricing information in the display currency'
        },
        {
          name: 'Service.USD',
          type: 'object',
          section: 'Service Object',
          description: 'Contains pricing information in USD'
        }
      ]}
      testProduction={{
        title: 'Test x Production',
        description: 'This section will be updated once we have a real production reservation to use as a reference.',
        differences: []
      }}
      codeExamples={[
        {
          language: 'bash',
          label: 'cURL',
          code: `curl --location 'https://api.travsrv.com/api/hotel?type=reservation&siteid=64&_type=json' \\
  --header 'Accept-version: 2' \\
  --header 'Authorization: Basic YOUR_BASE64_ENCODED_CREDENTIALS' \\
  --form 'type="reservation"' \\
  --form 'inDate="2025-06-15"' \\
  --form 'outDate="2025-06-20"' \\
  --form 'siteid="64"' \\
  --form 'rooms="1"' \\
  --form 'adults="2"' \\
  --form 'children="0"' \\
  --form 'userAgent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"' \\
  --form 'userLanguage="en-US"' \\
  --form 'ipAddress="1.1.1.1"' \\
  --form 'locale="en"' \\
  --form 'currency="USD"' \\
  --form '_type="json"' \\
  --form 'hotelids="34853"' \\
  --form 'ratePlanCode="62807arvlm5s3fvlx0iqsmxqb"' \\
  --form 'roomCode="29h76bywy7siyzzpurzawjdyf"' \\
  --form 'gateway="28"' \\
  --form 'recordLocator=""' \\
  --form 'guestFirstName="Test"' \\
  --form 'guestLastName="Guest"' \\
  --form 'guestEmail="guest@example.com"' \\
  --form 'guestPhoneCountry="1"' \\
  --form 'guestPhoneArea="123"' \\
  --form 'guestPhoneNumber="1234567890"' \\
  --form 'guestPhoneExtension=""' \\
  --form 'guestTitle=""' \\
  --form 'guestMessage=""' \\
  --form 'addressAddress="123 Made Up Ln."' \\
  --form 'addressCity="Example City"' \\
  --form 'addressRegion="FL"' \\
  --form 'addressPostalCode="12345"' \\
  --form 'addressCountryCode="US"' \\
  --form 'addressExtraInfo=""' \\
  --form 'creditCardNumber="4111111111111111"' \\
  --form 'creditCardHolder="Test Cardholder"' \\
  --form 'creditCardExpiration="05/25"' \\
  --form 'creditCardCVV2="123"' \\
  --form 'creditCardType="VI"' \\
  --form 'creditCardAddress="123 Test Street"' \\
  --form 'creditCardCity="Test City"' \\
  --form 'creditCardRegion="FL"' \\
  --form 'creditCardPostalCode="12345"' \\
  --form 'creditCardCountryCode="US"' \\
  --form 'roomCostPrice="1293.00"' \\
  --form 'roomCostTaxAmount="155.16"' \\
  --form 'roomCostGatewayFee="0"' \\
  --form 'roomCostTotalAmount="1448.16"' \\
  --form 'roomCostCurrencyCode="EUR"' \\
  --form 'bookingFeeAmount="5"' \\
  --form 'bookingFeeCurrencyCode="USD"' \\
  --form 'specialRequests="This is a test reservation. Please do not actually book this room."'`
        },
        {
          language: 'python',
          label: 'Python',
          code: `# Example using Requests library
import requests
import base64

url = 'https://api.travsrv.com/api/hotel'
params = {
    'type': 'reservation',
    'siteid': 64,
    '_type': 'json'
}

# Headers
headers = {
    'Accept-version': '2',
    'Authorization': 'Basic'  # Base64 encoded username:password
}

# Form data for reservation
data = {
    'type': 'reservation',
    'inDate': '2025-06-15',
    'outDate': '2025-06-20',
    'siteid': '64',
    'rooms': '1',
    'adults': '2',
    'children': '0',
    'userAgent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
    'userLanguage': 'en-US',
    'ipAddress': '1.1.1.1',
    'locale': 'en',
    'currency': 'USD',
    '_type': 'json',

    'hotelids': '34853',
    'ratePlanCode': '62807arvlm5s3fvlx0iqsmxqb',
    'roomCode': '29h76bywy7siyzzpurzawjdyf',
    'gateway': '28',
    'recordLocator': '',

    'guestFirstName': 'Test',
    'guestLastName': 'Guest',
    'guestEmail': 'guest@example.com',
    'guestPhoneCountry': '1',
    'guestPhoneArea': '123',
    'guestPhoneNumber': '1234567890',
    'guestPhoneExtension': '',
    'guestTitle': '',
    'guestMessage': '',

    'addressAddress': '123 Made Up Ln.',
    'addressCity': 'Example City',
    'addressRegion': 'FL',
    'addressPostalCode': '12345',
    'addressCountryCode': 'US',
    'addressExtraInfo': '',

    'creditCardNumber': '4111111111111111',
    'creditCardHolder': 'Test Cardholder',
    'creditCardExpiration': '05/25',
    'creditCardCVV2': '123',
    'creditCardType': 'VI',
    'creditCardAddress': '123 Test Street',
    'creditCardCity': 'Test City',
    'creditCardRegion': 'FL',
    'creditCardPostalCode': '12345',
    'creditCardCountryCode': 'US',

    'roomCostPrice': '1293.00',
    'roomCostTaxAmount': '155.16',
    'roomCostGatewayFee': '0',
    'roomCostTotalAmount': '1448.16',
    'roomCostCurrencyCode': 'EUR',
    'bookingFeeAmount': '5',
    'bookingFeeCurrencyCode': 'USD',

    'specialRequests': 'This is a test reservation. Please do not actually book this room.'
}

# Convert to multipart/form-data format
files = {k: (None, v) for k, v in data.items()}

# Make the request
response = requests.post(url, params=params, headers=headers, files=files)
result = response.json()

if response.status_code == 200:
    reservation = result['ArnResponse']['Reservation']
    hotel_reservation = reservation['HotelReservation']
    print(f"Reservation created successfully!")
    print(f"Reservation ID: {hotel_reservation['@ReservationID']}")
    print(f"Itinerary ID: {reservation['@ItineraryID']}")
    print(f"Confirmation Number: {hotel_reservation['@CustomerConfirmationNumber']}")
else:
    print(f"Request failed with status code: {response.status_code}")
    print(response.text)`
        },
        {
          language: 'javascript',
          label: 'JavaScript',
          code: `// Example using Fetch API with FormData
const formData = new FormData();

// Add all form fields
formData.append('type', 'reservation');
formData.append('inDate', '2025-06-15');
formData.append('outDate', '2025-06-20');
formData.append('siteid', '64');
formData.append('rooms', '1');
formData.append('adults', '2');
formData.append('children', '0');
formData.append('userAgent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36');
formData.append('userLanguage', 'en-US');
formData.append('ipAddress', '1.1.1.1');
formData.append('locale', 'en');
formData.append('currency', 'USD');
formData.append('_type', 'json');

formData.append('hotelids', '34853');
formData.append('ratePlanCode', '62807arvlm5s3fvlx0iqsmxqb');
formData.append('roomCode', '29h76bywy7siyzzpurzawjdyf');
formData.append('gateway', '28');
formData.append('recordLocator', '');

formData.append('guestFirstName', 'Test');
formData.append('guestLastName', 'Guest');
formData.append('guestEmail', 'guest@example.com');
formData.append('guestPhoneCountry', '1');
formData.append('guestPhoneArea', '123');
formData.append('guestPhoneNumber', '1234567890');
formData.append('guestPhoneExtension', '');
formData.append('guestTitle', '');
formData.append('guestMessage', '');

formData.append('addressAddress', '123 Made Up Ln.');
formData.append('addressCity', 'Example City');
formData.append('addressRegion', 'FL');
formData.append('addressPostalCode', '12345');
formData.append('addressCountryCode', 'US');
formData.append('addressExtraInfo', '');

formData.append('creditCardNumber', '4111111111111111');
formData.append('creditCardHolder', 'Test Cardholder');
formData.append('creditCardExpiration', '05/25');
formData.append('creditCardCVV2', '123');
formData.append('creditCardType', 'VI');
formData.append('creditCardAddress', '123 Test Street');
formData.append('creditCardCity', 'Test City');
formData.append('creditCardRegion', 'FL');
formData.append('creditCardPostalCode', '12345');
formData.append('creditCardCountryCode', 'US');

formData.append('roomCostPrice', '1293.00');
formData.append('roomCostTaxAmount', '155.16');
formData.append('roomCostGatewayFee', '0');
formData.append('roomCostTotalAmount', '1448.16');
formData.append('roomCostCurrencyCode', 'EUR');
formData.append('bookingFeeAmount', '5');
formData.append('bookingFeeCurrencyCode', 'USD');

formData.append('specialRequests', 'This is a test reservation. Please do not actually book this room.');

// Create authorization header
const username = 'YOUR_USERNAME';
const password = 'YOUR_PASSWORD';
const authHeader = 'Basic ' + btoa(username + ':' + password); // Encodes to Base64

fetch('https://api.travsrv.com/api/hotel?type=reservation&siteid=64&_type=json', {
  method: 'POST',
  headers: {
    'Accept-version': '2',
    'Authorization': authHeader
  },
  body: formData
})
.then(response => response.json())
.then(data => {
  console.log('Response:', data);
  const reservation = data.ArnResponse.Reservation;
  const hotelReservation = reservation.HotelReservation;
  console.log('Reservation created successfully!');
  console.log('Reservation ID:', hotelReservation['@ReservationID']);
  console.log('Itinerary ID:', reservation['@ItineraryID']);
  console.log('Confirmation Number:', hotelReservation['@CustomerConfirmationNumber']);
})
.catch(error => console.error('Error creating reservation:', error));`
        },
        {
          language: 'php',
          label: 'PHP',
          code: `<?php
// Using cURL with form data
$baseUrl = "https://api.travsrv.com/api/hotel";
$params = [
    "type" => "reservation",
    "siteid" => "64",
    "_type" => "json"
];
$url = $baseUrl . "?" . http_build_query($params);

$headers = [
    "Accept-version: 2"
];

// Form data for reservation
$formData = [
    'type' => 'reservation',
    'inDate' => '2025-06-15',
    'outDate' => '2025-06-20',
    'siteid' => '64',
    'rooms' => '1',
    'adults' => '2',
    'children' => '0',
    'userAgent' => 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
    'userLanguage' => 'en-US',
    'ipAddress' => '1.1.1.1',
    'locale' => 'en',
    'currency' => 'USD',
    '_type' => 'json',

    'hotelids' => '34853',
    'ratePlanCode' => '62807arvlm5s3fvlx0iqsmxqb',
    'roomCode' => '29h76bywy7siyzzpurzawjdyf',
    'gateway' => '28',
    'recordLocator' => '',

    'guestFirstName' => 'Test',
    'guestLastName' => 'Guest',
    'guestEmail' => 'guest@example.com',
    'guestPhoneCountry' => '1',
    'guestPhoneArea' => '123',
    'guestPhoneNumber' => '1234567890',
    'guestPhoneExtension' => '',
    'guestTitle' => '',
    'guestMessage' => '',

    'addressAddress' => '123 Made Up Ln.',
    'addressCity' => 'Example City',
    'addressRegion' => 'FL',
    'addressPostalCode' => '12345',
    'addressCountryCode' => 'US',
    'addressExtraInfo' => '',

    'creditCardNumber' => '4111111111111111',
    'creditCardHolder' => 'Test Cardholder',
    'creditCardExpiration' => '05/25',
    'creditCardCVV2' => '123',
    'creditCardType' => 'VI',
    'creditCardAddress' => '123 Test Street',
    'creditCardCity' => 'Test City',
    'creditCardRegion' => 'FL',
    'creditCardPostalCode' => '12345',
    'creditCardCountryCode' => 'US',

    'roomCostPrice' => '1293.00',
    'roomCostTaxAmount' => '155.16',
    'roomCostGatewayFee' => '0',
    'roomCostTotalAmount' => '1448.16',
    'roomCostCurrencyCode' => 'EUR',
    'bookingFeeAmount' => '5',
    'bookingFeeCurrencyCode' => 'USD',

    'specialRequests' => 'This is a test reservation. Please do not actually book this room.'
];

$curl = curl_init($url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $formData);  // Send as form data, not JSON
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
curl_setopt($curl, CURLOPT_USERPWD, "YOUR_USERNAME:YOUR_PASSWORD");  // Basic authentication (automatically encoded to Base64)

$response = curl_exec($curl);
$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

if ($httpCode === 200) {
    $result = json_decode($response, true);
    $reservation = $result['ArnResponse']['Reservation'];
    $hotelReservation = $reservation['HotelReservation'];
    echo "Reservation created successfully!\\n";
    echo "Reservation ID: " . $hotelReservation['@ReservationID'] . "\\n";
    echo "Itinerary ID: " . $reservation['@ItineraryID'] . "\\n";
    echo "Confirmation Number: " . $hotelReservation['@CustomerConfirmationNumber'] . "\\n";
} else {
    echo "Request failed with status code: " . $httpCode . "\\n";
    echo $response;
}

curl_close($curl);
?>`
        }
      ]}
    >




      <Alert type="warning" title="Request Format">
        <p>
          This endpoint requires data to be sent as <code>multipart/form-data</code>, not as JSON. Make sure to use the appropriate method for your programming language to send form data.
        </p>
      </Alert>

      <Alert type="warning" title="Date Format">
        <p>
          All dates must be in <code>YYYY-MM-DD</code> format based on UTC-7 (MST) time zone.
        </p>
      </Alert>

      <Alert type="warning" title="Required Parameters">
        <p>
          The <code>userAgent</code> and <code>userLanguage</code> parameters are required for fraud checking and preventing booking failures.
        </p>
      </Alert>

      <Alert type="warning" title="Credit Card Information">
        <p>
          For testing, use the credit card number <code>4111111111111111</code> with any future expiration date and any 3-digit CVV.
        </p>
      </Alert>

      <Alert type="warning" title="Rate Details Data">
        <p>
          Use the data from the Rate Details endpoint response to populate the reservation request. The price, tax, and total amount values must match those returned by the Rate Details endpoint.
        </p>
      </Alert>
    </EndpointPage>
  );
};

export default ReservationCreation;
