import { Endpoint } from '../types';

export const typeaheadEndpoints: Endpoint[] = [
  {
    id: 'city-search',
    title: 'City Search',
    description: 'Search for cities for use in typeahead systems',
    method: 'GET',
    url: 'https://api.travsrv.com/api/widget?type=cities',
    category: 'typeahead',
    headers: [
      {
        name: 'Site-Id',
        type: 'string',
        required: "Yes",
        description: ''
      },
      {
        name: 'API-ClientUsername',
        type: 'string',
        required: "Yes",
        description: ''
      },
      {
        name: 'API-ClientPassword',
        type: 'string',
        required: "Yes",
        description: ''
      },
      {
        name: 'Content-Type',
        type: 'string',
        required: "Yes",
        description: '',
        example: 'application/json'
      },
      {
        name: 'Accept-version',
        type: 'string',
        required: "No",
        description: '',
        example: '2'
      },
      {
        name: 'Authorization',
        type: 'string',
        required: "Yes",
        description: '',
        example: 'Basic (Base64 encoded username:password)'
      }
    ],
    requestParameters: [
      {
        name: 'type',
        type: 'string',
        required: true,
        description: 'Must be "cities" for this endpoint'
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: 'Maximum number of results to return. Default: 10'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Text to search for cities (partial or complete name). Must be at least 2 characters long.'
      }
    ],
    requestExample: `GET /api/widget?type=cities&count=10&name=Orla HTTP/1.1
Host: api.travsrv.com
Site-Id: YOUR_SITE_ID
API-ClientUsername: YOUR_USERNAME
API-ClientPassword: YOUR_PASSWORD
Content-Type: application/json
Accept-version: 2
Authorization: Basic YOUR_BASE64_ENCODED_CREDENTIALS`,
    responseExample: `[
  {
    "LocationId": 7151,
    "Name": "Orlando, FL",
    "NumberOfHotels": 693
  },
  {
    "LocationId": 31812,
    "Name": "Orland, Norway",
    "NumberOfHotels": 20
  },
  {
    "LocationId": 3073,
    "Name": "Orland Park, IL",
    "NumberOfHotels": 3
  },
  {
    "LocationId": 3073,
    "Name": "Orland Pk, IL",
    "NumberOfHotels": 3
  },
  {
    "LocationId": 22167,
    "Name": "Orland, CA",
    "NumberOfHotels": 1
  },
  {
    "LocationId": 52307,
    "Name": "Orlando West, Soweto, Gauteng, South Africa",
    "NumberOfHotels": 1
  },
  {
    "LocationId": 28553,
    "Name": "ORLA II, Brazil",
    "NumberOfHotels": 0
  },
  {
    "LocationId": 42464,
    "Name": "Orland Hills, Tinley Park, Illinois, United States of America",
    "NumberOfHotels": 0
  },
  {
    "LocationId": 52701,
    "Name": "Orlando East, Soweto, Gauteng, South Africa",
    "NumberOfHotels": 0
  },
  {
    "LocationId": 68581,
    "Name": "Orlando Heights, Port Orange, Florida, United States of America",
    "NumberOfHotels": 0
  }
]`,
    responseParameters: [
      {
        name: 'LocationId',
        type: 'integer',
        required: true,
        description: 'Unique identifier for the location, used in subsequent availability searches'
      },
      {
        name: 'Name',
        type: 'string',
        required: true,
        description: 'City name, including state/province/country information when applicable'
      },
      {
        name: 'NumberOfHotels',
        type: 'integer',
        required: true,
        description: 'Number of hotels available in this location'
      }
    ],
    testVsProduction: 'The response structure and data are identical in both test and production environments for this endpoint. No additional fields or data variations were observed between environments.',
    errorCodes: [
      {
        code: '400',
        message: 'Bad Request',
        description: 'Invalid request (missing or invalid parameters)'
      },
      {
        code: '401',
        message: 'Unauthorized',
        description: 'Unauthorized (invalid credentials)'
      },
      {
        code: '404',
        message: 'Not Found',
        description: 'No cities found'
      },
      {
        code: '429',
        message: 'Too Many Requests',
        description: 'Too many requests (rate limit exceeded)'
      },
      {
        code: '500',
        message: 'Internal Server Error',
        description: 'Internal server error'
      }
    ],
    codeExamples: [
      {
        language: 'bash',
        label: 'cURL',
        code: `curl -X GET "https://api.travsrv.com/api/widget?type=cities&count=10&name=Orla" \\
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
    "type": "cities",
    "count": "10",
    "name": "Orla"
}

# Make a request
response = requests.get(
    "https://api.travsrv.com/api/widget",
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
  type: "cities",
  count: 10,
  name: "Orla"
};

axios.get("https://api.travsrv.com/api/widget", {
  headers,
  params,
  auth
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
$baseUrl = "https://api.travsrv.com/api/widget";
$params = [
    "type" => "cities",
    "count" => "10",
    "name" => "Orla"
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
    ]
  },
  {
    id: 'landmark-search',
    title: 'Landmark Search',
    description: 'Search for landmarks for use in typeahead systems',
    method: 'GET',
    url: 'https://api.travsrv.com/api/widget?type=landmark',
    category: 'typeahead',
    headers: [
      {
        name: 'Site-Id',
        type: 'string',
        required: "Yes",
        description: ''
      },
      {
        name: 'API-ClientUsername',
        type: 'string',
        required: "Yes",
        description: ''
      },
      {
        name: 'API-ClientPassword',
        type: 'string',
        required: "Yes",
        description: ''
      },
      {
        name: 'Content-Type',
        type: 'string',
        required: "Yes",
        description: '',
        example: 'application/json'
      },
      {
        name: 'Accept-version',
        type: 'string',
        required: "No",
        description: '',
        example: '2'
      },
      {
        name: 'Authorization',
        type: 'string',
        required: "Yes",
        description: '',
        example: 'Basic (Base64 encoded username:password)'
      }
    ],
    requestParameters: [
      {
        name: 'type',
        type: 'string',
        required: true,
        description: 'Must be "landmark" for this endpoint'
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: 'Maximum number of results to return. Default: 10'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Text to search for landmarks (partial or complete name). Must be at least 2 characters long.'
      }
    ],
    requestExample: `GET /api/widget?type=landmark&count=10&name=Eiffel HTTP/1.1
Host: api.travsrv.com
Site-Id: YOUR_SITE_ID
API-ClientUsername: YOUR_USERNAME
API-ClientPassword: YOUR_PASSWORD
Content-Type: application/json
Accept-version: 2
Authorization: Basic YOUR_BASE64_ENCODED_CREDENTIALS`,
    responseExample: `[
  {
    "GroupName": null,
    "Latitude": 48.8578,
    "LocationId": 190095,
    "Longitude": 2.2951,
    "Name": "Tour Eiffel, Paris, FR",
    "NumberOfHotels": 0,
    "PropLocationId": 0,
    "Radius": 250
  }
]`,
    responseParameters: [
      {
        name: 'GroupName',
        type: 'string',
        required: false,
        description: 'Name of the group to which the landmark belongs (can be null)'
      },
      {
        name: 'Latitude',
        type: 'number',
        required: true,
        description: 'Latitude coordinate of the landmark\'s geographic location'
      },
      {
        name: 'LocationId',
        type: 'integer',
        required: true,
        description: 'Unique identifier for the location, used in subsequent availability searches'
      },
      {
        name: 'Longitude',
        type: 'number',
        required: true,
        description: 'Longitude coordinate of the landmark\'s geographic location'
      },
      {
        name: 'Name',
        type: 'string',
        required: true,
        description: 'Landmark name, including city/country information when applicable'
      },
      {
        name: 'NumberOfHotels',
        type: 'integer',
        required: true,
        description: 'Number of hotels available near this landmark'
      },
      {
        name: 'PropLocationId',
        type: 'integer',
        required: true,
        description: 'Related property identifier (if any)'
      },
      {
        name: 'Radius',
        type: 'integer',
        required: true,
        description: 'Radius in meters around the landmark for hotel search'
      }
    ],
    testVsProduction: 'The response structure and data are identical in both test and production environments for this endpoint. No additional fields or data variations were observed between environments.',
    errorCodes: [
      {
        code: '400',
        message: 'Bad Request',
        description: 'Invalid request (missing or invalid parameters)'
      },
      {
        code: '401',
        message: 'Unauthorized',
        description: 'Unauthorized (invalid credentials)'
      },
      {
        code: '404',
        message: 'Not Found',
        description: 'No landmarks found'
      },
      {
        code: '429',
        message: 'Too Many Requests',
        description: 'Too many requests (rate limit exceeded)'
      },
      {
        code: '500',
        message: 'Internal Server Error',
        description: 'Internal server error'
      }
    ],
    codeExamples: [
      {
        language: 'bash',
        label: 'cURL',
        code: `curl -X GET "https://api.travsrv.com/api/widget?type=landmark&count=10&name=Eiffel" \\
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
    "Accept-version": "2"
}

# Request parameters
params = {
    "type": "landmark",
    "count": "10",
    "name": "Eiffel"
}

# Authentication header
headers["Authorization"] = "Basic"  # Base64 encoded username:password

# Make a request
response = requests.get(
    "https://api.travsrv.com/api/widget",
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
  type: "landmark",
  count: 10,
  name: "Eiffel"
};

// Add Authorization header
headers["Authorization"] = "Basic";  // Base64 encoded username:password

axios.get("https://api.travsrv.com/api/widget", {
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
$baseUrl = "https://api.travsrv.com/api/widget";
$params = [
    "type" => "landmark",
    "count" => "10",
    "name" => "Eiffel"
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
    ]
  },
  {
    id: 'airport-search',
    title: 'Airport Search',
    description: 'Search for airports for use in typeahead systems',
    method: 'GET',
    url: 'https://api.travsrv.com/api/widget?type=airport',
    category: 'typeahead',
    headers: [
      {
        name: 'Site-Id',
        type: 'string',
        required: "Yes",
        description: ''
      },
      {
        name: 'API-ClientUsername',
        type: 'string',
        required: "Yes",
        description: ''
      },
      {
        name: 'API-ClientPassword',
        type: 'string',
        required: "Yes",
        description: ''
      },
      {
        name: 'Content-Type',
        type: 'string',
        required: "Yes",
        description: '',
        example: 'application/json'
      },
      {
        name: 'Accept-version',
        type: 'string',
        required: "No",
        description: '',
        example: '2'
      },
      {
        name: 'Authorization',
        type: 'string',
        required: "Yes",
        description: '',
        example: 'Basic (Base64 encoded username:password)'
      }
    ],
    requestParameters: [
      {
        name: 'type',
        type: 'string',
        required: true,
        description: 'Must be "airport" for this endpoint'
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: 'Maximum number of results to return. Default: 10'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Text to search for airports (partial or complete name or IATA code). Must be at least 2 characters long.'
      }
    ],
    requestExample: `GET /api/widget?type=airport&count=10&name=JFK HTTP/1.1
Host: api.travsrv.com
Site-Id: YOUR_SITE_ID
API-ClientUsername: YOUR_USERNAME
API-ClientPassword: YOUR_PASSWORD
Content-Type: application/json
Accept-version: 2
Authorization: Basic YOUR_BASE64_ENCODED_CREDENTIALS`,
    responseExample: `[
  {
    "GroupName": null,
    "Latitude": 40.63827133178711,
    "LocationId": 175818,
    "Longitude": -73.7762680053711,
    "Name": "JFK - New York, NY",
    "NumberOfHotels": 0,
    "PropLocationId": 9044,
    "Radius": 250
  }
]`,
    responseParameters: [
      {
        name: 'GroupName',
        type: 'string',
        required: false,
        description: 'Name of the group to which the airport belongs (can be null)'
      },
      {
        name: 'Latitude',
        type: 'number',
        required: true,
        description: 'Latitude coordinate of the airport\'s geographic location'
      },
      {
        name: 'LocationId',
        type: 'integer',
        required: true,
        description: 'Unique identifier for the location, used in subsequent availability searches'
      },
      {
        name: 'Longitude',
        type: 'number',
        required: true,
        description: 'Longitude coordinate of the airport\'s geographic location'
      },
      {
        name: 'Name',
        type: 'string',
        required: true,
        description: 'Airport name and code, including city/state information'
      },
      {
        name: 'NumberOfHotels',
        type: 'integer',
        required: true,
        description: 'Number of hotels available near this airport'
      },
      {
        name: 'PropLocationId',
        type: 'integer',
        required: true,
        description: 'Related property identifier (if any)'
      },
      {
        name: 'Radius',
        type: 'integer',
        required: true,
        description: 'Radius in meters around the airport for hotel search'
      }
    ],
    testVsProduction: 'The response structure and data are identical in both test and production environments for this endpoint. No additional fields or data variations were observed between environments.',
    errorCodes: [
      {
        code: '400',
        message: 'Bad Request',
        description: 'Invalid request (missing or invalid parameters)'
      },
      {
        code: '401',
        message: 'Unauthorized',
        description: 'Unauthorized (invalid credentials)'
      },
      {
        code: '404',
        message: 'Not Found',
        description: 'No airports found'
      },
      {
        code: '429',
        message: 'Too Many Requests',
        description: 'Too many requests (rate limit exceeded)'
      },
      {
        code: '500',
        message: 'Internal Server Error',
        description: 'Internal server error'
      }
    ],
    codeExamples: [
      {
        language: 'bash',
        label: 'cURL',
        code: `curl -X GET "https://api.travsrv.com/api/widget?type=airport&count=10&name=JFK" \\
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
    "Accept-version": "2"
}

# Request parameters
params = {
    "type": "airport",
    "count": "10",
    "name": "JFK"
}

# Authentication header
headers["Authorization"] = "Basic"  # Base64 encoded username:password

# Make a request
response = requests.get(
    "https://api.travsrv.com/api/widget",
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
  type: "airport",
  count: 10,
  name: "JFK"
};

// Add Authorization header
headers["Authorization"] = "Basic";  // Base64 encoded username:password

axios.get("https://api.travsrv.com/api/widget", {
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
$baseUrl = "https://api.travsrv.com/api/widget";
$params = [
    "type" => "airport",
    "count" => "10",
    "name" => "JFK"
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
    ]
  },
  {
    id: 'property-search',
    title: 'Property Search',
    description: 'Search for hotels and properties for use in typeahead systems',
    method: 'GET',
    url: 'https://api.travsrv.com/api/widget?type=props',
    category: 'typeahead',
    headers: [
      {
        name: 'Site-Id',
        type: 'string',
        required: "Yes",
        description: ''
      },
      {
        name: 'API-ClientUsername',
        type: 'string',
        required: "Yes",
        description: ''
      },
      {
        name: 'API-ClientPassword',
        type: 'string',
        required: "Yes",
        description: ''
      },
      {
        name: 'Content-Type',
        type: 'string',
        required: "Yes",
        description: '',
        example: 'application/json'
      },
      {
        name: 'Accept-version',
        type: 'string',
        required: "No",
        description: '',
        example: '2'
      },
      {
        name: 'Authorization',
        type: 'string',
        required: "Yes",
        description: '',
        example: 'Basic (Base64 encoded username:password)'
      }
    ],
    requestParameters: [
      {
        name: 'type',
        type: 'string',
        required: true,
        description: 'Must be "props" for this endpoint'
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: 'Maximum number of results to return. Default: 10'
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Text to search for properties (partial or complete name). Must be at least 2 characters long.'
      },
      {
        name: 'locationId',
        type: 'integer',
        required: false,
        description: 'Optional but recommended. Further restricts results based on a specific location ID.'
      }
    ],
    requestExample: `GET /api/widget?type=props&count=10&name=Hilton HTTP/1.1
Host: api.travsrv.com
Site-Id: YOUR_SITE_ID
API-ClientUsername: YOUR_USERNAME
API-ClientPassword: YOUR_PASSWORD
Content-Type: application/json
Accept-version: 2
Authorization: Basic YOUR_BASE64_ENCODED_CREDENTIALS`,
    responseExample: `[
  "The Art Hotel Denver, Curio Collection By Hilton",
  "The Art Hotel Denver, Curio Collection By Hilton",
  "The Art Hotel Denver, Curio Collection By Hilton",
  "The Art Hotel Denver, Curio Collection By Hilton",
  "The Art Hotel Denver, Curio Collection By Hilton",
  "The Art Hotel Denver, Curio Collection By Hilton",
  "The Art Hotel Denver, Curio Collection By Hilton",
  "The Art Hotel Denver, Curio Collection By Hilton",
  "The Art Hotel Denver, Curio Collection By Hilton",
  "The Art Hotel Denver, Curio Collection By Hilton"
]`,
    responseParameters: [
      {
        name: 'array',
        type: 'array of strings',
        required: true,
        description: 'Array of property names matching the search criteria'
      }
    ],
    testVsProduction: 'The response structure and data are identical in both test and production environments for this endpoint. No additional fields or data variations were observed between environments.',
    errorCodes: [
      {
        code: '400',
        message: 'Bad Request',
        description: 'Invalid request (missing or invalid parameters)'
      },
      {
        code: '401',
        message: 'Unauthorized',
        description: 'Unauthorized (invalid credentials)'
      },
      {
        code: '404',
        message: 'Not Found',
        description: 'No properties found'
      },
      {
        code: '429',
        message: 'Too Many Requests',
        description: 'Too many requests (rate limit exceeded)'
      },
      {
        code: '500',
        message: 'Internal Server Error',
        description: 'Internal server error'
      }
    ],
    codeExamples: [
      {
        language: 'bash',
        label: 'cURL',
        code: `curl -X GET "https://api.travsrv.com/api/widget?type=props&count=10&name=Hilton" \\
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
    "Accept-version": "2"
}

# Request parameters
params = {
    "type": "props",
    "count": "10",
    "name": "Hilton"
}

# Authentication header
headers["Authorization"] = "Basic"  # Base64 encoded username:password

# Make a request
response = requests.get(
    "https://api.travsrv.com/api/widget",
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
  type: "props",
  count: 10,
  name: "Hilton"
};

// Add Authorization header
headers["Authorization"] = "Basic";  // Base64 encoded username:password

axios.get("https://api.travsrv.com/api/widget", {
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
$baseUrl = "https://api.travsrv.com/api/widget";
$params = [
    "type" => "props",
    "count" => "10",
    "name" => "Hilton"
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
    ]
  }
];
