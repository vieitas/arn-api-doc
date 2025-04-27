import React from 'react';
import EndpointPage from '../../../components/endpoints/EndpointPage';

const ItineraryByNumber: React.FC = () => {
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
      title="Itinerary by Confirmation Number"
      description="Retrieve a reservation using the guest's email and confirmation number"
      sections={sections}
      endpoint={{
        method: 'GET',
        url: 'https://api.travsrv.com/api/guests?type=lookupReservationXml',
        id: 'itinerary-by-confirmation',
        category: 'hotel',
        endpointDescription: "This endpoint is used to retrieve a previously submitted reservation by the guest's email address and confirmation number. This is particularly useful for guest-facing applications where the guest may only have their confirmation number and email address, not the internal reservation locator.",
        nextSteps: "After retrieving a reservation by confirmation number, you may need to cancel it using the <a href='/endpoints/hotel/reservation-cancellation'>Reservation Cancellation</a> endpoint. Make sure to note the <code>ReservationID</code> value from the response as it will be required for the cancellation request."
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
          description: 'Must be set to "lookupReservationXml"',
          example: 'lookupReservationXml'
        },
        {
          name: 'email',
          type: 'string',
          required: true,
          description: 'Email address used during reservation creation',
          example: 'test@example.com'
        },
        {
          name: 'confirmationNumber',
          type: 'string',
          required: true,
          description: 'Confirmation number provided to the guest after reservation creation',
          example: '651444'
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
        url: 'https://api.travsrv.com/api/guests?type=lookupReservationXml&email=guest@example.com&confirmationNumber=987618&_type=json',
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
            value: 'Basic YOUR_BASE64_ENCODED_CREDENTIALS'
          }
        ]
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
      "@TimeCompleted": "Saturday, April 26, 2025",
      "@Version": "1.0.0.0",
      "@ServiceUrl": "http://api.travsrv.com/api/hotel?_type=json&siteid=64&type=reservation",
      "@RequestID": "50078345-2EBA-4FE6-BF24-B2788187B16B",
      "@MasterId": "1",
      "@AffiliateId": "4"
    },
    "Reservation": {
      "@DisplayCurrency": "USD",
      "@RecordLocator": "c8eae170-d1c6-4c15-abfb-77ce2220782f",
      "@ItineraryID": "12907054",
      "@LinkId": "",
      "@CustomerDiscount": "0.00",
      "@CustomerComparableDiscount": "0.00",
      "@CustomerRebate": "0",
      "@ElectiveRebateAdjustment": "0.00",
      "@PartnerMargin": "5.63",
      "@PartnerShare": "81.46",
      "@PartnerShareUSD": "92.71",
      "@UseCommasInMoney": "False",
      "@SavingsLabel": "Congratulations, you saved",
      "@PointsLabel": "Points Utilized",
      "HotelReservation": {
        "@InDate": "Sunday, June 15, 2025",
        "@OutDate": "Friday, June 20, 2025",
        "@Rooms": "1",
        "@Adults": "2",
        "@Children": "0",
        "@ReservationID": "12955221",
        "@CustomerConfirmationNumber": "987618",
        "@ReservationLocator": "1286894",
        "@SiteId": "64",
        "@AffiliateId": "4",
        "@MasterId": "1",
        "@ResStatus": "RESCAP",
        "@DomainName": "www.reservetravel.com",
        "@TrickBooking": "False",
        "@HideLinks": "False",
        "@HideSupportLink": "False",
        "@HideNewReservationLink": "False",
        "@HideCancelReservationLink": "False",
        "@HideModifyLink": "False",
        "@EncryptedResId": "NDQtxIwuY55%2f6rkUFtlUBzgPRPsbY2vigj2STOwkIDs%3d",
        "@IsVirginBlue": "False",
        "@IsHalpern": "False",
        "@IsTTS": "False",
        "@AttentionHotelier": "",
        "@IsDiscountSite": "true",
        "@ReservationId": "12955221",
        "@ChargeName": "Hotel Accommodations",
        "@CompanyName": "Alliance Reservations Network (ARN)",
        "@IATA": "03840502",
        "@AgencyPhone": "+1 (602) 726-9076 OR +1 (844) 965-4056",
        "@AgencyEmail": "customerservice@mytravel.support",
        "@AgencyFax": "+1 (602) 889-5558 OR +1 (602) 889-5559",
        "@CreditCardName": "Test Cardholder",
        "@CreditCardAddress": "123 Test Street",
        "@CreditCardZip": "12345",
        "@HideSupportNumberOnReceipt": "False",
        "@GuestReceiptGroupAssistanceTextHidden": "False",
        "@GuestReceiptAffiliateAssistanceGroupSupplyText": "For any pre-arrival assistance or questions regarding an existing reservation, please contact:",
        "@GuestReceiptAffiliateAssistanceOtherSupplyText": "For assistance with check-in on the day of arrival only; or, assistance with problems during your stay, please call:",
        "@GuestReceiptAffiliateAssistanceOtherShowHotelPhone": "True",
        "@EmailCustomerSupportLink": "",
        "@EmailCustomerSupportLinkText": "",
        "@IsCommissionable": "False",
        "@AdditionalCancelText": "Your deposit guarantees no additional cancellation fees will be required for cancellations or room reductions outside the terms for late cancellations listed above.",
        "@IsOmitArrivalTimes": "False",
        "@PropertyConfirmationNumber": "",
        "@NoteToHotelPersonnel": "NOTE TO HOTEL PERSONNEL: This reservation was made through Alliance Reservations Network (ARN).",
        "@CheckInSupport": "",
        "@DearGuestText": "",
        "@ContactSupportText": "please contact us directly by clicking the support link below. To cancel, please use the cancellation link provided below.",
        "@IsShowHotelPhone": "False",
        "@IsHideReceiptPaymentInfo": "False",
        "@IncludeDueOnArrivalInPayAtProperty": "True",
        "Hotel": {
          "@HotelID": "34853",
          "@HotelName": "Bryan's Spanish Cove",
          "@HotelCountry": "US",
          "@HotelPostal": "32821",
          "@HotelCity": "Orlando",
          "@HotelState": "FL",
          "@BrandCode": "YX",
          "@HotelEmail": "",
          "@Name": "Bryan's Spanish Cove",
          "@Address": "13875 State Road 535 Orlando FL 32821 US",
          "@PhoneNumber": "1-800-438-2929",
          "RatePlan": {
            "@Code": "62807arvlm5s3fvlx0iqsmxqb",
            "@Description": "Xroiuqy ucoyetn?",
            "@Gateway": "28",
            "@CommissionStatus": "Commissionable",
            "@BalanceDueAtHotel": "false",
            "Room": {
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
                  "@Date": "Sunday, June 15, 2025",
                  "@Price": "495.00",
                  "@Display": "563.33 USD [495.00 EUR]"
                },
                {
                  "@Date": "Monday, June 16, 2025",
                  "@Price": "266.00",
                  "@Display": "302.72 USD [266.00 EUR]"
                },
                {
                  "@Date": "Tuesday, June 17, 2025",
                  "@Price": "266.00",
                  "@Display": "302.72 USD [266.00 EUR]"
                },
                {
                  "@Date": "Wednesday, June 18, 2025",
                  "@Price": "266.00",
                  "@Display": "302.72 USD [266.00 EUR]"
                },
                {
                  "@Date": "Thursday, June 19, 2025",
                  "@Price": "0.00",
                  "@Display": "0.00 USD [0.00 EUR]"
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
                "@IncludesBookingFee": "false",
                "@RoomCost": "1471.49 USD [1293.00 EUR]",
                "@TotalTaxesAmount": "181.58 USD [159.55 EUR]",
                "@BookingFeeAmount": "5.00 USD",
                "@Display": "1653.07 USD [1452.55 EUR]",
                "@DepositCharged": "0.00 USD [0.00 EUR]",
                "@BalanceDue": "1653.07 USD [1452.55 EUR]"
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
            },
            "Policy": {
              "ExtraPersonPrice": {
                "@Adult": "0.00",
                "@Child": "0.00",
                "@CurrencyCode": "EUR",
                "@DisplayCurrencyMultiplier": "1.1380448390",
                "@USDMultiplier": "1.1380448390",
                "@ExchangeGMT": "2025-04-27T01:00:09.423"
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
                },
                "RefundAmount": "$0.00"
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
                },
                {
                  "@Description": "This is a test Guarantee policy, nothing is required."
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
        },
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
          name: '@MasterId',
          type: 'string',
          section: 'Info Object',
          description: 'Master account identifier'
        },
        {
          name: '@AffiliateId',
          type: 'string',
          section: 'Info Object',
          description: 'Affiliate identifier'
        },

        // Reservation Object
        {
          name: 'Reservation',
          type: 'object',
          section: 'Reservation Object',
          description: 'Contains detailed information about the reservation'
        },
        {
          name: '@DisplayCurrency',
          type: 'string',
          section: 'Reservation Object',
          description: 'Currency code for display purposes'
        },
        {
          name: '@RecordLocator',
          type: 'string',
          section: 'Reservation Object',
          description: 'Unique record locator (GUID) for the reservation'
        },
        {
          name: '@ItineraryID',
          type: 'string',
          section: 'Reservation Object',
          description: 'Unique identifier for the itinerary'
        },
        {
          name: '@LinkId',
          type: 'string',
          section: 'Reservation Object',
          description: 'Link identifier, if applicable'
        },

        // HotelReservation Object (inside Reservation)
        {
          name: 'HotelReservation',
          type: 'object',
          section: 'Reservation.HotelReservation Object',
          description: 'Contains detailed information about the hotel reservation'
        },
        {
          name: '@InDate',
          type: 'string',
          section: 'Reservation.HotelReservation Object',
          description: 'Check-in date'
        },
        {
          name: '@OutDate',
          type: 'string',
          section: 'Reservation.HotelReservation Object',
          description: 'Check-out date'
        },
        {
          name: '@Rooms',
          type: 'string',
          section: 'Reservation.HotelReservation Object',
          description: 'Number of rooms'
        },
        {
          name: '@Adults',
          type: 'string',
          section: 'Reservation.HotelReservation Object',
          description: 'Number of adults'
        },
        {
          name: '@Children',
          type: 'string',
          section: 'Reservation.HotelReservation Object',
          description: 'Number of children'
        },
        {
          name: '@ReservationID',
          type: 'string',
          section: 'Reservation.HotelReservation Object',
          description: 'Unique identifier for the reservation'
        },
        {
          name: '@CustomerConfirmationNumber',
          type: 'string',
          section: 'Reservation.HotelReservation Object',
          description: 'Confirmation number provided to the customer'
        },
        {
          name: '@ReservationLocator',
          type: 'string',
          section: 'Reservation.HotelReservation Object',
          description: 'Reservation locator identifier'
        },
        {
          name: '@SiteId',
          type: 'string',
          section: 'Reservation.HotelReservation Object',
          description: 'Site identifier'
        },
        {
          name: '@ResStatus',
          type: 'string',
          section: 'Reservation.HotelReservation Object',
          description: 'Status of the reservation (e.g., "RESCAP" for captured)'
        },

        // Hotel Object (inside HotelReservation)
        {
          name: 'Hotel',
          type: 'object',
          section: 'Reservation.HotelReservation.Hotel Object',
          description: 'Contains detailed information about the hotel'
        },
        {
          name: '@HotelID',
          type: 'string',
          section: 'Reservation.HotelReservation.Hotel Object',
          description: 'Unique identifier for the hotel'
        },
        {
          name: '@HotelName',
          type: 'string',
          section: 'Reservation.HotelReservation.Hotel Object',
          description: 'Name of the hotel'
        },
        {
          name: '@HotelCountry',
          type: 'string',
          section: 'Reservation.HotelReservation.Hotel Object',
          description: 'Country code where the hotel is located'
        },
        {
          name: '@HotelPostal',
          type: 'string',
          section: 'Reservation.HotelReservation.Hotel Object',
          description: 'Postal/ZIP code of the hotel'
        },
        {
          name: '@HotelCity',
          type: 'string',
          section: 'Reservation.HotelReservation.Hotel Object',
          description: 'City where the hotel is located'
        },
        {
          name: '@HotelState',
          type: 'string',
          section: 'Reservation.HotelReservation.Hotel Object',
          description: 'State/province where the hotel is located'
        },
        {
          name: '@Name',
          type: 'string',
          section: 'Reservation.HotelReservation.Hotel Object',
          description: 'Name of the hotel'
        },
        {
          name: '@Address',
          type: 'string',
          section: 'Reservation.HotelReservation.Hotel Object',
          description: 'Full address of the hotel'
        },
        {
          name: '@PhoneNumber',
          type: 'string',
          section: 'Reservation.HotelReservation.Hotel Object',
          description: 'Phone number of the hotel'
        },

        // RatePlan Object (inside HotelReservation.Hotel)
        {
          name: 'RatePlan',
          type: 'object',
          section: 'Reservation.HotelReservation.Hotel.RatePlan Object',
          description: 'Contains detailed information about the rate plan'
        },
        {
          name: '@Code',
          type: 'string',
          section: 'Reservation.HotelReservation.Hotel.RatePlan Object',
          description: 'Code for the rate plan'
        },
        {
          name: '@Description',
          type: 'string',
          section: 'Reservation.HotelReservation.Hotel.RatePlan Object',
          description: 'Description of the rate plan'
        },
        {
          name: '@Gateway',
          type: 'string',
          section: 'Reservation.HotelReservation.Hotel.RatePlan Object',
          description: 'Gateway identifier for the rate plan'
        },

        // Room Object (inside RatePlan)
        {
          name: 'Room',
          type: 'object',
          section: 'Reservation.HotelReservation.Hotel.RatePlan.Room Object',
          description: 'Contains information about the room'
        },
        {
          name: '@Code',
          type: 'string',
          section: 'Reservation.HotelReservation.Hotel.RatePlan.Room Object',
          description: 'Code for the room type'
        },
        {
          name: '@Name',
          type: 'string',
          section: 'Reservation.HotelReservation.Hotel.RatePlan.Room Object',
          description: 'Name of the room type'
        },
        {
          name: '@CurrencyCode',
          type: 'string',
          section: 'Reservation.HotelReservation.Hotel.RatePlan.Room Object',
          description: 'Currency code for the room rates'
        },

        // NightlyRate Object (inside Room)
        {
          name: 'NightlyRate',
          type: 'object',
          section: 'Reservation.HotelReservation.Hotel.RatePlan.Room.NightlyRate Object',
          description: 'Contains information about the nightly rate'
        },
        {
          name: '@Date',
          type: 'string',
          section: 'Reservation.HotelReservation.Hotel.RatePlan.Room.NightlyRate Object',
          description: 'Date for the nightly rate'
        },
        {
          name: '@Price',
          type: 'string',
          section: 'Reservation.HotelReservation.Hotel.RatePlan.Room.NightlyRate Object',
          description: 'Price for the nightly rate'
        },
        {
          name: '@Display',
          type: 'string',
          section: 'Reservation.HotelReservation.Hotel.RatePlan.Room.NightlyRate Object',
          description: 'Display value for the nightly rate'
        },

        // Tax Object (inside Room)
        {
          name: 'Tax',
          type: 'object',
          section: 'Reservation.HotelReservation.Hotel.RatePlan.Room.Tax Object',
          description: 'Contains information about taxes'
        },
        {
          name: '@Percent',
          type: 'string',
          section: 'Reservation.HotelReservation.Hotel.RatePlan.Room.Tax Object',
          description: 'Tax percentage'
        },
        {
          name: '@Amount',
          type: 'string',
          section: 'Reservation.HotelReservation.Hotel.RatePlan.Room.Tax Object',
          description: 'Tax amount'
        },

        // Total Object (inside Room)
        {
          name: 'Total',
          type: 'object',
          section: 'Reservation.HotelReservation.Hotel.RatePlan.Room.Total Object',
          description: 'Contains information about the total cost'
        },
        {
          name: '@Amount',
          type: 'string',
          section: 'Reservation.HotelReservation.Hotel.RatePlan.Room.Total Object',
          description: 'Total amount'
        },
        {
          name: '@IncludesBookingFee',
          type: 'string',
          section: 'Reservation.HotelReservation.Hotel.RatePlan.Room.Total Object',
          description: 'Whether the total includes booking fees'
        },
        {
          name: '@Display',
          type: 'string',
          section: 'Reservation.HotelReservation.Hotel.RatePlan.Room.Total Object',
          description: 'Display value for the total amount'
        },

        // Guests Object (inside HotelReservation)
        {
          name: 'Guests',
          type: 'object',
          section: 'Reservation.HotelReservation.Guests Object',
          description: 'Contains information about the guests'
        },
        {
          name: 'Primary',
          type: 'object',
          section: 'Reservation.HotelReservation.Guests.Primary Object',
          description: 'Information about the primary guest'
        },
        {
          name: '@FirstName',
          type: 'string',
          section: 'Reservation.HotelReservation.Guests.Primary Object',
          description: 'First name of the primary guest'
        },
        {
          name: '@LastName',
          type: 'string',
          section: 'Reservation.HotelReservation.Guests.Primary Object',
          description: 'Last name of the primary guest'
        },
        {
          name: '@Email',
          type: 'string',
          section: 'Reservation.HotelReservation.Guests.Primary Object',
          description: 'Email address of the primary guest'
        },
        {
          name: '@PhoneCountry',
          type: 'string',
          section: 'Reservation.HotelReservation.Guests.Primary Object',
          description: 'Country code for the phone number'
        },
        {
          name: '@PhoneArea',
          type: 'string',
          section: 'Reservation.HotelReservation.Guests.Primary Object',
          description: 'Area code for the phone number'
        },
        {
          name: '@PhoneNumber',
          type: 'string',
          section: 'Reservation.HotelReservation.Guests.Primary Object',
          description: 'Phone number of the primary guest'
        },
        {
          name: 'Address',
          type: 'object',
          section: 'Reservation.HotelReservation.Guests.Primary.Address Object',
          description: 'Address information for the primary guest'
        },
        {
          name: '@Address',
          type: 'string',
          section: 'Reservation.HotelReservation.Guests.Primary.Address Object',
          description: 'Street address of the primary guest'
        },
        {
          name: '@City',
          type: 'string',
          section: 'Reservation.HotelReservation.Guests.Primary.Address Object',
          description: 'City of the primary guest'
        },
        {
          name: '@Region',
          type: 'string',
          section: 'Reservation.HotelReservation.Guests.Primary.Address Object',
          description: 'State/region of the primary guest'
        },
        {
          name: '@PostalCode',
          type: 'string',
          section: 'Reservation.HotelReservation.Guests.Primary.Address Object',
          description: 'Postal/ZIP code of the primary guest'
        },
        {
          name: '@CountryCode',
          type: 'string',
          section: 'Reservation.HotelReservation.Guests.Primary.Address Object',
          description: 'Country code of the primary guest'
        },


      ]}
      testProduction={{
        title: 'Test x Production',
        description: 'The following fields are present in the production environment but not in the test environment. Applications should be designed to handle these additional fields when migrating to production.',
        differences: []
      }}
      codeExamples={[
        {
          language: 'bash',
          label: 'cURL',
          code: `curl -X GET "https://api.travsrv.com/api/guests?type=lookupReservationXml&email=test@example.com&confirmationNumber=651444&_type=json" \\
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
    "Accept-version": "2",
    "Authorization": "Basic YOUR_BASE64_ENCODED_CREDENTIALS"  # Base64 encoded username:password
}

# Request parameters
params = {
    "type": "lookupReservationXml",
    "email": "test@example.com",
    "confirmationNumber": "651444",
    "_type": "json"
}

# Make a request
response = requests.get(
    "https://api.travsrv.com/api/guests",
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
  "Accept-version": "2",
  "Authorization": "Basic YOUR_BASE64_ENCODED_CREDENTIALS"  // Base64 encoded username:password
};

const params = {
  type: "lookupReservationXml",
  email: "test@example.com",
  confirmationNumber: "651444",
  _type: "json"
};

axios.get("https://api.travsrv.com/api/guests", {
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
$baseUrl = "https://api.travsrv.com/api/guests";
$params = [
    "type" => "lookupReservationXml",
    "email" => "test@example.com",
    "confirmationNumber" => "651444",
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
      <h3>Reservation Object</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Field</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>@AgentRefNumber</code></td>
            <td>Reference number for the agent</td>
          </tr>
        </tbody>
      </table>

      <h3>HotelReservation Object</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Field</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Header</code></td>
            <td>Header information for the reservation</td>
          </tr>
        </tbody>
      </table>

      <h3>NightlyRate Object</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Field</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>@Discount</code></td>
            <td>Discount amount for the nightly rate</td>
          </tr>
        </tbody>
      </table>

      <h3>Total Object</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Field</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>@Discount</code></td>
            <td>Discount amount for the total</td>
          </tr>
        </tbody>
      </table>
    </EndpointPage>
  );
};

export default ItineraryByNumber;
