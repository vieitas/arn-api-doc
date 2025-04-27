import React from 'react';
import Alert from '../../../components/common/Alert';
import EndpointPage from '../../../components/endpoints/EndpointPage';

const Availability: React.FC = () => {
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
      title="Availability Search"
      description="Search for available hotels and rooms for a specific date range and location"
      sections={sections}
      endpoint={{
        method: 'GET',
        url: 'https://api.travsrv.com/api/hotel?type=availability',
        id: 'availability',
        category: 'hotel',
        nextSteps: "After retrieving a list of available hotels, you can get detailed rate information for a specific hotel using the <a href='/endpoints/hotel/rate-details'>Rate Details</a> endpoint. Make sure to note the <code>hotelId</code>, <code>ratePlanCode</code>, <code>roomCode</code>, and <code>gateway</code> values from the response as they will be required for the Rate Details request."
      }}
      testProduction={{
        differences: []
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
        // Nota: Adicionaremos uma nota após a tabela de parâmetros
        {
          name: 'type',
          type: 'string',
          required: true,
          description: 'Must be set to "availability"',
          example: 'availability'
        },
        {
          name: 'inDate',
          type: 'string',
          required: true,
          description: 'Desired check-in date (format: YYYY-MM-DD based on UTC-7 (MST) time zone)',
          example: '2025-06-15'
        },
        {
          name: 'outDate',
          type: 'string',
          required: true,
          description: 'Desired check-out date (format: YYYY-MM-DD based on UTC-7 (MST) time zone)',
          example: '2025-06-20'
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
          example: '2'
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
          example: '10,12'
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
          name: 'locationId',
          type: 'integer',
          required: false,
          description: 'Location search by id. This id can be pulled using typeahead api',
          example: '12345'
        },
        {
          name: 'candidateSearch',
          type: 'boolean',
          required: false,
          description: 'Default: false. When enabled, a list of candidate properties is returned without rates',
          example: 'false'
        },
        {
          name: 'page',
          type: 'integer',
          required: false,
          description: 'Default: 1. Results are limited to 50, this parameter is used for paginating results',
          example: '1'
        },
        {
          name: 'maxResults',
          type: 'integer',
          required: false,
          description: 'Default: 20. Maximum: 50-100. Number of results to return, max is defined per site based on needs',
          example: '20'
        },
        {
          name: 'hotelIds',
          type: 'string',
          required: false,
          description: 'String of comma-seperated integers. List of specific hotels to retrieve availability for. These id\'s can be pulled using typeahead api',
          example: '34853'
        },
        {
          name: 'refHotelId',
          type: 'integer',
          required: false,
          description: 'Single hotel id which is passed to us, what we do with this hotelID is we look up the city for you and return matching results from that city search as if we had searched by location id',
          example: '34853'
        },
        {
          name: 'latitude',
          type: 'float',
          required: false,
          description: 'Latitudinal center of search area',
          example: '35.20575'
        },
        {
          name: 'longitude',
          type: 'float',
          required: false,
          description: 'Longitudinal center of search area',
          example: '25.35981'
        },
        {
          name: 'radius',
          type: 'float',
          required: false,
          description: 'Diameter of miles you are searching surrounding selected location. If doing a deal search, leave off radius and just pass lat/lon to indicate a market deal search',
          example: '10'
        },
        {
          name: 'sortType',
          type: 'string',
          required: false,
          description: 'Default: "bestvalue". Options: bestvalue, dealpercent, dealamount, rebateamount, bestdeal',
          example: 'bestvalue'
        },
        {
          name: '_type',
          type: 'string',
          required: false,
          description: 'Default: json. Format of API response, formats available are \'json\' and \'xml\'',
          example: 'json'
        }
      ]}
      requestExample={{
        url: 'https://api.travsrv.com/api/hotel?type=availability&inDate=2025-06-15&outDate=2025-06-20&siteid=64&rooms=1&adults=2&children=0&userAgent=Mozilla/5.0&userLanguage=en&hotelids=34853&_type=json',
        method: 'GET',
        headers: [
          {
            name: 'Host',
            value: 'api.travsrv.com'
          },
          {
            name: 'Site-Id',
            value: 'YOUR_SITE_ID'
          },
          {
            name: 'API-ClientUsername',
            value: 'YOUR_USERNAME'
          },
          {
            name: 'API-ClientPassword',
            value: 'YOUR_PASSWORD'
          },
          {
            name: 'Content-Type',
            value: 'application/json'
          },
          {
            name: 'Accept-version',
            value: '2'
          },
          {
            name: 'Authorization',
            value: 'Basic (Base64 encoded username:password)'
          }
        ]
      }}
      responseExample={{
        status: 200,
        body: `{
  "ArnResponse": {
    "@MemberType": "Invalid",
    "@CurrentToken": "",
    "Info": {
      "@SiteID": "64",
      "@Username": "publictest",
      "@IpAddress": "",
      "@TimeReceived": "2025-04-26T12:57:41.162",
      "@TimeCompleted": "2025-04-26T12:57:41.549",
      "@Version": "2",
      "@ServiceUrl": "http://www.tripauthority.com/",
      "@RequestID": "9BD8D996-1762-4709-AB5A-AE4684D15575",
      "@ElapsedTime": "665",
      "@TripAggregationTime": "time: 753 | StartTripRequest << 11% time: 80ms | ExecuteMultiplePropertyRequests << 88% time: 665ms",
      "@ReturnedRateCount": "13"
    },
    "Availability": {
      "@DisplayCurrency": "USD",
      "HotelAvailability": {
        "@InDate": "2025-06-15",
        "@OutDate": "2025-06-20",
        "@Rooms": "1",
        "@Adults": "2",
        "@Children": "0",
        "@SortType": "bestvalue",
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
            "@PropertyLink": "https://travsrv.com/v6?type=property&rooms=1&adults=2&children=0&checkIn=2025-06-15&checkOut=2025-06-20&siteid=64&property=34853",
            "RatePlan": [
              {
                "@Code": "62807arvlm5s3fvlx0iqsmxqb",
                "@Description": "Xroiuqy ucoyetn?",
                "@BuyerOnly": "false",
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
                    "@ExchangeGMT": "2025-04-26T12:00:09.630",
                    "@MaximumBookable": "7",
                    "@Refundable": "true",
                    "@SortValue": "0",
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
                      "@Percent": "12",
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
                      "@ExchangeGMT": "2025-04-26T12:00:09.630"
                    },
                    "DueOnArrival": null,
                    "AddedValue": null
                  }
                ]
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
          section: 'ArnResponse Object',
          description: 'Root object containing all response data'
        },
        {
          name: '@MemberType',
          type: 'string',
          section: 'ArnResponse Object',
          description: 'Type of member response'
        },
        {
          name: '@CurrentToken',
          type: 'string',
          section: 'ArnResponse Object',
          description: 'Current token for the session'
        },

        // Info Object
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
          name: '@ElapsedTime',
          type: 'string',
          section: 'Info Object',
          description: 'Time taken to process the request in milliseconds'
        },
        {
          name: '@TripAggregationTime',
          type: 'string',
          section: 'Info Object',
          description: 'Detailed breakdown of processing time'
        },
        {
          name: '@ReturnedRateCount',
          type: 'string',
          section: 'Info Object',
          description: 'Number of rates returned in the response'
        },

        // Availability Object
        {
          name: '@DisplayCurrency',
          type: 'string',
          section: 'Availability Object',
          description: 'Currency used for displaying prices (e.g., "USD")'
        },

        // HotelAvailability Object
        {
          name: '@InDate',
          type: 'string',
          section: 'HotelAvailability Object',
          description: 'Check-in date in YYYY-MM-DD format'
        },
        {
          name: '@OutDate',
          type: 'string',
          section: 'HotelAvailability Object',
          description: 'Check-out date in YYYY-MM-DD format'
        },
        {
          name: '@Rooms',
          type: 'string',
          section: 'HotelAvailability Object',
          description: 'Number of rooms requested'
        },
        {
          name: '@Adults',
          type: 'string',
          section: 'HotelAvailability Object',
          description: 'Number of adults requested'
        },
        {
          name: '@Children',
          type: 'string',
          section: 'HotelAvailability Object',
          description: 'Number of children requested'
        },
        {
          name: '@SortType',
          type: 'string',
          section: 'HotelAvailability Object',
          description: 'Sorting method used for results (e.g., "bestvalue")'
        },
        {
          name: 'Hotel',
          type: 'array',
          section: 'HotelAvailability Object',
          description: 'Array of hotel objects matching the search criteria'
        },

        // Hotel Object
        {
          name: '@HotelID',
          type: 'string',
          section: 'Hotel Object',
          description: 'Unique identifier for the hotel'
        },
        {
          name: '@SortRatePlanCode',
          type: 'string',
          section: 'Hotel Object',
          description: 'Code used for sorting rate plans (production only)'
        },
        {
          name: '@SortRoomCode',
          type: 'string',
          section: 'Hotel Object',
          description: 'Code used for sorting rooms (production only)'
        },
        {
          name: '@SortOrder',
          type: 'string',
          section: 'Hotel Object',
          description: 'Order value for sorting (production only)'
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
          name: '@PercentMatch',
          type: 'string',
          section: 'Hotel Object',
          description: 'Percentage match to search criteria'
        },
        {
          name: '@ImageThumbnail',
          type: 'string',
          section: 'Hotel Object',
          description: 'URL to the hotel thumbnail image'
        },
        {
          name: '@LocationDescription',
          type: 'string',
          section: 'Hotel Object',
          description: 'Description of the hotel location'
        },
        {
          name: '@TripAdvisorReviewCount',
          type: 'string',
          section: 'Hotel Object',
          description: 'Number of TripAdvisor reviews'
        },
        {
          name: '@TripAdvisorRating',
          type: 'string',
          section: 'Hotel Object',
          description: 'TripAdvisor rating (out of 5)'
        },
        {
          name: '@RatingImageUrl',
          type: 'string',
          section: 'Hotel Object',
          description: 'URL to the rating image'
        },
        {
          name: '@PriceClass',
          type: 'string',
          section: 'Hotel Object',
          description: 'Price class/category of the hotel'
        },
        {
          name: '@TripAdvisorPartnerLocationId',
          type: 'string',
          section: 'Hotel Object',
          description: 'TripAdvisor partner location ID'
        },
        {
          name: '@PropertyType',
          type: 'string',
          section: 'Hotel Object',
          description: 'Type of property (e.g., "Vac. Rental", "Hotel")'
        },
        {
          name: '@PropertyLink',
          type: 'string',
          section: 'Hotel Object',
          description: 'URL to the property details page'
        },
        {
          name: 'RatePlan',
          type: 'array',
          section: 'Hotel Object',
          description: 'Array of rate plans available for the hotel'
        },

        // RatePlan Object
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
          name: '@BuyerOnly',
          type: 'string',
          section: 'RatePlan Object',
          description: 'Indicates if the rate is available only to buyers'
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
          description: 'Array of room types available for this rate plan'
        },

        // Room Object
        {
          name: '@Code',
          type: 'string',
          section: 'Room Object',
          description: 'Unique identifier for the room'
        },
        {
          name: '@Discount',
          type: 'string',
          section: 'Room Object',
          description: 'Amount of discount applied to the room rate (production only)'
        },
        {
          name: '@RestrictedRate',
          type: 'string',
          section: 'Room Object',
          description: 'Indicates if the rate has restrictions (production only)'
        },
        {
          name: '@IgnoreDebugRefundableFlag',
          type: 'string',
          section: 'Room Object',
          description: 'Flag for handling refundable status in debugging (production only)'
        },
        {
          name: '@CancellationFee',
          type: 'string',
          section: 'Room Object',
          description: 'Fee charged for cancellation (production only)'
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
          name: '@DisplayCurrencyMultiplier',
          type: 'string',
          section: 'Room Object',
          description: 'Multiplier for converting to display currency'
        },
        {
          name: '@USDMultiplier',
          type: 'string',
          section: 'Room Object',
          description: 'Multiplier for converting to USD'
        },
        {
          name: '@ExchangeGMT',
          type: 'string',
          section: 'Room Object',
          description: 'Timestamp of the exchange rate'
        },
        {
          name: '@MaximumBookable',
          type: 'string',
          section: 'Room Object',
          description: 'Maximum number of rooms that can be booked'
        },
        {
          name: '@Refundable',
          type: 'string',
          section: 'Room Object',
          description: 'Indicates if the rate is refundable'
        },
        {
          name: '@SortValue',
          type: 'string',
          section: 'Room Object',
          description: 'Value used for sorting'
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
          name: 'NightlyRate[].@Discount',
          type: 'string',
          section: 'Room Object',
          description: 'Discount amount for the night (production only)'
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
          name: 'Total.@Discount',
          type: 'string',
          section: 'Room Object',
          description: 'Total discount amount (production only)'
        },
        {
          name: 'Total.@ComparableRetailDiscount',
          type: 'string',
          section: 'Room Object',
          description: 'Discount compared to retail pricing (production only)'
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
        {
          name: 'BookingFee.@DisplayCurrencyMultiplier',
          type: 'string',
          section: 'Room Object',
          description: 'Multiplier for converting booking fee to display currency'
        },
        {
          name: 'BookingFee.@RoomCurrencyMultiplier',
          type: 'string',
          section: 'Room Object',
          description: 'Multiplier for converting booking fee to room currency'
        },
        {
          name: 'BookingFee.@ExchangeGMT',
          type: 'string',
          section: 'Room Object',
          description: 'Timestamp of the exchange rate for booking fee'
        },
        {
          name: 'DueOnArrival',
          type: 'object',
          section: 'Room Object',
          description: 'Contains information about amount due on arrival. May be null if no payment is due on arrival'
        },
        {
          name: 'DueOnArrival.Total',
          type: 'object',
          section: 'Room Object',
          description: 'Contains total amount due on arrival (production only)'
        },
        {
          name: 'DueOnArrival.Total.@Amount',
          type: 'string',
          section: 'Room Object',
          description: 'Total amount due on arrival (production only)'
        },
        {
          name: 'DueOnArrival.Total.@CurrencyCode',
          type: 'string',
          section: 'Room Object',
          description: 'Currency code for the total amount due on arrival (production only)'
        },
        {
          name: 'DueOnArrival.Fee',
          type: 'object or array',
          section: 'Room Object',
          description: 'Contains fee information, can be a single object or array of objects (production only)'
        },
        {
          name: 'DueOnArrival.Fee.@Title',
          type: 'string',
          section: 'Room Object',
          description: 'Title of the fee (e.g., "Resort Fee") (production only)'
        },
        {
          name: 'DueOnArrival.Fee.@Description',
          type: 'string',
          section: 'Room Object',
          description: 'Description of the fee (production only)'
        },
        {
          name: 'DueOnArrival.Fee.@Amount',
          type: 'string',
          section: 'Room Object',
          description: 'Amount of the fee (production only)'
        },
        {
          name: 'DueOnArrival.Fee.@CurrencyCode',
          type: 'string',
          section: 'Room Object',
          description: 'Currency code for the fee (production only)'
        },
        {
          name: 'DueOnArrival.Fee.@IsOptional',
          type: 'string',
          section: 'Room Object',
          description: 'Indicates if the fee is optional (production only)'
        },
        {
          name: 'DueOnArrival.@Amount',
          type: 'string',
          section: 'Room Object',
          description: 'Amount due on arrival (test environment)'
        },
        {
          name: 'DueOnArrival.@CurrencyCode',
          type: 'string',
          section: 'Room Object',
          description: 'Currency code for the amount due on arrival (test environment)'
        },
        {
          name: 'AddedValue',
          type: 'object',
          section: 'Room Object',
          description: 'Contains information about added value or special offers. May be null if no added value is available'
        },
        {
          name: 'AddedValue.@Description',
          type: 'string',
          section: 'Room Object',
          description: 'Description of the added value or special offer'
        },
        {
          name: 'AddedValue.@Amount',
          type: 'string',
          section: 'Room Object',
          description: 'Monetary value of the added value or special offer, if applicable'
        }
      ]}
      codeExamples={[
        {
          language: 'bash',
          label: 'cURL',
          code: `curl -X GET "https://api.travsrv.com/api/hotel?type=availability&inDate=2025-06-15&outDate=2025-06-20&siteid=64&rooms=1&adults=2&children=0&userAgent=Mozilla/5.0&userLanguage=en&hotelids=34853&_type=json" \\
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
          code: `# Example using Requests library
import requests

url = 'https://api.travsrv.com/api/hotel'
params = {
    'type': 'availability',
    'inDate': '2025-06-15',
    'outDate': '2025-06-20',
    'siteid': 64,
    'rooms': 1,
    'adults': 2,
    'children': 0,
    'userAgent': 'Mozilla/5.0',
    'userLanguage': 'en',
    'hotelids': '34853',
    '_type': 'json'
}
headers = {
    'Site-Id': 'YOUR_SITE_ID',
    'API-ClientUsername': 'YOUR_USERNAME',
    'API-ClientPassword': 'YOUR_PASSWORD',
    'Content-Type': 'application/json',
    'Accept-version': '2',
    'Authorization': 'Basic YOUR_BASE64_ENCODED_CREDENTIALS'  # Base64 encoded username:password
}

response = requests.get(url, params=params, headers=headers)
data = response.json()

hotels = data['ArnResponse']['Availability']['HotelAvailability']['Hotel']
print(f"Available hotels: {len(hotels)}")
print(f"First hotel name: {hotels[0]['@Name']}")`
        },
        {
          language: 'javascript',
          label: 'JavaScript',
          code: `// Example using Fetch API
fetch('https://api.travsrv.com/api/hotel?type=availability&inDate=2025-06-15&outDate=2025-06-20&siteid=64&rooms=1&adults=2&children=0&userAgent=Mozilla/5.0&userLanguage=en&hotelids=34853&_type=json', {
  method: 'GET',
  headers: {
    'Site-Id': 'YOUR_SITE_ID',
    'API-ClientUsername': 'YOUR_USERNAME',
    'API-ClientPassword': 'YOUR_PASSWORD',
    'Content-Type': 'application/json',
    'Accept-version': '2',
    'Authorization': 'Basic YOUR_BASE64_ENCODED_CREDENTIALS'  // Base64 encoded username:password
  }
})
.then(response => response.json())
.then(data => {
  console.log('Response:', data);
  const hotels = data.ArnResponse.Availability.HotelAvailability.Hotel;
  console.log('Available hotels:', hotels.length);
  console.log('First hotel name:', hotels[0]['@Name']);
})
.catch(error => console.error('Error fetching availability:', error));`
        },
        {
          language: 'php',
          label: 'PHP',
          code: `<?php
// Using cURL
$baseUrl = "https://api.travsrv.com/api/hotel";
$params = [
    "type" => "availability",
    "inDate" => "2025-06-15",
    "outDate" => "2025-06-20",
    "siteid" => "64",
    "rooms" => "1",
    "adults" => "2",
    "children" => "0",
    "userAgent" => "Mozilla/5.0",
    "userLanguage" => "en",
    "hotelids" => "34853",
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
    $hotels = $data['ArnResponse']['Availability']['HotelAvailability']['Hotel'];
    echo "Available hotels: " . count($hotels) . "\\n";
    echo "First hotel name: " . $hotels[0]['@Name'] . "\\n";
} else {
    echo "Request failed with status code: " . $httpCode . "\\n";
    echo $response;
}

curl_close($curl);
?>`
        }
      ]}
    >


      <h3>Hotel Object</h3>
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
            <td><code>@SortRatePlanCode</code></td>
            <td>string</td>
            <td>Code used for sorting rate plans</td>
          </tr>
          <tr>
            <td><code>@SortRoomCode</code></td>
            <td>string</td>
            <td>Code used for sorting rooms</td>
          </tr>
          <tr>
            <td><code>@SortOrder</code></td>
            <td>string</td>
            <td>Order value for sorting</td>
          </tr>
        </tbody>
      </table>

      <h3>Room Object</h3>
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
            <td>Amount of discount applied to the room rate</td>
          </tr>
          <tr>
            <td><code>@RestrictedRate</code></td>
            <td>string</td>
            <td>Indicates if the rate has restrictions</td>
          </tr>
          <tr>
            <td><code>@IgnoreDebugRefundableFlag</code></td>
            <td>string</td>
            <td>Flag for handling refundable status in debugging</td>
          </tr>
          <tr>
            <td><code>@CancellationFee</code></td>
            <td>string</td>
            <td>Fee charged for cancellation</td>
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
            <td>Discount amount for the night</td>
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
            <td>Total discount amount</td>
          </tr>
          <tr>
            <td><code>@ComparableRetailDiscount</code></td>
            <td>string</td>
            <td>Discount compared to retail pricing</td>
          </tr>
        </tbody>
      </table>

      <h3>DueOnArrival Object</h3>
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
            <td><code>Total</code></td>
            <td>object</td>
            <td>Contains total amount due on arrival</td>
          </tr>
          <tr>
            <td><code>Total.@Amount</code></td>
            <td>string</td>
            <td>Total amount due on arrival</td>
          </tr>
          <tr>
            <td><code>Total.@CurrencyCode</code></td>
            <td>string</td>
            <td>Currency code for the total amount due on arrival</td>
          </tr>
          <tr>
            <td><code>Fee</code></td>
            <td>object or array</td>
            <td>Contains fee information, can be a single object or array of objects</td>
          </tr>
          <tr>
            <td><code>Fee.@Title</code></td>
            <td>string</td>
            <td>Title of the fee (e.g., "Resort Fee")</td>
          </tr>
          <tr>
            <td><code>Fee.@Description</code></td>
            <td>string</td>
            <td>Description of the fee</td>
          </tr>
          <tr>
            <td><code>Fee.@Amount</code></td>
            <td>string</td>
            <td>Amount of the fee</td>
          </tr>
          <tr>
            <td><code>Fee.@CurrencyCode</code></td>
            <td>string</td>
            <td>Currency code for the fee</td>
          </tr>
          <tr>
            <td><code>Fee.@IsOptional</code></td>
            <td>string</td>
            <td>Indicates if the fee is optional</td>
          </tr>
        </tbody>
      </table>

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
    </EndpointPage>
  );
};

export default Availability;
