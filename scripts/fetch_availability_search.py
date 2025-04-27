import requests
import json
import os
import sys
import base64

def fetch_availability_search(environment, site_id, username, password):
    """
    Fetch data from the availability-search endpoint and save both request and response

    Args:
        environment (str): 'test' or 'production'
        site_id (str): Site ID for the API
        username (str): API username
        password (str): API password
    """
    # Create directories if they don't exist
    os.makedirs('Req_Res/AvailabilitySearch', exist_ok=True)

    # File names based on environment
    req_file = f'Req_Res/AvailabilitySearch/{"Test" if environment == "test" else "Prod"}_Req.txt'
    res_file = f'Req_Res/AvailabilitySearch/{"Test" if environment == "test" else "Prod"}_Res.txt'

    # Base URL and parameters
    base_url = "https://api.travsrv.com/api/hotel"
    params = {
        "type": "availability",
        "inDate": "2025-06-15",
        "outDate": "2025-06-20",
        "siteid": site_id,
        "rooms": "1",
        "adults": "2",
        "children": "0",
        "userAgent": "Mozilla/5.0",
        "userLanguage": "en",
        "hotelids": "34853",
        "_type": "json"
    }

    # Headers
    headers = {
        "Site-Id": site_id,
        "API-ClientUsername": username,
        "API-ClientPassword": password,
        "Content-Type": "application/json",
        "Accept-version": "2"
    }

    # Authentication
    auth = (username, password)
    auth_header = base64.b64encode(f"{username}:{password}".encode()).decode()

    # We don't need a payload for GET request

    # Log the request details
    request_log = f"""GET /api/hotel?type=availability&inDate=2025-06-15&outDate=2025-06-20&siteid={site_id}&rooms=1&adults=2&children=0&userAgent=Mozilla/5.0&userLanguage=en&hotelids=34853&_type=json HTTP/1.1
Host: api.travsrv.com
Site-Id: {site_id}
API-ClientUsername: {username}
API-ClientPassword: {password}
Content-Type: application/json
Accept-version: 2
Authorization: Basic {auth_header}
"""

    # Save request details
    with open(req_file, 'w') as f:
        f.write(request_log)

    print(f"Making request to {base_url} with {environment} credentials...")
    print(f"Username: {username}")
    print(f"Password: {password}")
    print(f"Site-Id: {site_id}")

    try:
        # Make the request
        response = requests.get(
            base_url,
            headers=headers,
            params=params,
            auth=auth
        )

        print(f"Request URL: {response.request.url}")
        print(f"Request Headers: {response.request.headers}")
        print(f"Status Code: {response.status_code}")

        # Check if the request was successful
        if response.status_code == 200:
            # Parse the JSON response
            data = response.json()

            # Save the response
            with open(res_file, 'w') as f:
                f.write(json.dumps(data, indent=2))

            print(f"Successfully saved {environment} response to {res_file}")

            # Print summary of results
            try:
                hotels = data["ArnResponse"]["Availability"]["HotelAvailability"]["Hotel"]
                if isinstance(hotels, list):
                    print(f"Response contains {len(hotels)} hotels")
                    print("\nFirst few results:")
                    for hotel in hotels[:3]:
                        print(f"- {hotel.get('@Name', 'N/A')}: {hotel.get('@City', 'N/A')}, {hotel.get('@CountryCode', 'N/A')}")
                else:
                    print(f"Response contains 1 hotel: {hotels.get('@Name', 'N/A')}")
            except (KeyError, TypeError) as e:
                print(f"Could not parse hotel information: {e}")

        else:
            print(f"Request failed with status code: {response.status_code}")
            print(response.text)

            # Save the error response
            with open(f'Req_Res/AvailabilitySearch/{"Test" if environment == "test" else "Prod"}_Res_Error.txt', 'w') as f:
                f.write(f"Status Code: {response.status_code}\n\n{response.text}")

    except Exception as e:
        print(f"An error occurred: {e}")

        # Save the error
        with open(f'Req_Res/AvailabilitySearch/{"Test" if environment == "test" else "Prod"}_Res_Error.txt', 'w') as f:
            f.write(f"Exception: {str(e)}")

def main():
    if len(sys.argv) < 5:
        print("Usage: python fetch_availability_search.py <environment> <site_id> <username> <password>")
        print("Example: python fetch_availability_search.py test 64 publictest testme1")
        return

    environment = sys.argv[1].lower()
    site_id = sys.argv[2]
    username = sys.argv[3]
    password = sys.argv[4]

    if environment not in ['test', 'production']:
        print("Environment must be either 'test' or 'production'")
        return

    fetch_availability_search(environment, site_id, username, password)

if __name__ == "__main__":
    main()
