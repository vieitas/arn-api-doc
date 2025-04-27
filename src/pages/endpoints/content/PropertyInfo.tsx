import React from 'react';
import EndpointPage from '../../../components/endpoints/EndpointPage';

const PropertyInfo: React.FC = () => {
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
      title="Property Info"
      description="Get detailed information about a specific property"
      sections={sections}
      endpoint={{
        method: 'GET',
        url: 'https://api.travsrv.com/api/content/findpropertyinfo',
        id: 'property-info',
        category: 'content',
        endpointDescription: "This endpoint is used to retrieve detailed information about a specific property, including amenities, images, location details, and property descriptions.",
        requestDescription: "This section details the parameters and format for making requests to the Property Info endpoint.",
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
          name: 'propertyid',
          type: 'integer',
          required: true,
          description: 'The unique identifier of the property to retrieve information for',
          example: '1090185'
        },
        {
          name: 'locale',
          type: 'string',
          required: false,
          description: 'Language code for the response (e.g., "en" for English)',
          example: 'en'
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
        url: 'https://api.travsrv.com/api/content/findpropertyinfo?propertyid=1090185&locale=en&_type=json',
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
  "AmenityList": [
    "Airport Shuttle (For a fee)",
    "Picnic Area (On Site)",
    "terrace (On Site)",
    "Wireless Internet Access in guest rooms (Complimentary)"
  ],
  "AmenitySearchIcons": [
    "breakfast_off",
    "cocktails_off",
    "internet_on",
    "shuttle_on",
    "workout_off",
    "pets_off",
    "phone_off",
    "pool_off",
    "restaurant_off",
    "kitchen_off"
  ],
  "Images": [
    {
      "DisplayOrder": 2,
      "ImageCaption": "Primary image",
      "ImagePath": "https://media.travsrv.com/images/1090185/19032240_300.jpg",
      "ImageThumbnailPath": "https://media.travsrv.com/images/1090185/19032240_70.jpg"
    },
    {
      "DisplayOrder": 2,
      "ImageCaption": "Exterior",
      "ImagePath": "https://media.travsrv.com/images/1090185/19032264_300.jpg",
      "ImageThumbnailPath": "https://media.travsrv.com/images/1090185/19032264_70.jpg"
    },
    {
      "DisplayOrder": 2,
      "ImageCaption": "Exterior",
      "ImagePath": "https://media.travsrv.com/images/1090185/19032277_300.jpg",
      "ImageThumbnailPath": "https://media.travsrv.com/images/1090185/19032277_70.jpg"
    }
  ],
  "TripAdvisorPartnerLocationId": 1017033,
  "PropertyId": 1090185,
  "Address1": "Pediados",
  "Address2": "",
  "BrandCode": null,
  "CheckInTime": "2:00 PM",
  "CheckOutTime": "12:00 PM",
  "City": "Minoa Pediada",
  "CountryCode": "GR",
  "DistanceFrom": -1.0,
  "Email": "",
  "ImageThumbnail": "https://media.travsrv.com/images/1090185/19032287_70.jpg",
  "Latitude": 35.20575,
  "LocationDescription": "",
  "LocationId": 16778,
  "Longitude": 25.35981,
  "Name": "Oikies Lyttos",
  "NumFloors": "0",
  "NumRooms": "2",
  "PercentMatch": 0,
  "Postal": "70006",
  "PriceClass": "1 Star",
  "PrimaryPhone": "30-6948165245",
  "PropertyDescription": "With a stay at Oikies Lyttos in Minoa Pediada, you'll be 12.7 mi (20.4 km) from Star Beach Water Park and 15.3 mi (24.7 km) from Stalis Beach. This guesthouse is 9 mi (14.5 km) from Crete Golf Club and 13 mi (20.9 km) from Convention Centre Creta Maris.",
  "PropertyType": "Vac. Rental",
  "RatingImageUrl": "https://media.travsrv.com/appSkins/64/v6/themes/standard/images/ratings/star-rating-four.png?v=4",
  "State": "",
  "TripAdvisorRating": 4.0,
  "RoundedTripRating": null,
  "TripAdvisorReviewCount": 1,
  "ContinentPoiId": 0,
  "YearBuilt": "",
  "YearOfLastRenov": "N/A",
  "PropertyPolicy": "",
  "ExpediaPolicy": ""
}`
      }}

      responseParameters={[
        // Root Level Properties in exact order of response
        {
          name: 'AmenityList',
          type: 'array',
          description: 'List of amenities available at the property',
          section: 'Root Properties'
        },
        {
          name: 'AmenitySearchIcons',
          type: 'array',
          description: 'Icons representing amenity categories (on/off status)',
          section: 'Root Properties'
        },
        {
          name: 'Images',
          type: 'array',
          description: 'Collection of property images with captions and URLs',
          section: 'Root Properties'
        },
        {
          name: 'TripAdvisorPartnerLocationId',
          type: 'integer',
          description: 'TripAdvisor partner location identifier',
          section: 'Root Properties'
        },
        {
          name: 'PropertyId',
          type: 'integer',
          description: 'Unique identifier for the property',
          section: 'Root Properties'
        },
        {
          name: 'Address1',
          type: 'string',
          description: 'Primary address line',
          section: 'Root Properties'
        },
        {
          name: 'Address2',
          type: 'string',
          description: 'Secondary address line (if available)',
          section: 'Root Properties'
        },
        {
          name: 'BrandCode',
          type: 'string',
          description: 'Code identifying the hotel brand (if applicable)',
          section: 'Root Properties'
        },
        {
          name: 'CheckInTime',
          type: 'string',
          description: 'Standard check-in time',
          section: 'Root Properties'
        },
        {
          name: 'CheckOutTime',
          type: 'string',
          description: 'Standard check-out time',
          section: 'Root Properties'
        },
        {
          name: 'City',
          type: 'string',
          description: 'City where the property is located',
          section: 'Root Properties'
        },
        {
          name: 'CountryCode',
          type: 'string',
          description: 'Two-letter country code',
          section: 'Root Properties'
        },
        {
          name: 'DistanceFrom',
          type: 'float',
          description: 'Distance from a reference point (in miles)',
          section: 'Root Properties'
        },
        {
          name: 'Email',
          type: 'string',
          description: 'Contact email address',
          section: 'Root Properties'
        },
        {
          name: 'ImageThumbnail',
          type: 'string',
          description: 'URL to the thumbnail image of the property',
          section: 'Root Properties'
        },
        {
          name: 'Latitude',
          type: 'float',
          description: 'Geographic latitude coordinate',
          section: 'Root Properties'
        },
        {
          name: 'LocationDescription',
          type: 'string',
          description: 'Description of the property location',
          section: 'Root Properties'
        },
        {
          name: 'LocationId',
          type: 'integer',
          description: 'Identifier for the location of the property',
          section: 'Root Properties'
        },
        {
          name: 'Longitude',
          type: 'float',
          description: 'Geographic longitude coordinate',
          section: 'Root Properties'
        },
        {
          name: 'Name',
          type: 'string',
          description: 'Property name',
          section: 'Root Properties'
        },
        {
          name: 'NumFloors',
          type: 'string',
          description: 'Number of floors in the property',
          section: 'Root Properties'
        },
        {
          name: 'NumRooms',
          type: 'string',
          description: 'Number of rooms in the property',
          section: 'Root Properties'
        },
        {
          name: 'PercentMatch',
          type: 'integer',
          description: 'Percentage match to search criteria',
          section: 'Root Properties'
        },
        {
          name: 'Postal',
          type: 'string',
          description: 'Postal or ZIP code',
          section: 'Root Properties'
        },
        {
          name: 'PriceClass',
          type: 'string',
          description: 'Star rating or price category',
          section: 'Root Properties'
        },
        {
          name: 'PrimaryPhone',
          type: 'string',
          description: 'Primary contact phone number',
          section: 'Root Properties'
        },
        {
          name: 'PropertyDescription',
          type: 'string',
          description: 'Detailed description of the property',
          section: 'Root Properties'
        },
        {
          name: 'PropertyType',
          type: 'string',
          description: 'Type of property (e.g., Hotel, Resort, Vacation Rental)',
          section: 'Root Properties'
        },
        {
          name: 'RatingImageUrl',
          type: 'string',
          description: 'URL to the image representing the property rating',
          section: 'Root Properties'
        },
        {
          name: 'State',
          type: 'string',
          description: 'State or province where the property is located',
          section: 'Root Properties'
        },
        {
          name: 'TripAdvisorRating',
          type: 'float',
          description: 'TripAdvisor rating (if available)',
          section: 'Root Properties'
        },
        {
          name: 'RoundedTripRating',
          type: 'float',
          description: 'Rounded TripAdvisor rating',
          section: 'Root Properties'
        },
        {
          name: 'TripAdvisorReviewCount',
          type: 'integer',
          description: 'Number of TripAdvisor reviews',
          section: 'Root Properties'
        },
        {
          name: 'ContinentPoiId',
          type: 'integer',
          description: 'Continent point of interest identifier',
          section: 'Root Properties'
        },
        {
          name: 'YearBuilt',
          type: 'string',
          description: 'Year the property was built',
          section: 'Root Properties'
        },
        {
          name: 'YearOfLastRenov',
          type: 'string',
          description: 'Year of the last renovation',
          section: 'Root Properties'
        },
        {
          name: 'PropertyPolicy',
          type: 'string',
          description: 'Property policies and rules',
          section: 'Root Properties'
        },
        {
          name: 'ExpediaPolicy',
          type: 'string',
          description: 'Expedia-specific policies for the property',
          section: 'Root Properties'
        },

        // Images Object Properties
        {
          name: 'DisplayOrder',
          type: 'integer',
          description: 'Order in which the image should be displayed',
          section: 'Images Object'
        },
        {
          name: 'ImageCaption',
          type: 'string',
          description: 'Caption or description of the image',
          section: 'Images Object'
        },
        {
          name: 'ImagePath',
          type: 'string',
          description: 'URL to the full-size image',
          section: 'Images Object'
        },
        {
          name: 'ImageThumbnailPath',
          type: 'string',
          description: 'URL to the thumbnail version of the image',
          section: 'Images Object'
        }
      ]}
      codeExamples={[
        {
          language: 'bash',
          label: 'cURL',
          code: `curl -X GET "https://api.travsrv.com/api/content/findpropertyinfo?propertyid=1090185&locale=en&_type=json" \\
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
    "propertyid": "1090185",
    "locale": "en",
    "_type": "json"
}

# Make a request
response = requests.get(
    "https://api.travsrv.com/api/content/findpropertyinfo",
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
  propertyid: "1090185",
  locale: "en",
  _type: "json"
};

axios.get("https://api.travsrv.com/api/content/findpropertyinfo", {
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
$baseUrl = "https://api.travsrv.com/api/content/findpropertyinfo";
$params = [
    "propertyid" => "1090185",
    "locale" => "en",
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
curl_setopt($curl, CURLOPT_USERPWD, "YOUR_USERNAME:YOUR_PASSWORD"); // Basic authentication

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

export default PropertyInfo;
