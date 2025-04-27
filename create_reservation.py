import requests
import base64
import json
import os
from datetime import datetime

# Diretório para salvar os arquivos
OUTPUT_DIR = "Req_Res/ReservationCreation"

# Garante que o diretório existe
if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)
    print(f"Diretório criado: {OUTPUT_DIR}")

# URL base e parâmetros
url = 'https://api.travsrv.com/api/hotel'
params = {
    'type': 'reservation',
    'siteid': '64',
    '_type': 'json'
}

# Credenciais de teste conforme documentação
username = 'YOUR_USERNAME'
password = 'YOUR_PASSWORD'
site_id = 'YOUR_SITE_ID'

# Autenticação Basic
auth_string = f"{username}:{password}"
auth_bytes = auth_string.encode('ascii')
auth_b64 = base64.b64encode(auth_bytes).decode('ascii')

# Headers
headers = {
    'Site-Id': site_id,
    'API-ClientUsername': username,
    'API-ClientPassword': password,
    'Accept-version': '2',
    'Authorization': f'Basic {auth_b64}'
}

# Dados do formulário para a reserva usando os valores exatos do arquivo Test_Req.txt
# e os valores corretos do Rate Details (gateway 28, ratePlanCode e roomCode)
form_data = {
    'type': 'reservation',
    'inDate': '2025-06-15',
    'outDate': '2025-06-20',
    'siteid': '64',
    'rooms': '1',
    'adults': '2',
    'children': '0',
    'userAgent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
    'userLanguage': 'en-US',
    'ipAddress': '1.1.1.1',
    'locale': 'en',
    'currency': 'USD',
    '_type': 'json',

    # Dados do hotel e da tarifa do arquivo test_Req.txt e test_Res.txt do Rate Details
    'hotelids': '34853',
    'ratePlanCode': '62807arvlm5s3fvlx0iqsmxqb',
    'roomCode': '29h76bywy7siyzzpurzawjdyf',
    'gateway': '28',  # Gateway 28 conforme documentação para teste

    # Informações do hóspede
    'guestFirstName': 'Test',
    'guestLastName': 'Guest',
    'guestEmail': 'guest@example.com',
    'guestPhoneCountry': '1',
    'guestPhoneArea': '123',
    'guestPhoneNumber': '1234567890',
    'addressAddress': '123 Made Up Ln.',
    'addressCity': 'Example City',
    'addressRegion': 'FL',
    'addressPostalCode': '12345',
    'addressCountryCode': 'US',

    # Informações do cartão de crédito (cartão de teste conforme documentação)
    'creditCardNumber': '4111111111111111',
    'creditCardHolder': 'Test Cardholder',
    'creditCardExpiration': '05/25',
    'creditCardCVV2': '123',
    'creditCardType': 'VI',
    'creditCardAddress': '123 Test Street',
    'creditCardCity': 'Test City',
    'creditCardRegion': 'FL',
    'creditCardPostalCode': '12345',
    'creditCardCountryCode': 'US',

    # Informações de custo do Rate Details
    'roomCostPrice': '1293.00',
    'roomCostTaxAmount': '155.16',
    'roomCostGatewayFee': '0.00',
    'roomCostTotalAmount': '1448.16',
    'roomCostCurrencyCode': 'EUR',
    'bookingFeeAmount': '5.00',
    'bookingFeeCurrencyCode': 'USD',

    # Mensagem especial para indicar que é um teste
    'specialRequests': 'This is a test reservation. Please do not actually book this room.'
}

print("Enviando requisição para criar reserva...")
print(f"Hotel ID: {form_data['hotelids']}")
print(f"Gateway: {form_data['gateway']}")
print(f"Rate Plan Code: {form_data['ratePlanCode']}")
print(f"Room Code: {form_data['roomCode']}")
print(f"Check-in: {form_data['inDate']}, Check-out: {form_data['outDate']}")

# Salvar a requisição em um arquivo
request_url = f"{url}?type=reservation&siteid={site_id}&_type=json"
request_headers = {
    'Host': 'api.travsrv.com',
    'Site-Id': site_id,
    'API-ClientUsername': username,
    'API-ClientPassword': password,
    'Accept-version': '2',
    'Authorization': f'Basic {auth_b64}',
    'Content-Type': 'multipart/form-data'
}

# Formata os cabeçalhos para o arquivo
headers_str = "\n".join([f"{key}: {value}" for key, value in request_headers.items()])

# Formata os dados do formulário para o arquivo
form_data_str = "\n".join([f"{key}={value}" for key, value in form_data.items()])

# Constrói o conteúdo da requisição
request_content = f"POST {request_url} HTTP/1.1\n{headers_str}\n\n{form_data_str}"

# Salva a requisição em um arquivo
with open(os.path.join(OUTPUT_DIR, "Test_Req.txt"), "w") as f:
    f.write(request_content)

print(f"Requisição salva em {os.path.join(OUTPUT_DIR, 'Test_Req.txt')}")

# Fazer a requisição
try:
    response = requests.post(
        url,
        params=params,
        headers=headers,
        files={k: (None, v) for k, v in form_data.items()}  # Formato multipart/form-data
    )

    print(f"\nStatus code: {response.status_code}")

    try:
        result = response.json()

        # Salva a resposta em um arquivo
        with open(os.path.join(OUTPUT_DIR, "Test_Res.txt"), "w") as f:
            f.write(json.dumps(result, indent=2))

        print(f"Resposta salva em {os.path.join(OUTPUT_DIR, 'Test_Res.txt')}")

        # Exibe informações sobre a resposta
        if 'ArnResponse' in result:
            if 'Error' in result['ArnResponse']:
                print("\nErro na criação da reserva:")
                print(f"Mensagem: {result['ArnResponse']['Error'].get('Message', 'N/A')}")
            elif 'Reservation' in result['ArnResponse']:
                reservation = result['ArnResponse']['Reservation']
                hotel_reservation = reservation.get('HotelReservation', {})
                print("\nReserva criada com sucesso!")
                print(f"Reservation ID: {hotel_reservation.get('@ReservationID', 'N/A')}")
                print(f"Itinerary ID: {reservation.get('@ItineraryID', 'N/A')}")
                print(f"Confirmation Number: {hotel_reservation.get('@CustomerConfirmationNumber', 'N/A')}")
            else:
                print("\nFormato de resposta inesperado.")
        else:
            print("\nFormato de resposta inesperado.")
    except ValueError:
        # Se não for JSON, salva o texto da resposta
        with open(os.path.join(OUTPUT_DIR, "Test_Res.txt"), "w") as f:
            f.write(response.text)

        print(f"Resposta salva em {os.path.join(OUTPUT_DIR, 'Test_Res.txt')}")
        print("\nA resposta não é um JSON válido.")
except Exception as e:
    print(f"Erro ao fazer a requisição: {str(e)}")
