import React from 'react';
import Alert from '../../../components/common/Alert';
import EndpointPage from '../../../components/endpoints/EndpointPage';

const RateDetails: React.FC = () => {
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
      title="Rate Details"
      description="Get detailed information about specific rates for a hotel"
      sections={sections}
      endpoint={{
        method: 'GET',
        url: 'https://api.travsrv.com/api/hotel?type=rateDetails',
        id: 'rate-details',
        category: 'hotel',
        nextSteps: "After retrieving rate details, you can create a reservation using the <a href='/endpoints/hotel/reservation-creation'>Reservation Creation</a> endpoint. Make sure to note the <code>ratePlanCode</code>, <code>roomCode</code>, and <code>gateway</code> values as they are required for booking.",
        endpointDescription: "This endpoint is used to get detailed information about specific rates for a hotel. It provides comprehensive details about the rate plan, including cancellation policies, meal plans, and additional fees. This endpoint should be called after an Availability Search to get more detailed information about a specific rate.",
        requestDescription: "This section details the parameters and format for making requests to the Rate Details endpoint.",
        requestParametersDescription: "The request body should be a JSON object with the following parameters:",
        requestParametersNote: "Note: All the required parameters (hotelids, ratePlanCode, roomCode, gateway) must be obtained from a previous Availability Search request.",
        responseDescription: "The response includes comprehensive details about the selected rate, including cancellation policies, payment terms, and additional fees."
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
            value: 'application/json'
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
        {
          name: 'type',
          type: 'string',
          required: true,
          description: 'Must be set to "rateDetails"',
          example: 'rateDetails'
        },
        {
          name: 'inDate',
          type: 'string',
          required: true,
          description: 'Desired check-in date (format: YYYY-MM-DD based on UTC-7 (MST) time zone)',
          example: '2025-05-23'
        },
        {
          name: 'outDate',
          type: 'string',
          required: true,
          description: 'Desired check-out date (format: YYYY-MM-DD based on UTC-7 (MST) time zone)',
          example: '2025-05-24'
        },
        {
          name: 'siteid',
          type: 'integer',
          required: true,
          description: 'The siteID is the site (particular set of settings) in which you want to utilize for your search (64 for testing)',
          example: '64'
        },
        {
          name: 'rooms',
          type: 'integer',
          required: true,
          description: 'Number of rooms needed. When searching for more than one room, responses are based on the same room type and occupancy for every room. Maximum: 9 (best results with no more than 4)',
          example: '1'
        },
        {
          name: 'adults',
          type: 'integer',
          required: true,
          description: 'Total number of adults. For instance, if rooms=2 and adults=2, then the search is for 1 room per adult. Maximum 8 adults per room',
          example: '1'
        },
        {
          name: 'children',
          type: 'integer',
          required: true,
          description: 'Total number of children. Maximum: 8. Note: Some legacy providers do not honor the children parameter',
          example: '0'
        },
        {
          name: 'childages',
          type: 'string',
          required: false,
          description: 'Child age or comma-separated list of ages',
          example: '5,7'
        },
        {
          name: 'currency',
          type: 'string',
          required: false,
          description: 'Default: "USD". Supported currencies are located in static database files. Major 3-letter currency references (e.g., "USD", "CNY", "CAD", etc.) are supported',
          example: 'USD'
        },
        {
          name: 'timeout',
          type: 'integer',
          required: false,
          description: 'Default: 15. Maximum time to allow for searching gateways, measured in seconds',
          example: '15'
        },
        {
          name: 'ipAddress',
          type: 'string',
          required: false,
          description: 'The IPv4 address of the person browsing your website. Requested for fraud checking and preventing booking failures',
          example: '192.168.1.1'
        },
        {
          name: 'locale',
          type: 'string',
          required: false,
          description: 'Default: "US". Specifies the response localization',
          example: 'US'
        },
        {
          name: 'userAgent',
          type: 'string',
          required: true,
          description: 'The userAgent of the app/browser of the person browsing your website. Used for fraud checking and preventing booking failures',
          example: 'Mozilla/5.0'
        },
        {
          name: 'userLanguage',
          type: 'string',
          required: true,
          description: 'The language of the browser of the person browsing your website. Used for fraud checking and preventing booking failures',
          example: 'en'
        },
        {
          name: 'hotelids',
          type: 'string',
          required: true,
          description: 'Hotel ID obtained from the Availability Search response',
          example: '34853'
        },
        {
          name: 'ratePlanCode',
          type: 'string',
          required: true,
          description: 'Rate plan code obtained from the Availability Search response',
          example: '62807arvlm5s3fvlx0iqsmxqb'
        },
        {
          name: 'roomCode',
          type: 'string',
          required: true,
          description: 'Room code obtained from the Availability Search response',
          example: '29h76bywy7siyzzpurzawjdyf'
        },
        {
          name: 'gateway',
          type: 'string',
          required: true,
          description: 'Gateway identifier obtained from the Availability Search response',
          example: '28'
        },
        {
          name: '_type',
          type: 'string',
          required: false,
          description: 'Default: json. Format of API response, formats available are \'json\' and \'xml\'',
          example: 'json'
        }
      ]}
      requestExample={`GET /api/hotel?type=rateDetails&inDate=2025-06-15&outDate=2025-06-20&siteid=64&rooms=1&adults=2&children=0&userAgent=Mozilla/5.0&userLanguage=en&hotelids=34853&ratePlanCode=62807arvlm5s3fvlx0iqsmxqb&roomCode=29h76bywy7siyzzpurzawjdyf&gateway=28&_type=json HTTP/1.1
Host: api.travsrv.com
Site-Id: YOUR_SITE_ID
API-ClientUsername: YOUR_USERNAME
API-ClientPassword: YOUR_PASSWORD
Content-Type: application/json
Accept-version: 2
Authorization: Basic (Base64 encoded username:password)`}
      responseExample={{
        status: 200,
        body: `{
  "ArnResponse": {
    "@MemberType": "Invalid",
    "@CurrentToken": "",
    "Info": {
      "@SiteID": "64",
      "@Username": "publictest",
      "@IpAddress": "10.172.25.255",
      "@TimeReceived": "2025-04-26T13:52:02.651",
      "@TimeCompleted": "2025-04-26T13:52:03.053",
      "@Version": "2",
      "@ServiceUrl": "http://api.travsrv.com/api/hotel?_type=json&adults=2&children=0&gateway=28&hotelids=34853&inDate=2025-06-15&outDate=2025-06-20&ratePlanCode=62807arvlm5s3fvlx0iqsmxqb&roomCode=29h76bywy7siyzzpurzawjdyf&rooms=1&siteid=64&type=rateDetails&userAgent=Mozilla%2F5.0&userLanguage=en",
      "@RequestID": "56F2AF5E-4A3B-4115-93EE-9C2D6E47F410",
      "@ReturnedRateCount": "1"
    },
    "RateDetails": {
      "@DisplayCurrency": "USD",
      "HotelRateDetails": {
        "@InDate": "2025-06-15",
        "@OutDate": "2025-06-20",
        "@Rooms": "1",
        "@Adults": "2",
        "@Children": "0",
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
                    "@DisplayCurrencyMultiplier": "1.1401208528",
                    "@USDMultiplier": "1.1401208528",
                    "@ExchangeGMT": "2025-04-26T13:00:10.750",
                    "@MaximumBookable": "16",
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
                      "@RoomCurrencyMultiplier": "0.8771000000",
                      "@ExchangeGMT": "2025-04-26T13:00:10.750"
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
                    "@DisplayCurrencyMultiplier": "1.1401208528",
                    "@USDMultiplier": "1.1401208528",
                    "@ExchangeGMT": "2025-04-26T13:00:10.750"
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
                      "@RoomCurrencyMultiplier": "0.8771000000",
                      "@ExchangeGMT": "2025-04-26T13:00:12.560"
                    },
                    "Penalty": {
                      "@Amount": "0.00",
                      "@CurrencyCode": "EUR",
                      "@DisplayCurrencyMultiplier": "1.1401208528",
                      "@USDMultiplier": "1.1401208528",
                      "@ExchangeGMT": "2025-04-26T13:00:10.750"
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
                  ]
                }
              }
            ]
          }
        ]
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
          description: 'Root object containing all response data',
          section: 'ArnResponse Object'
        },
        {
          name: '@MemberType',
          type: 'string',
          description: 'Type of member response',
          section: 'ArnResponse Object'
        },
        {
          name: '@CurrentToken',
          type: 'string',
          description: 'Current token for the session',
          section: 'ArnResponse Object'
        },

        // Info Object
        {
          name: '@SiteID',
          type: 'string',
          description: 'Site identifier used for the request',
          section: 'Info Object'
        },
        {
          name: '@Username',
          type: 'string',
          description: 'Username used for the request',
          section: 'Info Object'
        },
        {
          name: '@IpAddress',
          type: 'string',
          description: 'IP address of the client making the request',
          section: 'Info Object'
        },
        {
          name: '@TimeReceived',
          type: 'string',
          description: 'Timestamp when the request was received',
          section: 'Info Object'
        },
        {
          name: '@TimeCompleted',
          type: 'string',
          description: 'Timestamp when the request was completed',
          section: 'Info Object'
        },
        {
          name: '@Version',
          type: 'string',
          description: 'API version used for the request',
          section: 'Info Object'
        },
        {
          name: '@ServiceUrl',
          type: 'string',
          description: 'Service URL for the API',
          section: 'Info Object'
        },
        {
          name: '@RequestID',
          type: 'string',
          description: 'Unique identifier for the request',
          section: 'Info Object'
        },
        {
          name: '@ElapsedTime',
          type: 'string',
          description: 'Time taken to process the request in milliseconds',
          section: 'Info Object'
        },
        {
          name: '@TripAggregationTime',
          type: 'string',
          description: 'Detailed breakdown of processing time',
          section: 'Info Object'
        },
        {
          name: '@ReturnedRateCount',
          type: 'string',
          description: 'Number of rates returned in the response',
          section: 'Info Object'
        },

        // RateDetails Object
        {
          name: '@DisplayCurrency',
          type: 'string',
          description: 'Currency used for displaying prices (e.g., "USD")',
          section: 'RateDetails Object'
        },

        // HotelRateDetails Object
        {
          name: '@InDate',
          type: 'string',
          description: 'Check-in date in YYYY-MM-DD format',
          section: 'HotelRateDetails Object'
        },
        {
          name: '@OutDate',
          type: 'string',
          description: 'Check-out date in YYYY-MM-DD format',
          section: 'HotelRateDetails Object'
        },
        {
          name: '@Rooms',
          type: 'string',
          description: 'Number of rooms requested',
          section: 'HotelRateDetails Object'
        },
        {
          name: '@Adults',
          type: 'string',
          description: 'Number of adults requested',
          section: 'HotelRateDetails Object'
        },
        {
          name: '@Children',
          type: 'string',
          description: 'Number of children requested',
          section: 'HotelRateDetails Object'
        },
        {
          name: '@SortType',
          type: 'string',
          description: 'Sorting method used for results (e.g., "bestvalue")',
          section: 'HotelRateDetails Object'
        },
        {
          name: 'Hotel',
          type: 'array',
          description: 'Array of hotel objects matching the search criteria',
          section: 'HotelRateDetails Object'
        },

        // Hotel Object
        {
          name: '@HotelID',
          type: 'string',
          description: 'Unique identifier for the hotel',
          section: 'Hotel Object'
        },
        {
          name: '@HotelInfo',
          type: 'string',
          description: 'URL to get detailed information about the hotel',
          section: 'Hotel Object'
        },
        {
          name: '@Latitude',
          type: 'string',
          description: 'Latitude coordinate of the hotel location',
          section: 'Hotel Object'
        },
        {
          name: '@Longitude',
          type: 'string',
          description: 'Longitude coordinate of the hotel location',
          section: 'Hotel Object'
        },
        {
          name: '@Name',
          type: 'string',
          description: 'Name of the hotel',
          section: 'Hotel Object'
        },
        {
          name: '@Address1',
          type: 'string',
          description: 'First line of the hotel address',
          section: 'Hotel Object'
        },
        {
          name: '@City',
          type: 'string',
          description: 'City where the hotel is located',
          section: 'Hotel Object'
        },
        {
          name: '@State',
          type: 'string',
          description: 'State/province where the hotel is located',
          section: 'Hotel Object'
        },
        {
          name: '@CountryCode',
          type: 'string',
          description: 'Country code where the hotel is located',
          section: 'Hotel Object'
        },
        {
          name: '@Postal',
          type: 'string',
          description: 'Postal/ZIP code of the hotel',
          section: 'Hotel Object'
        },
        {
          name: '@PercentMatch',
          type: 'string',
          description: 'Percentage match to search criteria',
          section: 'Hotel Object'
        },
        {
          name: '@ImageThumbnail',
          type: 'string',
          description: 'URL to the hotel thumbnail image',
          section: 'Hotel Object'
        },
        {
          name: '@LocationDescription',
          type: 'string',
          description: 'Description of the hotel location',
          section: 'Hotel Object'
        },
        {
          name: '@TripAdvisorReviewCount',
          type: 'string',
          description: 'Number of TripAdvisor reviews',
          section: 'Hotel Object'
        },
        {
          name: '@TripAdvisorRating',
          type: 'string',
          description: 'TripAdvisor rating (out of 5)',
          section: 'Hotel Object'
        },
        {
          name: '@RatingImageUrl',
          type: 'string',
          description: 'URL to the rating image',
          section: 'Hotel Object'
        },
        {
          name: '@PriceClass',
          type: 'string',
          description: 'Price class/category of the hotel',
          section: 'Hotel Object'
        },
        {
          name: '@TripAdvisorPartnerLocationId',
          type: 'string',
          description: 'TripAdvisor partner location ID',
          section: 'Hotel Object'
        },
        {
          name: '@PropertyType',
          type: 'string',
          description: 'Type of property (e.g., "Vac. Rental", "Hotel")',
          section: 'Hotel Object'
        },
        {
          name: '@PropertyLink',
          type: 'string',
          description: 'URL to the property details page',
          section: 'Hotel Object'
        },
        {
          name: 'RatePlan',
          type: 'array',
          description: 'Array of rate plans available for the hotel',
          section: 'Hotel Object'
        },

        // RatePlan Object
        {
          name: '@Code',
          type: 'string',
          description: 'Unique identifier for the rate plan',
          section: 'RatePlan Object'
        },
        {
          name: '@Description',
          type: 'string',
          description: 'Description of the rate plan',
          section: 'RatePlan Object'
        },
        {
          name: '@BuyerOnly',
          type: 'string',
          description: 'Indicates if the rate is available only to buyers',
          section: 'RatePlan Object'
        },
        {
          name: '@Gateway',
          type: 'string',
          description: 'Gateway identifier for the rate plan',
          section: 'RatePlan Object'
        },
        {
          name: '@CommissionStatus',
          type: 'string',
          description: 'Commission status (e.g., "Commissionable", "Wholesale")',
          section: 'RatePlan Object'
        },
        {
          name: '@BalanceDueAtHotel',
          type: 'string',
          description: 'Indicates if balance is due at the hotel',
          section: 'RatePlan Object'
        },
        {
          name: 'Room',
          type: 'array',
          description: 'Array of room types available for this rate plan',
          section: 'RatePlan Object'
        },
        {
          name: 'Policy',
          type: 'object',
          description: 'Contains policy information such as cancellation, payment, and extra fees',
          section: 'RatePlan Object'
        },

        // Room Object
        {
          name: '@Code',
          type: 'string',
          description: 'Unique identifier for the room',
          section: 'Room Object'
        },
        {
          name: '@Name',
          type: 'string',
          description: 'Name of the room type',
          section: 'Room Object'
        },
        {
          name: '@Description',
          type: 'string',
          description: 'Description of the room type',
          section: 'Room Object'
        },
        {
          name: '@CurrencyCode',
          type: 'string',
          description: 'Currency code for the room rates',
          section: 'Room Object'
        },
        {
          name: '@DisplayCurrencyMultiplier',
          type: 'string',
          description: 'Multiplier for converting to display currency',
          section: 'Room Object'
        },
        {
          name: '@USDMultiplier',
          type: 'string',
          description: 'Multiplier for converting to USD',
          section: 'Room Object'
        },
        {
          name: '@ExchangeGMT',
          type: 'string',
          description: 'Timestamp of the exchange rate',
          section: 'Room Object'
        },
        {
          name: '@MaximumBookable',
          type: 'string',
          description: 'Maximum number of rooms that can be booked',
          section: 'Room Object'
        },
        {
          name: '@Refundable',
          type: 'string',
          description: 'Indicates if the rate is refundable',
          section: 'Room Object'
        },
        {
          name: '@ETP',
          type: 'string',
          description: 'Early Termination Penalty indicator (0 = no penalty, 1 = penalty applies)',
          section: 'Room Object'
        },
        {
          name: '@CancellationFee',
          type: 'string',
          description: 'Fee amount for cancellation, if applicable',
          section: 'Room Object'
        },
        {
          name: 'NightlyRate',
          type: 'array',
          description: 'Array containing pricing information for each night of the stay',
          section: 'Room Object'
        },
        {
          name: 'NightlyRate[].@Date',
          type: 'string',
          description: 'Date of the nightly rate in YYYY-MM-DD format',
          section: 'Room Object'
        },
        {
          name: 'NightlyRate[].@Price',
          type: 'string',
          description: 'Price for the night',
          section: 'Room Object'
        },
        {
          name: 'Tax',
          type: 'object',
          description: 'Contains tax information for the room',
          section: 'Room Object'
        },
        {
          name: 'Tax.@Percent',
          type: 'string',
          description: 'Tax percentage',
          section: 'Room Object'
        },
        {
          name: 'Tax.@Amount',
          type: 'string',
          description: 'Tax amount',
          section: 'Room Object'
        },
        {
          name: 'GatewayFee',
          type: 'object',
          description: 'Contains gateway fee information',
          section: 'Room Object'
        },
        {
          name: 'GatewayFee.@Amount',
          type: 'string',
          description: 'Gateway fee amount',
          section: 'Room Object'
        },
        {
          name: 'Total',
          type: 'object',
          description: 'Contains total price information',
          section: 'Room Object'
        },
        {
          name: 'Total.@Amount',
          type: 'string',
          description: 'Total amount for the stay',
          section: 'Room Object'
        },
        {
          name: 'Total.@IncludesBookingFee',
          type: 'string',
          description: 'Indicates if the total includes booking fee',
          section: 'Room Object'
        },
        {
          name: 'BookingFee',
          type: 'object',
          description: 'Contains booking fee information',
          section: 'Room Object'
        },
        {
          name: 'BookingFee.@Amount',
          type: 'string',
          description: 'Booking fee amount',
          section: 'Room Object'
        },
        {
          name: 'BookingFee.@CurrencyCode',
          type: 'string',
          description: 'Currency code for the booking fee',
          section: 'Room Object'
        },
        {
          name: 'BookingFee.@DisplayCurrencyMultiplier',
          type: 'string',
          description: 'Multiplier for converting booking fee to display currency',
          section: 'Room Object'
        },
        {
          name: 'BookingFee.@RoomCurrencyMultiplier',
          type: 'string',
          description: 'Multiplier for converting booking fee to room currency',
          section: 'Room Object'
        },
        {
          name: 'BookingFee.@ExchangeGMT',
          type: 'string',
          description: 'Timestamp of the exchange rate for booking fee',
          section: 'Room Object'
        },
        {
          name: 'DueOnArrival',
          type: 'object',
          description: 'Contains information about amount due on arrival',
          section: 'Room Object'
        },
        {
          name: 'AddedValue',
          type: 'object',
          description: 'Contains information about added value',
          section: 'Room Object'
        },

        // Policy Object
        {
          name: 'ExtraPersonPrice',
          type: 'object',
          description: 'Contains pricing information for extra persons',
          section: 'Policy Object'
        },
        {
          name: 'ExtraPersonPrice.@Adult',
          type: 'string',
          description: 'Price for each additional adult',
          section: 'Policy Object'
        },
        {
          name: 'ExtraPersonPrice.@Child',
          type: 'string',
          description: 'Price for each additional child',
          section: 'Policy Object'
        },
        {
          name: 'ExtraPersonPrice.@CurrencyCode',
          type: 'string',
          description: 'Currency code for extra person prices',
          section: 'Policy Object'
        },
        {
          name: 'ExtraPersonPrice.@DisplayCurrencyMultiplier',
          type: 'string',
          description: 'Multiplier for converting to display currency',
          section: 'Policy Object'
        },
        {
          name: 'ExtraPersonPrice.@USDMultiplier',
          type: 'string',
          description: 'Multiplier for converting to USD',
          section: 'Policy Object'
        },
        {
          name: 'ExtraPersonPrice.@ExchangeGMT',
          type: 'string',
          description: 'Timestamp of the exchange rate',
          section: 'Policy Object'
        },
        {
          name: 'Guarantee',
          type: 'object',
          description: 'Contains guarantee policy information',
          section: 'Policy Object'
        },
        {
          name: 'Guarantee.@Description',
          type: 'string',
          description: 'Description of the guarantee policy',
          section: 'Policy Object'
        },
        {
          name: 'Cancel',
          type: 'object',
          description: 'Contains cancellation policy information',
          section: 'Policy Object'
        },
        {
          name: 'Cancel.@Description',
          type: 'string',
          description: 'Description of the cancellation policy',
          section: 'Policy Object'
        },
        {
          name: 'Cancel.@DescriptionRaw',
          type: 'string',
          description: 'Raw description of the cancellation policy',
          section: 'Policy Object'
        },
        {
          name: 'Cancel.@LatestCancelTime',
          type: 'string',
          description: 'Latest time for cancellation without penalty',
          section: 'Policy Object'
        },
        {
          name: 'Cancel.@GMTOffSet',
          type: 'string',
          description: 'GMT offset for the cancellation time',
          section: 'Policy Object'
        },
        {
          name: 'Cancel.Fee',
          type: 'object',
          description: 'Contains cancellation fee information',
          section: 'Policy Object'
        },
        {
          name: 'Cancel.Fee.@Amount',
          type: 'string',
          description: 'Cancellation fee amount',
          section: 'Policy Object'
        },
        {
          name: 'Cancel.Fee.@CurrencyCode',
          type: 'string',
          description: 'Currency code for the cancellation fee',
          section: 'Policy Object'
        },
        {
          name: 'Cancel.Fee.@DisplayCurrencyMultiplier',
          type: 'string',
          description: 'Multiplier for converting to display currency',
          section: 'Policy Object'
        },
        {
          name: 'Cancel.Fee.@RoomCurrencyMultiplier',
          type: 'string',
          description: 'Multiplier for converting to room currency',
          section: 'Policy Object'
        },
        {
          name: 'Cancel.Fee.@ExchangeGMT',
          type: 'string',
          description: 'Timestamp of the exchange rate',
          section: 'Policy Object'
        },
        {
          name: 'Cancel.Penalty',
          type: 'object',
          description: 'Contains cancellation penalty information',
          section: 'Policy Object'
        },
        {
          name: 'Cancel.Penalty.@Amount',
          type: 'string',
          description: 'Cancellation penalty amount',
          section: 'Policy Object'
        },
        {
          name: 'Cancel.Penalty.@CurrencyCode',
          type: 'string',
          description: 'Currency code for the cancellation penalty',
          section: 'Policy Object'
        },
        {
          name: 'Cancel.Penalty.@DisplayCurrencyMultiplier',
          type: 'string',
          description: 'Multiplier for converting to display currency',
          section: 'Policy Object'
        },
        {
          name: 'Cancel.Penalty.@USDMultiplier',
          type: 'string',
          description: 'Multiplier for converting to USD',
          section: 'Policy Object'
        },
        {
          name: 'Cancel.Penalty.@ExchangeGMT',
          type: 'string',
          description: 'Timestamp of the exchange rate',
          section: 'Policy Object'
        },
        {
          name: 'Deposit',
          type: 'object',
          description: 'Contains deposit policy information',
          section: 'Policy Object'
        },
        {
          name: 'Deposit.@Description',
          type: 'string',
          description: 'Description of the deposit policy',
          section: 'Policy Object'
        },
        {
          name: 'ExtraFees',
          type: 'object',
          description: 'Contains information about additional fees',
          section: 'Policy Object'
        },
        {
          name: 'ExtraFees.@Description',
          type: 'string',
          description: 'Description of the extra fees',
          section: 'Policy Object'
        },
        {
          name: 'Payment',
          type: 'array',
          description: 'Array of payment policy information objects',
          section: 'Policy Object'
        },
        {
          name: 'Payment[].@Description',
          type: 'string',
          description: 'Description of the payment policy',
          section: 'Policy Object'
        },
        {
          name: 'Payment[].@Type',
          type: 'string',
          description: 'Type of payment policy (e.g., "BookingFee"). Optional attribute.',
          section: 'Policy Object'
        },
        {
          name: 'ChargeName',
          type: 'object',
          description: 'Contains information about how charges will appear',
          section: 'Policy Object'
        },
        {
          name: 'ChargeName.@Description',
          type: 'string',
          description: 'Description of how charges will appear on statements',
          section: 'Policy Object'
        },
        {
          name: 'Property',
          type: 'array',
          description: 'Contains property policy information such as check-in/check-out times',
          section: 'Policy Object'
        },
        {
          name: 'Property[].@Description',
          type: 'string',
          description: 'Description of the property policy (e.g., "Check-In Time")',
          section: 'Policy Object'
        },
        {
          name: 'Property[].@Value',
          type: 'string',
          description: 'Value of the property policy (e.g., "4 PM")',
          section: 'Policy Object'
        }
      ]}
      testProduction={{
        differences: []
      }}
      codeExamples={[
        {
          language: 'bash',
          label: 'cURL',
          code: `curl -X GET "https://api.travsrv.com/api/hotel?type=rateDetails&inDate=2025-05-23&outDate=2025-05-24&siteid=64&rooms=1&adults=1&children=0&hotelids=1090185&ratePlanCode=75qq1rjakm41rnvnvf4fmvquz&roomCode=9xfzvqmr89iea8zb3we8mhtfp&gateway=28&userAgent=Mozilla/5.0&userLanguage=en&_type=json" \\
  -H "Site-Id: YOUR_SITE_ID" \\
  -H "API-ClientUsername: YOUR_USERNAME" \\
  -H "API-ClientPassword: YOUR_PASSWORD" \\
  -H "Content-Type: application/json" \\
  -H "Accept-version: 2" \\
  -H "Authorization: Basic" # Base64 encoded username:password`
        },
        {
          language: 'python',
          label: 'Python',
          code: `import requests
import json

# Authentication headers
headers = {
    "Site-Id": "YOUR_SITE_ID",
    "API-ClientUsername": "YOUR_USERNAME",
    "API-ClientPassword": "YOUR_PASSWORD",
    "Content-Type": "application/json",
    "Accept-version": "2"
}

# Request parameters
params = {
    "type": "rateDetails",
    "inDate": "2025-05-23",
    "outDate": "2025-05-24",
    "siteid": "64",
    "rooms": "1",
    "adults": "1",
    "children": "0",
    "hotelids": "1090185",
    "ratePlanCode": "75qq1rjakm41rnvnvf4fmvquz",
    "roomCode": "9xfzvqmr89iea8zb3we8mhtfp",
    "gateway": "28",
    "userAgent": "Mozilla/5.0",
    "userLanguage": "en",
    "_type": "json"
}

# Authentication header
headers["Authorization"] = "Basic"  # Base64 encoded username:password

# Make a request
response = requests.get(
    "https://api.travsrv.com/api/hotel",
    headers=headers,
    params=params
)

# Check if the request was successful
if response.status_code == 200:
    data = response.json()
    print(json.dumps(data, indent=2))
else:
    print(f"Request failed with status code: {response.status_code}")
    print(response.text)`
        },
        {
          language: 'javascript',
          label: 'JavaScript',
          code: `// Using axios
const axios = require('axios');

const headers = {
  "Site-Id": "YOUR_SITE_ID",
  "API-ClientUsername": "YOUR_USERNAME",
  "API-ClientPassword": "YOUR_PASSWORD",
  "Content-Type": "application/json",
  "Accept-version": "2"
};

const params = {
  type: "rateDetails",
  inDate: "2025-05-23",
  outDate: "2025-05-24",
  siteid: "64",
  rooms: "1",
  adults: "1",
  children: "0",
  hotelids: "1090185",
  ratePlanCode: "75qq1rjakm41rnvnvf4fmvquz",
  roomCode: "9xfzvqmr89iea8zb3we8mhtfp",
  gateway: "28",
  userAgent: "Mozilla/5.0",
  userLanguage: "en",
  _type: "json"
};

// Add Authorization header
headers["Authorization"] = "Basic";  // Base64 encoded username:password

axios.get("https://api.travsrv.com/api/hotel", {
    headers,
    params
  })
  .then(response => {
    console.log(JSON.stringify(response.data, null, 2));
  })
  .catch(error => {
    console.error("Error:", error.response ? error.response.data : error.message);
  });`
        },
        {
          language: 'php',
          label: 'PHP',
          code: `<?php
// Using cURL
$baseUrl = "https://api.travsrv.com/api/hotel";
$params = [
    "type" => "rateDetails",
    "inDate" => "2025-05-23",
    "outDate" => "2025-05-24",
    "siteid" => "64",
    "rooms" => "1",
    "adults" => "1",
    "children" => "0",
    "hotelids" => "1090185",
    "ratePlanCode" => "75qq1rjakm41rnvnvf4fmvquz",
    "roomCode" => "9xfzvqmr89iea8zb3we8mhtfp",
    "gateway" => "28",
    "userAgent" => "Mozilla/5.0",
    "userLanguage" => "en",
    "_type" => "json"
];
$url = $baseUrl . "?" . http_build_query($params);

$headers = [
    "Site-Id: YOUR_SITE_ID",
    "API-ClientUsername: YOUR_USERNAME",
    "API-ClientPassword: YOUR_PASSWORD",
    "Content-Type: application/json",
    "Accept-version: 2"
];

$curl = curl_init($url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
curl_setopt($curl, CURLOPT_USERPWD, "YOUR_USERNAME:YOUR_PASSWORD"); // Basic authentication (automatically encoded to Base64)

$response = curl_exec($curl);
$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

if ($httpCode === 200) {
    $data = json_decode($response, true);
    echo json_encode($data, JSON_PRETTY_PRINT);
} else {
    echo "Request failed with status code: " . $httpCode . "\\n";
    echo $response;
}

curl_close($curl);
?>`
        }
      ]}
    >

      <h3>RatePlan Object</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>@RestrictAllInclusiveChildren</code></td>
            <td>string</td>
            <td>Indicates if all-inclusive rates have restrictions for children</td>
          </tr>
        </tbody>
      </table>

      <h3>NightlyRate Object</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>@Discount</code></td>
            <td>string</td>
            <td>Amount of discount applied to the nightly rate</td>
          </tr>
        </tbody>
      </table>

      <h3>Total Object</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>@Discount</code></td>
            <td>string</td>
            <td>Total discount amount for the entire stay</td>
          </tr>
        </tbody>
      </table>

      <Alert type="info" title="Required Parameters">
        <p>
          The <code>hotelids</code> parameter is required and should be obtained from the{' '}
          <a href="/endpoints/hotel/availability">Availability Search</a> response.
        </p>
      </Alert>

      <Alert type="warning" title="Rate Availability">
        <p>
          Rates returned by this endpoint are subject to availability and may change between the time of search and booking.
          Always verify the final rate during the booking process.
        </p>
      </Alert>



    </EndpointPage>
  );
};

export default RateDetails;
