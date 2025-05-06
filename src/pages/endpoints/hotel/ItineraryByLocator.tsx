import React from 'react';
import EndpointPage from '../../../components/endpoints/EndpointPage';

const ItineraryByLocator: React.FC = () => {
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
      title="Itinerary by Reservation Locator"
      description="Retrieve a reservation using the reservation locator"
      sections={sections}
      endpoint={{
        method: 'GET',
        url: 'https://api.travsrv.com/api/guests?type=reservationsByLocator',
        id: 'itinerary-by-locator',
        category: 'hotel',
        endpointDescription: "This endpoint is used to retrieve a previously submitted reservation by the reservation locator that was returned during reservation creation. This allows you to access all details of a reservation without requiring the guest's email or confirmation number.",
        nextSteps: "After retrieving a reservation by its locator, you may need to cancel it using the <a href='/endpoints/hotel/reservation-cancellation'>Reservation Cancellation</a> endpoint. Make sure to note the <code>ReservationID</code> value from the response as it will be required for the cancellation request."
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
          description: 'Must be set to "reservationsByLocator"',
          example: 'reservationsByLocator'
        },
        {
          name: 'siteid',
          type: 'integer',
          required: true,
          description: 'Site reservation was created under (64 for testing)',
          example: '64'
        },
        {
          name: 'reservationLocator',
          type: 'string',
          required: true,
          description: 'Reservation locator (preferably GUID) that was returned during reservation creation',
          example: '8043627a-9bda-41bd-8026-65b61a442c75'
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
        url: 'https://api.travsrv.com/api/guests?type=reservationsByLocator&siteid=64&reservationLocator=1286894&_type=json',
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
        body: `[
  {
    "MasterID": 1,
    "MasterName": "Alliance Web Sites",
    "AffilliateID": 4,
    "AffiliateName": "Other Websites",
    "SiteID": 64,
    "SiteName": "ReserveTravel.com",
    "ReservationID": 12955221,
    "ReservationLocatorID": 1286894,
    "ConfirmationNumber": "987618",
    "RecordLocator": "c8eae170-d1c6-4c15-abfb-77ce2220782f",
    "SupplierID": 28,
    "ResStatus": "RESCAP",
    "RatePlanCode": "62807arvlm5s3fvlx0iqsmxqb",
    "CheckIn": "2025-06-15",
    "CheckOut": "2025-06-20",
    "CreateDate": "2025-04-26T18:57:31.293",
    "HotelName": "Bryan's Spanish Cove",
    "HotelID": "34853",
    "GuestEmail": "guest@example.com",
    "GuestFirst": "Test",
    "GuestLast": "Guest",
    "CCLastFour": "1111",
    "CCName": "Test Cardholder",
    "GuestPhone": "1 123-1234567890 ",
    "BillingAddress": "123 Made Up Ln.",
    "BillingCity": "Example City",
    "BillingRegion": "FL",
    "BillingPostal": "12345",
    "BillingCountry": "US",
    "EmployeeId": ""
  }
]`
      }}
      responseParameters={[
        {
          name: 'MasterID',
          type: 'integer',
          description: 'Identifier for the master account'
        },
        {
          name: 'MasterName',
          type: 'string',
          description: 'Name of the master account'
        },
        {
          name: 'AffilliateID',
          type: 'integer',
          description: 'Identifier for the affiliate'
        },
        {
          name: 'AffiliateName',
          type: 'string',
          description: 'Name of the affiliate'
        },
        {
          name: 'SiteID',
          type: 'integer',
          description: 'Identifier for the site'
        },
        {
          name: 'SiteName',
          type: 'string',
          description: 'Name of the site'
        },
        {
          name: 'ReservationID',
          type: 'integer',
          description: 'Unique identifier for the reservation (needed for cancellation)'
        },
        {
          name: 'ReservationLocatorID',
          type: 'integer',
          description: 'Unique identifier for the reservation locator'
        },
        {
          name: 'ConfirmationNumber',
          type: 'string',
          description: 'Confirmation number to provide to the guest'
        },
        {
          name: 'RecordLocator',
          type: 'string',
          description: 'Record locator (GUID) that was provided during reservation creation'
        },
        {
          name: 'SupplierID',
          type: 'integer',
          description: 'Identifier for the supplier'
        },
        {
          name: 'ResStatus',
          type: 'string',
          description: 'Status of the reservation (e.g., "RESCAP" for captured)'
        },
        {
          name: 'RatePlanCode',
          type: 'string',
          description: 'Code for the rate plan'
        },
        {
          name: 'CheckIn',
          type: 'string',
          description: 'Check-in date'
        },
        {
          name: 'CheckOut',
          type: 'string',
          description: 'Check-out date'
        },
        {
          name: 'CreateDate',
          type: 'string',
          description: 'Date and time when the reservation was created'
        },
        {
          name: 'HotelName',
          type: 'string',
          description: 'Name of the hotel'
        },
        {
          name: 'HotelID',
          type: 'string',
          description: 'Unique identifier for the hotel'
        },
        {
          name: 'GuestEmail',
          type: 'string',
          description: 'Email address of the guest'
        },
        {
          name: 'GuestFirst',
          type: 'string',
          description: 'First name of the guest'
        },
        {
          name: 'GuestLast',
          type: 'string',
          description: 'Last name of the guest'
        },
        {
          name: 'CCLastFour',
          type: 'string',
          description: 'Last four digits of the credit card used'
        },
        {
          name: 'CCName',
          type: 'string',
          description: 'Name on the credit card'
        },
        {
          name: 'GuestPhone',
          type: 'string',
          description: 'Phone number of the guest'
        },
        {
          name: 'BillingAddress',
          type: 'string',
          description: 'Billing address'
        },
        {
          name: 'BillingCity',
          type: 'string',
          description: 'Billing city'
        },
        {
          name: 'BillingRegion',
          type: 'string',
          description: 'Billing state/region'
        },
        {
          name: 'BillingPostal',
          type: 'string',
          description: 'Billing postal code'
        },
        {
          name: 'BillingCountry',
          type: 'string',
          description: 'Billing country code'
        },
        {
          name: 'EmployeeId',
          type: 'string',
          description: 'Employee identifier (if applicable)'
        }
      ]}
      testProduction={{
        title: 'Test x Production',
        description: 'No differences between the test and production responses have been identified to date; this status may change at any time and will be updated accordingly.',
        differences: []
      }}
      codeExamples={[
        {
          language: 'bash',
          label: 'cURL',
          code: `curl -X GET "https://api.travsrv.com/api/guests?type=reservationsByLocator&siteid=64&reservationLocator=8043627a-9bda-41bd-8026-65b61a442c75&_type=json" \\
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
    "type": "reservationsByLocator",
    "siteid": "64",
    "reservationLocator": "8043627a-9bda-41bd-8026-65b61a442c75",
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
  type: "reservationsByLocator",
  siteid: "64",
  reservationLocator: "8043627a-9bda-41bd-8026-65b61a442c75",
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
    "type" => "reservationsByLocator",
    "siteid" => "64",
    "reservationLocator" => "8043627a-9bda-41bd-8026-65b61a442c75",
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
    </EndpointPage>
  );
};

export default ItineraryByLocator;
