import React from 'react';
import EndpointPage from '../../../components/endpoints/EndpointPage';

const FeaturedLocationDeals: React.FC = () => {
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
      title="Featured Location Deals"
      description="Get the best market locations with amazing deals"
      sections={sections}
      endpoint={{
        method: 'GET',
        url: 'https://api.travsrv.com/api/content/findfeaturedlocationdeals',
        id: 'featured-location-deals',
        category: 'content',
        endpointDescription: "This endpoint is used to retrieve the best market locations with amazing deals. It returns a list of locations with special discounts and deals available for the specified dates.",
        requestDescription: "This section details the parameters and format for making requests to the Featured Location Deals endpoint.",
        requestParametersDescription: "The request includes the following parameters:",
        testVsProduction: "The response structure and data are identical in both test and production environments for this endpoint. No additional fields or data variations were observed between environments."
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
          name: 'checkIn',
          type: 'string',
          required: true,
          description: 'Check-in date in YYYY-MM-DD format',
          example: '2025-05-23'
        },
        {
          name: 'checkOut',
          type: 'string',
          required: true,
          description: 'Check-out date in YYYY-MM-DD format',
          example: '2025-05-24'
        },
        {
          name: 'maxresults',
          type: 'integer',
          required: false,
          description: 'Maximum number of results to return',
          example: '5'
        },
        {
          name: 'mindiscount',
          type: 'integer',
          required: false,
          description: 'Minimum discount percentage to filter results',
          example: '10'
        },
        {
          name: 'maxdiscount',
          type: 'integer',
          required: false,
          description: 'Maximum discount percentage to filter results',
          example: '50'
        },
        {
          name: 'iscondo',
          type: 'boolean',
          required: false,
          description: 'Filter for condominium properties',
          example: 'false'
        },
        {
          name: 'allinclusive',
          type: 'boolean',
          required: false,
          description: 'Filter for all-inclusive properties',
          example: 'false'
        },
        {
          name: 'currency',
          type: 'string',
          required: false,
          description: 'Default: "USD". Currency code (e.g., "USD", "EUR", "CAD")',
          example: 'USD'
        },
        {
          name: 'country',
          type: 'string',
          required: false,
          description: 'Country code to restrict deals',
          example: 'US'
        },
        {
          name: 'state',
          type: 'string',
          required: false,
          description: 'State to restrict deals',
          example: 'FL'
        },
        {
          name: 'locationids',
          type: 'string',
          required: false,
          description: 'Comma-separated list of location IDs to include. These IDs can be pulled using typeahead API',
          example: '1,4'
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
        url: 'https://api.travsrv.com/api/content/findfeaturedlocationdeals?checkIn=2025-05-23&checkOut=2025-05-24&maxresults=5&_type=json',
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
        body: `[
  {
    "AvgDiscountPercent": 53.0,
    "AvgNightlyPrice": 201.74,
    "AvgNightlyPriceCurrency": "USD",
    "DealProperties": 6,
    "DealsFound": 152,
    "DealWeight": 8056,
    "LocationCountry": "SX",
    "LocationId": 29805,
    "LocationImageUrl": "//media.travsrv.com/images/741350/1132913575_804480.jpg",
    "LocationImageUrlHighRes": "//media.travsrv.com/images/741350/1132913575_0.jpg",
    "LocationLatitude": 18.0385649,
    "LocationLongitude": -63.1163276,
    "LocationName": "Simpson Bay, Sint Maarten",
    "MaxDiscountPercent": 75.0
  }
]`
      }}

      responseParameters={[
        {
          name: 'AvgDiscountPercent',
          type: 'float',
          description: 'Average discount percentage across all deals'
        },
        {
          name: 'AvgNightlyPrice',
          type: 'float',
          description: 'Average nightly price for properties in this location'
        },
        {
          name: 'AvgNightlyPriceCurrency',
          type: 'string',
          description: 'Currency code for the average nightly price'
        },
        {
          name: 'DealProperties',
          type: 'integer',
          description: 'Number of properties with deals in this location'
        },
        {
          name: 'DealsFound',
          type: 'integer',
          description: 'Total number of deals found in this location'
        },
        {
          name: 'DealWeight',
          type: 'integer',
          description: 'Weight/importance of the deals (used for sorting)'
        },
        {
          name: 'LocationCountry',
          type: 'string',
          description: 'Country code where the location is situated'
        },
        {
          name: 'LocationId',
          type: 'integer',
          description: 'Unique identifier for the location'
        },
        {
          name: 'LocationImageUrl',
          type: 'string',
          description: 'URL to an image representing the location'
        },
        {
          name: 'LocationImageUrlHighRes',
          type: 'string',
          description: 'URL to a high-resolution image representing the location'
        },
        {
          name: 'LocationLatitude',
          type: 'float',
          description: 'Latitude coordinate of the location'
        },
        {
          name: 'LocationLongitude',
          type: 'float',
          description: 'Longitude coordinate of the location'
        },
        {
          name: 'LocationName',
          type: 'string',
          description: 'Name of the location'
        },
        {
          name: 'MaxDiscountPercent',
          type: 'float',
          description: 'Maximum discount percentage available'
        }
      ]}
      codeExamples={[
        {
          language: 'bash',
          label: 'cURL',
          code: `curl -X GET "https://api.travsrv.com/api/content/findfeaturedlocationdeals?checkIn=2025-05-23&checkOut=2025-05-24&maxresults=5&_type=json" \\
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
    "checkIn": "2025-05-23",
    "checkOut": "2025-05-24",
    "maxresults": "5",
    "_type": "json"
}

# Make a request
response = requests.get(
    "https://api.travsrv.com/api/content/findfeaturedlocationdeals",
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
  checkIn: "2025-05-23",
  checkOut: "2025-05-24",
  maxresults: "5",
  _type: "json"
};

axios.get("https://api.travsrv.com/api/content/findfeaturedlocationdeals", {
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
$baseUrl = "https://api.travsrv.com/api/content/findfeaturedlocationdeals";
$params = [
    "checkIn" => "2025-05-23",
    "checkOut" => "2025-05-24",
    "maxresults" => "5",
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
    />
  );
};

export default FeaturedLocationDeals;
