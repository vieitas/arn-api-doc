#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Script para fazer uma reserva de hotel no ambiente de testes da ARN API.
Este script usa os dados do Rate Details para criar uma reserva e salvar
a requisição e resposta em arquivos.
"""

import requests
import json
import base64
import uuid
import os
from datetime import datetime, timedelta

# Configurações da API
BASE_URL = "https://api.travsrv.com/api"
SITE_ID = "YOUR_SITE_ID"
API_USERNAME = "YOUR_USERNAME"
API_PASSWORD = "YOUR_PASSWORD"
AUTH_HEADER = f"Basic {base64.b64encode(f'{API_USERNAME}:{API_PASSWORD}'.encode()).decode()}"

# Diretório para salvar os arquivos
OUTPUT_DIR = "Req_Res/ReservationCreation"

# Função para garantir que o diretório existe
def ensure_directory_exists(directory):
    """
    Garante que o diretório existe, criando-o se necessário.
    """
    if not os.path.exists(directory):
        os.makedirs(directory)
        print(f"Diretório criado: {directory}")

# Cabeçalhos comuns para todas as requisições
COMMON_HEADERS = {
    "Site-Id": SITE_ID,
    "API-ClientUsername": API_USERNAME,
    "API-ClientPassword": API_PASSWORD,
    "Content-Type": "application/json",
    "Accept-version": "2",
    "Authorization": AUTH_HEADER
}

# Datas para a reserva (hoje + 30 dias para check-in, hoje + 35 dias para check-out)
today = datetime.now()
check_in_date = (today + timedelta(days=30)).strftime("%Y-%m-%d")
check_out_date = (today + timedelta(days=35)).strftime("%Y-%m-%d")

# Dados do hotel para teste
HOTEL_ID = "34853"  # Bryan's Spanish Cove em Orlando

def get_rate_details():
    """
    Obtém os detalhes da tarifa para o hotel especificado.
    """
    print(f"Obtendo detalhes da tarifa para o hotel {HOTEL_ID}...")
    print(f"Datas: Check-in {check_in_date}, Check-out {check_out_date}")

    # Parâmetros para a requisição de detalhes da tarifa
    params = {
        "type": "availability",
        "inDate": check_in_date,
        "outDate": check_out_date,
        "siteid": SITE_ID,
        "rooms": "1",
        "adults": "2",
        "children": "0",
        "userAgent": "Mozilla/5.0",
        "userLanguage": "en",
        "hotelids": HOTEL_ID,
        "_type": "json"
    }

    try:
        # Faz a requisição para obter as tarifas disponíveis
        response = requests.get(
            f"{BASE_URL}/hotel",
            headers=COMMON_HEADERS,
            params=params
        )

        # Verifica se a requisição foi bem-sucedida
        if response.status_code != 200:
            print(f"Erro ao obter tarifas: {response.status_code}")
            print(response.text)
            return None

        # Converte a resposta para JSON
        data = response.json()

        # Verifica se há hotéis na resposta
        if "ArnResponse" not in data or "Availability" not in data["ArnResponse"] or "HotelAvailability" not in data["ArnResponse"]["Availability"]:
            print("Nenhum hotel encontrado na resposta.")
            return None

        # Obtém o primeiro hotel da resposta
        hotel_availability = data["ArnResponse"]["Availability"]["HotelAvailability"]
        if not hotel_availability or "Hotel" not in hotel_availability:
            print("Nenhum hotel disponível.")
            return None

        hotels = hotel_availability["Hotel"]
        if not isinstance(hotels, list):
            hotels = [hotels]

        if not hotels:
            print("Nenhum hotel disponível.")
            return None

        hotel = hotels[0]

        # Verifica se há planos de tarifa disponíveis
        if "RatePlan" not in hotel:
            print("Nenhum plano de tarifa disponível para este hotel.")
            return None

        rate_plans = hotel["RatePlan"]
        if not isinstance(rate_plans, list):
            rate_plans = [rate_plans]

        if not rate_plans:
            print("Nenhum plano de tarifa disponível para este hotel.")
            return None

        # Obtém o primeiro plano de tarifa
        rate_plan = rate_plans[0]

        # Verifica se há quartos disponíveis
        if "Room" not in rate_plan:
            print("Nenhum quarto disponível para este plano de tarifa.")
            return None

        rooms = rate_plan["Room"]
        if not isinstance(rooms, list):
            rooms = [rooms]

        if not rooms:
            print("Nenhum quarto disponível para este plano de tarifa.")
            return None

        # Obtém o primeiro quarto
        room = rooms[0]

        # Obtém os códigos necessários para a reserva
        rate_plan_code = rate_plan["@Code"]
        room_code = room["@Code"]
        gateway = rate_plan["@Gateway"]

        # Agora, vamos obter os detalhes completos da tarifa
        rate_details_params = {
            "type": "rateDetails",
            "inDate": check_in_date,
            "outDate": check_out_date,
            "siteid": SITE_ID,
            "rooms": "1",
            "adults": "2",
            "children": "0",
            "userAgent": "Mozilla/5.0",
            "userLanguage": "en",
            "hotelids": HOTEL_ID,
            "ratePlanCode": rate_plan_code,
            "roomCode": room_code,
            "gateway": gateway,
            "_type": "json"
        }

        # Faz a requisição para obter os detalhes da tarifa
        rate_details_response = requests.get(
            f"{BASE_URL}/hotel",
            headers=COMMON_HEADERS,
            params=rate_details_params
        )

        # Verifica se a requisição foi bem-sucedida
        if rate_details_response.status_code != 200:
            print(f"Erro ao obter detalhes da tarifa: {rate_details_response.status_code}")
            print(rate_details_response.text)
            return None

        # Converte a resposta para JSON
        rate_details_data = rate_details_response.json()

        # Verifica se há detalhes da tarifa na resposta
        if "ArnResponse" not in rate_details_data or "RateDetails" not in rate_details_data["ArnResponse"]:
            print("Nenhum detalhe de tarifa encontrado na resposta.")
            return None

        # Extrai os detalhes da tarifa
        rate_details = rate_details_data["ArnResponse"]["RateDetails"]
        if "HotelRateDetails" not in rate_details:
            print("Nenhum detalhe de tarifa de hotel encontrado na resposta.")
            return None

        hotel_rate_details = rate_details["HotelRateDetails"]
        if "Hotel" not in hotel_rate_details:
            print("Nenhum hotel encontrado nos detalhes da tarifa.")
            return None

        hotels = hotel_rate_details["Hotel"]
        if not isinstance(hotels, list):
            hotels = [hotels]

        if not hotels:
            print("Nenhum hotel encontrado nos detalhes da tarifa.")
            return None

        hotel = hotels[0]

        # Verifica se há planos de tarifa disponíveis
        if "RatePlan" not in hotel:
            print("Nenhum plano de tarifa disponível nos detalhes.")
            return None

        rate_plans = hotel["RatePlan"]
        if not isinstance(rate_plans, list):
            rate_plans = [rate_plans]

        if not rate_plans:
            print("Nenhum plano de tarifa disponível nos detalhes.")
            return None

        # Obtém o primeiro plano de tarifa
        rate_plan = rate_plans[0]

        # Verifica se há quartos disponíveis
        if "Room" not in rate_plan:
            print("Nenhum quarto disponível nos detalhes da tarifa.")
            return None

        rooms = rate_plan["Room"]
        if not isinstance(rooms, list):
            rooms = [rooms]

        if not rooms:
            print("Nenhum quarto disponível nos detalhes da tarifa.")
            return None

        # Obtém o primeiro quarto
        room = rooms[0]

        # Extrai os valores necessários para a reserva
        currency_code = room["@CurrencyCode"]

        # Verifica se há informações de preço
        if "NightlyRate" not in room:
            print("Nenhuma informação de preço encontrada.")
            return None

        nightly_rates = room["NightlyRate"]
        if not isinstance(nightly_rates, list):
            nightly_rates = [nightly_rates]

        # Calcula o preço total das diárias
        total_price = sum(float(rate["@Price"]) for rate in nightly_rates)

        # Obtém informações de impostos
        tax_amount = 0
        if "Tax" in room and "@Amount" in room["Tax"]:
            tax_amount = float(room["Tax"]["@Amount"])

        # Obtém informações de taxa de gateway
        gateway_fee = 0
        if "GatewayFee" in room and "@Amount" in room["GatewayFee"]:
            gateway_fee = float(room["GatewayFee"]["@Amount"])

        # Obtém o valor total
        total_amount = 0
        if "Total" in room and "@Amount" in room["Total"]:
            total_amount = float(room["Total"]["@Amount"])

        # Obtém a taxa de reserva
        booking_fee = 0
        booking_fee_currency = "USD"
        if "BookingFee" in room:
            if "@Amount" in room["BookingFee"]:
                booking_fee = float(room["BookingFee"]["@Amount"])
            if "@CurrencyCode" in room["BookingFee"]:
                booking_fee_currency = room["BookingFee"]["@CurrencyCode"]

        # Retorna os dados necessários para a reserva
        return {
            "hotel_id": HOTEL_ID,
            "rate_plan_code": rate_plan_code,
            "room_code": room_code,
            "gateway": gateway,
            "currency_code": currency_code,
            "total_price": total_price,
            "tax_amount": tax_amount,
            "gateway_fee": gateway_fee,
            "total_amount": total_amount,
            "booking_fee": booking_fee,
            "booking_fee_currency": booking_fee_currency
        }

    except Exception as e:
        print(f"Erro ao obter detalhes da tarifa: {str(e)}")
        return None

def make_reservation(rate_details):
    """
    Faz uma reserva usando os detalhes da tarifa e salva a requisição e resposta em arquivos.
    """
    print("\nCriando reserva...")

    # Garante que o diretório de saída existe
    ensure_directory_exists(OUTPUT_DIR)

    # Gera um GUID para o localizador da reserva
    record_locator = str(uuid.uuid4())

    # Cabeçalhos para a requisição de reserva
    headers = {
        "Site-Id": SITE_ID,
        "API-ClientUsername": API_USERNAME,
        "API-ClientPassword": API_PASSWORD,
        "Accept-version": "2",
        "Authorization": AUTH_HEADER,
        "Content-Type": "multipart/form-data"
    }

    # Parâmetros para a URL
    params = {
        "type": "reservation",
        "siteid": SITE_ID,
        "_type": "json"
    }

    # Dados do formulário para a reserva
    form_data = {
        # Parâmetros básicos
        "type": "reservation",
        "inDate": check_in_date,
        "outDate": check_out_date,
        "siteid": SITE_ID,
        "rooms": "1",
        "adults": "2",
        "children": "0",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "userLanguage": "en-US",
        "ipAddress": "127.0.0.1",
        "locale": "en",
        "currency": "USD",

        # Parâmetros de reserva
        "hotelids": rate_details["hotel_id"],
        "ratePlanCode": rate_details["rate_plan_code"],
        "roomCode": rate_details["room_code"],
        "gateway": rate_details["gateway"],
        "recordLocator": record_locator,

        # Informações do hóspede
        "guestFirstName": "Test",
        "guestLastName": "User",
        "guestEmail": "test@example.com",
        "guestPhoneCountry": "1",
        "guestPhoneArea": "555",
        "guestPhoneNumber": "1234567",
        "address": "123 Test Street",
        "addressCity": "Test City",
        "addressRegion": "FL",
        "addressCountryCode": "US",
        "addressPostalCode": "12345",

        # Informações de pagamento
        "creditCardType": "VI",
        "creditCardNumber": "4111111111111111",  # Cartão de teste
        "creditCardExpiration": "12/25",
        "creditCardCVV2": "123",
        "creditCardHolder": "Test User",
        "creditCardAddress": "123 Test Street",
        "creditCardCity": "Test City",
        "creditCardRegion": "FL",
        "creditCardCountryCode": "US",
        "creditCardPostalCode": "12345",

        # Informações de custo
        "roomCostCurrencyCode": rate_details["currency_code"],
        "roomCostPrice": str(rate_details["total_price"]),
        "roomCostTaxAmount": str(rate_details["tax_amount"]),
        "roomCostGatewayFee": str(rate_details["gateway_fee"]),
        "roomCostTotalAmount": str(rate_details["total_amount"]),
        "bookingFeeAmount": str(rate_details["booking_fee"]),
        "bookingFeeCurrencyCode": rate_details["booking_fee_currency"],

        # Informações adicionais
        "specialRequests": "This is a test reservation. Please do not actually book this room."
    }

    # Constrói a requisição para salvar no arquivo
    request_url = f"{BASE_URL}/hotel?type=reservation&siteid={SITE_ID}&_type=json"
    request_headers_str = "\n".join([f"{key}: {value}" for key, value in headers.items()])

    # Formata os dados do formulário para exibição
    form_data_str = ""
    for key, value in form_data.items():
        form_data_str += f"{key}={value}\n"

    # Salva a requisição em um arquivo
    request_content = f"POST {request_url} HTTP/1.1\nHost: api.travsrv.com\n{request_headers_str}\n\n{form_data_str}"
    with open(os.path.join(OUTPUT_DIR, "Test_Req.txt"), "w") as f:
        f.write(request_content)

    print(f"Requisição salva em {os.path.join(OUTPUT_DIR, 'Test_Req.txt')}")

    try:
        # Faz a requisição para criar a reserva
        response = requests.post(
            f"{BASE_URL}/hotel",
            headers=headers,
            params=params,
            data=form_data
        )

        # Salva a resposta em um arquivo
        if response.headers.get("Content-Type", "").startswith("application/json"):
            # Formata a resposta JSON para melhor legibilidade
            try:
                response_json = response.json()
                with open(os.path.join(OUTPUT_DIR, "Test_Res.txt"), "w") as f:
                    f.write(json.dumps(response_json, indent=2))
            except:
                with open(os.path.join(OUTPUT_DIR, "Test_Res.txt"), "w") as f:
                    f.write(response.text)
        else:
            with open(os.path.join(OUTPUT_DIR, "Test_Res.txt"), "w") as f:
                f.write(response.text)

        print(f"Resposta salva em {os.path.join(OUTPUT_DIR, 'Test_Res.txt')}")

        # Verifica se a requisição foi bem-sucedida
        if response.status_code != 200:
            print(f"Erro ao criar reserva: {response.status_code}")
            print(response.text)
            return None

        # Converte a resposta para JSON
        data = response.json()

        # Verifica se há informações da reserva na resposta
        if "ArnResponse" not in data or "Reservation" not in data["ArnResponse"]:
            print("Nenhuma informação de reserva encontrada na resposta.")
            return None

        # Extrai as informações da reserva
        reservation = data["ArnResponse"]["Reservation"]
        if "HotelReservation" not in reservation:
            print("Nenhuma informação de reserva de hotel encontrada na resposta.")
            return None

        hotel_reservation = reservation["HotelReservation"]

        # Extrai os IDs da reserva
        reservation_id = hotel_reservation.get("@ReservationID", "N/A")
        itinerary_id = reservation.get("@ItineraryID", "N/A")
        confirmation_number = hotel_reservation.get("@CustomerConfirmationNumber", "N/A")

        # Retorna os dados da reserva
        return {
            "reservation_id": reservation_id,
            "itinerary_id": itinerary_id,
            "confirmation_number": confirmation_number,
            "record_locator": record_locator,
            "full_response": data
        }

    except Exception as e:
        print(f"Erro ao criar reserva: {str(e)}")
        return None

def main():
    """
    Função principal que executa o fluxo simplificado para criar os arquivos de requisição e resposta.
    """
    print("=== Script para Criar Arquivos de Requisição e Resposta de Reserva ===\n")

    # Usamos valores fixos do exemplo de Rate Details
    rate_details = {
        "hotel_id": HOTEL_ID,
        "rate_plan_code": "62807arvlm5s3fvlx0iqsmxqb",  # Do exemplo
        "room_code": "29h76bywy7siyzzpurzawjdyf",  # Do exemplo
        "gateway": "28",  # Do exemplo
        "currency_code": "EUR",
        "total_price": 1293.00,  # Soma dos preços das diárias
        "tax_amount": 155.16,
        "gateway_fee": 0.00,
        "total_amount": 1448.16,
        "booking_fee": 5.00,
        "booking_fee_currency": "USD"
    }

    print("Usando dados fixos do exemplo de Rate Details:")
    print(f"Hotel ID: {rate_details['hotel_id']}")
    print(f"Rate Plan Code: {rate_details['rate_plan_code']}")
    print(f"Room Code: {rate_details['room_code']}")
    print(f"Gateway: {rate_details['gateway']}")

    # Faz a reserva e salva os arquivos
    reservation = make_reservation(rate_details)

    if reservation:
        print("\nArquivos de requisição e resposta criados com sucesso!")
        print(f"Reservation ID: {reservation['reservation_id']}")
        print(f"Itinerary ID: {reservation['itinerary_id']}")
        print(f"Confirmation Number: {reservation['confirmation_number']}")
    else:
        print("\nOcorreu um erro ao criar os arquivos, mas os arquivos de requisição e resposta foram salvos.")

    print("\n=== Fim do Script ===")

if __name__ == "__main__":
    main()
