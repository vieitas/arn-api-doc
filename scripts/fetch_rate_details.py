import requests
import base64
import json
import os
from datetime import datetime

def fetch_rate_details(env, site_id, username, password):
    # Create directory if it doesn't exist
    os.makedirs("Req_Res/RateDetails", exist_ok=True)

    # Base URL and parameters
    if env == "prod":
        # Production parameters
        params = {
            "type": "rateDetails",
            "inDate": "2025-06-15",
            "outDate": "2025-06-20",
            "siteid": site_id,
            "rooms": "1",
            "adults": "2",
            "children": "0",
            "userAgent": "Mozilla/5.0",
            "userLanguage": "en",
            "hotelids": "34853",
            "ratePlanCode": "RAC",               # From Production Availability Search
            "roomCode": "A1K",                   # From Production Availability Search
            "gateway": "4",                      # From Production Availability Search
            "_type": "json"
        }
    else:
        # Test parameters
        params = {
            "type": "rateDetails",
            "inDate": "2025-06-15",
            "outDate": "2025-06-20",
            "siteid": site_id,
            "rooms": "1",
            "adults": "2",
            "children": "0",
            "userAgent": "Mozilla/5.0",
            "userLanguage": "en",
            "hotelids": "34853",
            "ratePlanCode": "62807arvlm5s3fvlx0iqsmxqb",  # From Test Availability Search
            "roomCode": "29h76bywy7siyzzpurzawjdyf",      # From Test Availability Search
            "gateway": "28",                              # From Test Availability Search
            "_type": "json"
        }

    # Base URL
    base_url = "https://api.travsrv.com/api/hotel"

    # Headers
    headers = {
        "Site-Id": site_id,
        "API-ClientUsername": username,
        "API-ClientPassword": password,
        "Content-Type": "application/json",
        "Accept-version": "2"
    }

    # Basic auth
    auth_string = f"{username}:{password}"
    auth_bytes = auth_string.encode('ascii')
    auth_header = base64.b64encode(auth_bytes).decode('ascii')

    # Log the request details
    if env == "prod":
        request_log = f"""GET /api/hotel?type=rateDetails&inDate=2025-06-15&outDate=2025-06-20&siteid={site_id}&rooms=1&adults=2&children=0&userAgent=Mozilla/5.0&userLanguage=en&hotelids=34853&ratePlanCode=RAC&roomCode=A1K&gateway=4&_type=json HTTP/1.1
Host: api.travsrv.com
Site-Id: {site_id}
API-ClientUsername: {username}
API-ClientPassword: {password}
Content-Type: application/json
Accept-version: 2
Authorization: Basic {auth_header}
"""
    else:
        request_log = f"""GET /api/hotel?type=rateDetails&inDate=2025-06-15&outDate=2025-06-20&siteid={site_id}&rooms=1&adults=2&children=0&userAgent=Mozilla/5.0&userLanguage=en&hotelids=34853&ratePlanCode=62807arvlm5s3fvlx0iqsmxqb&roomCode=29h76bywy7siyzzpurzawjdyf&gateway=28&_type=json HTTP/1.1
Host: api.travsrv.com
Site-Id: {site_id}
API-ClientUsername: {username}
API-ClientPassword: {password}
Content-Type: application/json
Accept-version: 2
Authorization: Basic {auth_header}
"""

    # Save request to file
    with open(f"Req_Res/RateDetails/{env}_Req.txt", "w") as f:
        f.write(request_log)

    print(f"Saved {env} request to Req_Res/RateDetails/{env}_Req.txt")

    # Make the request
    try:
        response = requests.get(base_url, params=params, headers=headers, auth=(username, password))

        # Save response to file
        with open(f"Req_Res/RateDetails/{env}_Res.txt", "w") as f:
            if response.status_code == 200:
                # Pretty print JSON
                json_response = json.loads(response.text)
                f.write(json.dumps(json_response, indent=2))
            else:
                f.write(f"Status Code: {response.status_code}\n\n")
                f.write(response.text)

        print(f"Saved {env} response to Req_Res/RateDetails/{env}_Res.txt")
        print(f"Status Code: {response.status_code}")

    except Exception as e:
        print(f"Error: {e}")
        with open(f"Req_Res/RateDetails/{env}_Res.txt", "w") as f:
            f.write(f"Error: {e}")

if __name__ == "__main__":
    import sys

    if len(sys.argv) < 5:
        print("Usage: python fetch_rate_details.py <env> <site_id> <username> <password>")
        print("Example: python fetch_rate_details.py test 64 publictest testme1")
        sys.exit(1)

    env = sys.argv[1]
    site_id = sys.argv[2]
    username = sys.argv[3]
    password = sys.argv[4]

    fetch_rate_details(env, site_id, username, password)
