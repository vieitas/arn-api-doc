import requests
import json
import os
import sys
import base64

def fetch_airport_search(environment, site_id, username, password):
    """
    Fetch data from the airport-search endpoint and save both request and response
    
    Args:
        environment (str): 'test' or 'production'
        site_id (str): Site ID for the API
        username (str): API username
        password (str): API password
    """
    # Create directories if they don't exist
    os.makedirs('Req_Res/AirportSearch', exist_ok=True)
    
    # File names based on environment
    req_file = f'Req_Res/AirportSearch/{"Test" if environment == "test" else "Prod"}_Req.txt'
    res_file = f'Req_Res/AirportSearch/{"Test" if environment == "test" else "Prod"}_Res.txt'
    
    # Base URL and parameters
    base_url = "https://api.travsrv.com/api/widget"
    params = {
        "type": "airport",
        "count": "10",
        "name": "JFK"
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
    
    # Create query string for logging
    query_string = "&".join([f"{k}={v}" for k, v in params.items()])
    
    # Log the request details
    request_log = f"""GET /api/widget?{query_string} HTTP/1.1
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
            print(f"Response contains {len(data)} airports")
            
            # Print the first few results
            print("\nFirst few results:")
            for airport in data[:3]:
                print(f"- {airport.get('Name', 'N/A')}")
            
        else:
            print(f"Request failed with status code: {response.status_code}")
            print(response.text)
            
            # Save the error response
            with open(f'Req_Res/AirportSearch/{"Test" if environment == "test" else "Prod"}_Res_Error.txt', 'w') as f:
                f.write(f"Status Code: {response.status_code}\n\n{response.text}")
    
    except Exception as e:
        print(f"An error occurred: {e}")
        
        # Save the error
        with open(f'Req_Res/AirportSearch/{"Test" if environment == "test" else "Prod"}_Res_Error.txt', 'w') as f:
            f.write(f"Exception: {str(e)}")

def main():
    if len(sys.argv) < 5:
        print("Usage: python fetch_airport_search.py <environment> <site_id> <username> <password>")
        print("Example: python fetch_airport_search.py test 64 publictest testme1")
        return
    
    environment = sys.argv[1].lower()
    site_id = sys.argv[2]
    username = sys.argv[3]
    password = sys.argv[4]
    
    if environment not in ['test', 'production']:
        print("Environment must be either 'test' or 'production'")
        return
    
    fetch_airport_search(environment, site_id, username, password)

if __name__ == "__main__":
    main()
