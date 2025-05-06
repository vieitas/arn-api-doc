import React from 'react';
import EndpointPage from '../../../components/endpoints/EndpointPage';

const ReservationCancellation: React.FC = () => {
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
  ];

  return (
    <EndpointPage
      title="Reservation Cancellation"
      description="Cancel an existing hotel reservation"
      sections={sections}
      endpoint={{
        method: 'POST',
        url: 'https://api.travsrv.com/api/hotel?type=cancellation',
        id: 'reservation-cancellation',
        category: 'hotel',
        endpointDescription: "This endpoint is used to cancel a previously submitted reservation. If the request succeeds, you'll receive a CancellationID indicating success. Should a cancellation be in conflict with the hotel's cancellation policy, it will fail. If the request fails, you'll need to present the guest with whatever options for customer service you have to allow the issue to be resolved manually.",
        requestDescription: "This section details the parameters and format for making requests to the Reservation Cancellation endpoint."
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
        // URL Parameters
        {
          name: 'type',
          type: 'string',
          required: true,
          description: 'Must be set to "cancellation"',
          example: 'cancellation',
          section: 'URL Parameters'
        },
        {
          name: 'siteid',
          type: 'integer',
          required: true,
          description: 'Site reservation was created under (64 for testing)',
          example: '64',
          section: 'URL Parameters'
        },
        {
          name: '_type',
          type: 'string',
          required: false,
          description: 'Default: json. Format of API response, formats available are \'json\' and \'xml\'',
          example: 'json',
          section: 'URL Parameters'
        },

        // Form Data Parameters
        {
          name: 'reservationId',
          type: 'string',
          required: true,
          description: 'Reservation ID returned during reservation creation',
          example: '12945140',
          section: 'Form Data Parameters'
        },
        {
          name: 'itineraryId',
          type: 'string',
          required: true,
          description: 'Itinerary ID returned during reservation creation',
          example: '12896805',
          section: 'Form Data Parameters'
        }
      ]}
      requestExample={{
        url: 'https://api.travsrv.com/api/hotel?type=cancellation&siteid=64&_type=json',
        method: 'POST',
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
            value: 'application/x-www-form-urlencoded'
          },
          {
            name: 'Accept-version',
            value: '2'
          },
          {
            name: 'Authorization',
            value: 'Basic YOUR_BASE64_ENCODED_CREDENTIALS'
          }
        ],
        body: 'reservationId=12955221&itineraryId=12907054'
      }}
      responseExample={{
        status: 200,
        body: `{
  "ArnResponse": {
    "Info": {
      "@SiteID": "64",
      "@Username": "publictest",
      "@IpAddress": "10.172.12.220",
      "@TimeReceived": "2025-04-27T04:00:27.650",
      "@TimeCompleted": "2025-04-27T04:00:28.116",
      "@Version": "2",
      "@ServiceUrl": "http://api.travsrv.com/api/hotel?_type=json&siteid=64&type=cancellation",
      "@RequestID": "C47AC46D-CB4B-491D-9130-7A88BB21446A",
      "@ReturnedRateCount": "1"
    },
    "Cancellation": {
      "@DisplayCurrency": "USD",
      "@ItineraryID": "12907054",
      "HotelCancellation": {
        "@Success": "true",
        "@CancelGMT": "2025-04-26T21:00:27.806",
        "@CancellationID": "KGuvCkOo30",
        "@InDate": "2025-06-15",
        "@OutDate": "2025-06-20",
        "@Rooms": "1",
        "@Adults": "2",
        "@Children": "0",
        "@ReservationID": "12955221",
        "@CustomerConfirmationNumber": "987618",
        "@ReservationLocator": "1286894",
        "Hotel": {
          "@HotelID": "34853",
          "@HotelName": "Bryan's Spanish Cove",
          "@HotelCountry": "US",
          "@HotelPostal": "32821",
          "@HotelCity": "Orlando",
          "@HotelState": "FL"
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
          name: '@ReturnedRateCount',
          type: 'string',
          section: 'Info Object',
          description: 'Number of rates returned in the response'
        },

        // Cancellation Object
        {
          name: 'Cancellation',
          type: 'object',
          section: 'Cancellation Object',
          description: 'Contains information about the cancellation'
        },
        {
          name: '@DisplayCurrency',
          type: 'string',
          section: 'Cancellation Object',
          description: 'Currency used for display purposes'
        },
        {
          name: '@ItineraryID',
          type: 'string',
          section: 'Cancellation Object',
          description: 'Unique identifier for the itinerary that was cancelled'
        },

        // HotelCancellation Object
        {
          name: 'HotelCancellation',
          type: 'object',
          section: 'Cancellation.HotelCancellation Object',
          description: 'Contains detailed information about the hotel cancellation'
        },
        {
          name: '@Success',
          type: 'string',
          section: 'Cancellation.HotelCancellation Object',
          description: 'Indicates if the cancellation was successful ("true" or "false")'
        },
        {
          name: '@CancelGMT',
          type: 'string',
          section: 'Cancellation.HotelCancellation Object',
          description: 'Date and time when the cancellation was processed (in GMT)'
        },
        {
          name: '@CancellationID',
          type: 'string',
          section: 'Cancellation.HotelCancellation Object',
          description: 'Unique identifier for the cancellation'
        },
        {
          name: '@InDate',
          type: 'string',
          section: 'Cancellation.HotelCancellation Object',
          description: 'Check-in date of the cancelled reservation'
        },
        {
          name: '@OutDate',
          type: 'string',
          section: 'Cancellation.HotelCancellation Object',
          description: 'Check-out date of the cancelled reservation'
        },
        {
          name: '@Rooms',
          type: 'string',
          section: 'Cancellation.HotelCancellation Object',
          description: 'Number of rooms in the cancelled reservation'
        },
        {
          name: '@Adults',
          type: 'string',
          section: 'Cancellation.HotelCancellation Object',
          description: 'Number of adults in the cancelled reservation'
        },
        {
          name: '@Children',
          type: 'string',
          section: 'Cancellation.HotelCancellation Object',
          description: 'Number of children in the cancelled reservation'
        },
        {
          name: '@ReservationID',
          type: 'string',
          section: 'Cancellation.HotelCancellation Object',
          description: 'Unique identifier for the reservation that was cancelled'
        },
        {
          name: '@CustomerConfirmationNumber',
          type: 'string',
          section: 'Cancellation.HotelCancellation Object',
          description: 'Confirmation number provided to the guest'
        },
        {
          name: '@ReservationLocator',
          type: 'string',
          section: 'Cancellation.HotelCancellation Object',
          description: 'Reservation locator for the cancelled reservation'
        },

        // Hotel Object
        {
          name: 'Hotel',
          type: 'object',
          section: 'Cancellation.HotelCancellation.Hotel Object',
          description: 'Contains information about the hotel'
        },
        {
          name: '@HotelID',
          type: 'string',
          section: 'Cancellation.HotelCancellation.Hotel Object',
          description: 'Unique identifier for the hotel'
        },
        {
          name: '@HotelName',
          type: 'string',
          section: 'Cancellation.HotelCancellation.Hotel Object',
          description: 'Name of the hotel'
        },
        {
          name: '@HotelCountry',
          type: 'string',
          section: 'Cancellation.HotelCancellation.Hotel Object',
          description: 'Country code of the hotel'
        },
        {
          name: '@HotelPostal',
          type: 'string',
          section: 'Cancellation.HotelCancellation.Hotel Object',
          description: 'Postal code of the hotel'
        },
        {
          name: '@HotelCity',
          type: 'string',
          section: 'Cancellation.HotelCancellation.Hotel Object',
          description: 'City of the hotel'
        },
        {
          name: '@HotelState',
          type: 'string',
          section: 'Cancellation.HotelCancellation.Hotel Object',
          description: 'State/province of the hotel'
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
          code: `curl -X POST "https://api.travsrv.com/api/hotel?type=cancellation&siteid=64&_type=json" \\
  -H "Site-Id: YOUR_SITE_ID" \\
  -H "API-ClientUsername: YOUR_USERNAME" \\
  -H "API-ClientPassword: YOUR_PASSWORD" \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -H "Accept-version: 2" \\
  -H "Authorization: Basic" # Base64 encoded username:password \\
  -d "reservationId=12945140&itineraryId=12896805"`
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
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept-version": "2",
    "Authorization": "Basic YOUR_BASE64_ENCODED_CREDENTIALS"  # Base64 encoded username:password
}

# URL parameters
params = {
    "type": "cancellation",
    "siteid": "64",
    "_type": "json"
}

# Form data
data = {
    "reservationId": "12945140",
    "itineraryId": "12896805"
}

# Make a request
response = requests.post(
    "https://api.travsrv.com/api/hotel",
    headers=headers,
    params=params,
    data=data
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
  "Content-Type": "application/x-www-form-urlencoded",
  "Accept-version": "2",
  "Authorization": "Basic YOUR_BASE64_ENCODED_CREDENTIALS"  // Base64 encoded username:password
};

const params = {
  type: "cancellation",
  siteid: "64",
  _type: "json"
};

const formData = new URLSearchParams();
formData.append("reservationId", "12945140");
formData.append("itineraryId", "12896805");

axios.post("https://api.travsrv.com/api/hotel", formData, {
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
    "type" => "cancellation",
    "siteid" => "64",
    "_type" => "json"
];
$url = $baseUrl . "?" . http_build_query($params);

$headers = [
    "Site-Id: YOUR_SITE_ID",
    "API-ClientUsername: YOUR_USERNAME",
    "API-ClientPassword: YOUR_PASSWORD",
    "Content-Type: application/x-www-form-urlencoded",
    "Accept-version: 2"
];

$postData = [
    "reservationId" => "12945140",
    "itineraryId" => "12896805"
];

$curl = curl_init($url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($postData));
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

export default ReservationCancellation;
