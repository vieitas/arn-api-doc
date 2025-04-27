import React from 'react';
import EndpointPage from '../../../components/endpoints/EndpointPage';

const FeaturedHotelDeals: React.FC = () => {
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
      title="Featured Hotel Deals"
      description="Get featured hotel deals for a particular market location"
      sections={sections}
      endpoint={{
        method: 'GET',
        url: 'https://api.travsrv.com/api/content/findfeaturedhoteldeals',
        id: 'featured-hotel-deals',
        category: 'content',
        endpointDescription: "This endpoint is used to retrieve featured hotel deals for a particular market location. It returns a list of hotels with special discounts and deals available for the specified dates.",
        requestDescription: "This section details the parameters and format for making requests to the Featured Hotel Deals endpoint.",
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
          name: 'locationid',
          type: 'integer',
          required: true,
          description: 'Location ID to search for deals (can be obtained from Typeahead API)',
          example: '1'
        },
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
          name: 'maxresults',
          type: 'integer',
          required: false,
          description: 'Maximum number of results to return',
          example: '5'
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
          name: 'minproprating',
          type: 'integer',
          required: false,
          description: 'Minimum property star rating',
          example: '3'
        },
        {
          name: 'mintriprating',
          type: 'integer',
          required: false,
          description: 'Minimum TripAdvisor rating',
          example: '4'
        },
        {
          name: 'currency',
          type: 'string',
          required: false,
          description: 'Currency code (e.g., "USD", "EUR"). Default: "USD"',
          example: 'USD'
        },
        {
          name: 'propertyids',
          type: 'string',
          required: false,
          description: 'Comma-separated list of property IDs to include',
          example: '279997,280001'
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
          name: 'locationex',
          type: 'string',
          required: false,
          description: 'Comma-separated list of location IDs to exclude',
          example: '2,3'
        },
        {
          name: 'locationids',
          type: 'string',
          required: false,
          description: 'Comma-separated list of location IDs to include',
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
        url: 'https://api.travsrv.com/api/content/findfeaturedhoteldeals?locationid=1&checkIn=2025-05-23&checkOut=2025-05-24&maxresults=5&_type=json',
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
    "PropertyId": 279997,
    "DealsFound": 1,
    "DealWeight": 37,
    "MaxDiscountPercent": 37.0,
    "AvgDiscountPercent": 37.0,
    "ReferencePrice": 159.14,
    "ReferencePriceCurrency": "USD",
    "PropertyName": "The Casa Hotel",
    "PropertyAddress": "Handford Lane, Yateley,  GB",
    "LocationId": 1,
    "PropertyLatitude": 51.332615,
    "PropertyLongitude": -0.825005,
    "PropertyImageUrl": "//media.travsrv.com/images/279997/947455846_804480.jpg",
    "PropertyImageUrlHighRes": "//media.travsrv.com/images/279997/947455846_0.jpg",
    "PropertyRating": "3 Stars",
    "TripAdvisorRating": 4.0,
    "TripAdvisorReviewCount": 438,
    "RatingImageUrl": "//media.travsrv.com/appSkins/64/v6/themes/standard/images/ratings/star-rating-four.png?v=4",
    "CheckIn": null,
    "CheckOut": null
  }
]`
      }}

      responseParameters={[
        {
          name: 'PropertyId',
          type: 'integer',
          description: 'Unique identifier for the property'
        },
        {
          name: 'DealsFound',
          type: 'integer',
          description: 'Number of deals found for this property'
        },
        {
          name: 'DealWeight',
          type: 'integer',
          description: 'Weight/importance of the deal (used for sorting)'
        },
        {
          name: 'MaxDiscountPercent',
          type: 'float',
          description: 'Maximum discount percentage available'
        },
        {
          name: 'AvgDiscountPercent',
          type: 'float',
          description: 'Average discount percentage across all deals'
        },
        {
          name: 'ReferencePrice',
          type: 'float',
          description: 'Reference price for the property'
        },
        {
          name: 'ReferencePriceCurrency',
          type: 'string',
          description: 'Currency code for the reference price'
        },
        {
          name: 'PropertyName',
          type: 'string',
          description: 'Name of the property'
        },
        {
          name: 'PropertyAddress',
          type: 'string',
          description: 'Address of the property'
        },
        {
          name: 'LocationId',
          type: 'integer',
          description: 'Location identifier'
        },
        {
          name: 'PropertyLatitude',
          type: 'float',
          description: 'Geographic latitude coordinate'
        },
        {
          name: 'PropertyLongitude',
          type: 'float',
          description: 'Geographic longitude coordinate'
        },
        {
          name: 'PropertyImageUrl',
          type: 'string',
          description: 'URL to the property image'
        },
        {
          name: 'PropertyImageUrlHighRes',
          type: 'string',
          description: 'URL to the high-resolution property image'
        },
        {
          name: 'PropertyRating',
          type: 'string',
          description: 'Star rating of the property'
        },
        {
          name: 'TripAdvisorRating',
          type: 'float',
          description: 'TripAdvisor rating (if available)'
        },
        {
          name: 'TripAdvisorReviewCount',
          type: 'integer',
          description: 'Number of TripAdvisor reviews'
        },
        {
          name: 'RatingImageUrl',
          type: 'string',
          description: 'URL to the rating image'
        },
        {
          name: 'CheckIn',
          type: 'string',
          description: 'Check-in date (if specified)'
        },
        {
          name: 'CheckOut',
          type: 'string',
          description: 'Check-out date (if specified)'
        }
      ]}
      codeExamples={[
        {
          language: 'bash',
          label: 'cURL',
          code: `curl -X GET "https://api.travsrv.com/api/content/findfeaturedhoteldeals?locationid=1&checkIn=2025-05-23&checkOut=2025-05-24&maxresults=5&_type=json" \\
  -H "Site-Id: YOUR_SITE_ID" \\
  -H "API-ClientUsername: YOUR_USERNAME" \\
  -H "API-ClientPassword: YOUR_PASSWORD" \\
  -H "Content-Type: application/json" \\
  -H "Accept-version: 2" \\
  -H "Authorization: Basic YOUR_BASE64_ENCODED_CREDENTIALS" # Base64 encoded username:password`
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
    "locationid": "1",
    "checkIn": "2025-05-23",
    "checkOut": "2025-05-24",
    "maxresults": "5",
    "_type": "json"
}

# Make a request
response = requests.get(
    "https://api.travsrv.com/api/content/findfeaturedhoteldeals",
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
  locationid: "1",
  checkIn: "2025-05-23",
  checkOut: "2025-05-24",
  maxresults: "5",
  _type: "json"
};

axios.get("https://api.travsrv.com/api/content/findfeaturedhoteldeals", {
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
$baseUrl = "https://api.travsrv.com/api/content/findfeaturedhoteldeals";
$params = [
    "locationid" => "1",
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

export default FeaturedHotelDeals;
