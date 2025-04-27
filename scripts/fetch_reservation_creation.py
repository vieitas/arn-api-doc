import requests
import json
import os
import sys
import base64

def fetch_reservation_creation(environment, site_id, username, password):
    """
    Fetch data from the reservation-creation endpoint and save both request and response

    Args:
        environment (str): 'test' or 'production'
        site_id (str): Site ID for the API
        username (str): API username
        password (str): API password
    """
    # Create directories if they don't exist
    os.makedirs('Req_Res/ReservationCreation', exist_ok=True)

    # File names based on environment
    req_file = f'Req_Res/ReservationCreation/{"Test" if environment == "test" else "Prod"}_Req.txt'
    res_file = f'Req_Res/ReservationCreation/{"Test" if environment == "test" else "Prod"}_Res.txt'

    # Base URL and parameters
    base_url = "https://api.travsrv.com/api/hotel"
    params = {
        "type": "reservation",
        "siteid": site_id,
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

    # Payload for POST request as form data
    # Use data from the working example
    if environment == "test":
        hotel_id = "34853"
        rate_plan_code = "RAC"
        room_code = "A1K"
        gateway = "4"
        in_date = "2025-06-15"
        out_date = "2025-06-20"
    else:  # production
        hotel_id = "34853"
        rate_plan_code = "RAC"
        room_code = "A1K"
        gateway = "4"
        in_date = "2025-06-15"
        out_date = "2025-06-20"

    # Form data
    payload = {
        "type": "reservation",
        "inDate": in_date,
        "outDate": out_date,
        "siteid": site_id,
        "rooms": "1",
        "adults": "2",
        "children": "0",
        "childages": "",
        "userAgent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",
        "userLanguage": "en-US",
        "ipAddress": "1.1.1.1",
        "locale": "en",
        "currency": "USD",
        "_type": "json",

        "hotelids": hotel_id,
        "ratePlanCode": rate_plan_code,
        "roomCode": room_code,
        "gateway": gateway,
        "recordLocator": "",
        "campaignCode": "",
        "discountCard": "",
        "CCAuthIntineraryID": "",
        "memberToken": "",
        "agentRefNumber": "",

        "guestFirstName": "Test",
        "guestLastName": "Guest",
        "guestEmail": "guest@example.com",
        "guestPhoneCountry": "1",
        "guestPhoneArea": "123",
        "guestPhoneNumber": "1234567890",
        "guestPhoneExtension": "",
        "guestTitle": "",
        "guestMessage": "",

        "addressAddress": "123 Made Up Ln.",
        "addressCity": "Example City",
        "addressRegion": "FL",
        "addressPostalCode": "12345",
        "addressCountryCode": "US",
        "addressExtraInfo": "",

        "creditCardNumber": "4111111111111111",
        "creditCardHolder": "Test Cardholder",
        "creditCardExpiration": "05/22",
        "creditCardCVV2": "20153",
        "creditCardType": "VI",
        "creditCardAddress": "8894 Josefa Centers Suite 872",
        "creditCardCity": "New Robertofort",
        "creditCardRegion": "FL",
        "creditCardPostalCode": "12345",
        "creditCardCountryCode": "US",

        "roomCostPrice": "50",
        "roomCostTaxAmount": "6",
        "roomCostGatewayFee": "0",
        "roomCostTotalAmount": "56",
        "roomCostCurrencyCode": "EUR",
        "bookingFeeAmount": "5",
        "bookingFeeCurrencyCode": ""
    }

    # Log the request details
    request_log = f"""POST /api/hotel?type=reservation&siteid={site_id}&_type=json HTTP/1.1
Host: api.travsrv.com
Site-Id: {site_id}
API-ClientUsername: {username}
API-ClientPassword: {password}
Content-Type: multipart/form-data
Accept-version: 2
Authorization: Basic {auth_header}

Form data:
{json.dumps(payload, indent=2)}
"""

    # Save request details
    with open(req_file, 'w') as f:
        f.write(request_log)

    print(f"Making request to {base_url} with {environment} credentials...")
    print(f"Username: {username}")
    print(f"Password: {password}")
    print(f"Site-Id: {site_id}")

    try:
        # Remove Content-Type header to let requests set it automatically for multipart/form-data
        if 'Content-Type' in headers:
            del headers['Content-Type']

        # Make the request with form data
        response = requests.post(
            base_url,
            headers=headers,
            params=params,
            auth=auth,
            files={k: (None, v) for k, v in payload.items()}  # Convert to multipart/form-data
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
                if "Reservation" in data["ArnResponse"]:
                    reservation = data["ArnResponse"]["Reservation"]
                    hotel_reservation = reservation["HotelReservation"]
                    print(f"Reservation created successfully!")
                    print(f"Reservation ID: {hotel_reservation.get('@ReservationID', 'N/A')}")
                    print(f"Itinerary ID: {reservation.get('@ItineraryID', 'N/A')}")
                    print(f"Confirmation Number: {hotel_reservation.get('@CustomerConfirmationNumber', 'N/A')}")
                elif "Error" in data["ArnResponse"]:
                    error = data["ArnResponse"]["Error"]
                    print(f"Error: {error.get('@Code', 'Unknown Error')}")
                    print(f"Description: {error.get('@Description', 'No description')}")
                    print(f"Message: {error.get('Message', 'No message')}")
                else:
                    print("Unknown response format")
            except (KeyError, TypeError) as e:
                print(f"Could not parse response information: {e}")

        else:
            print(f"Request failed with status code: {response.status_code}")
            print(response.text)

            # Save the error response
            with open(f'Req_Res/ReservationCreation/{"Test" if environment == "test" else "Prod"}_Res_Error.txt', 'w') as f:
                f.write(f"Status Code: {response.status_code}\n\n{response.text}")

    except Exception as e:
        print(f"An error occurred: {e}")

        # Save the error
        with open(f'Req_Res/ReservationCreation/{"Test" if environment == "test" else "Prod"}_Res_Error.txt', 'w') as f:
            f.write(f"Exception: {str(e)}")

def main():
    if len(sys.argv) < 5:
        print("Usage: python fetch_reservation_creation.py <environment> <site_id> <username> <password>")
        print("Example: python fetch_reservation_creation.py test 64 publictest testme1")
        return

    environment = sys.argv[1].lower()
    site_id = sys.argv[2]
    username = sys.argv[3]
    password = sys.argv[4]

    if environment not in ['test', 'production']:
        print("Environment must be either 'test' or 'production'")
        return

    fetch_reservation_creation(environment, site_id, username, password)

if __name__ == "__main__":
    main()
