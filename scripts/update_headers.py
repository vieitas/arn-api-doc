import os
import re
import sys

def update_headers_in_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # Padrão para encontrar a seção de headers
    headers_pattern = re.compile(r'headers:\s*\[(.*?)\]', re.DOTALL)
    headers_match = headers_pattern.search(content)

    if not headers_match:
        print(f"No headers section found in {file_path}")
        return False

    headers_section = headers_match.group(1)

    # Atualizar descrições dos headers existentes
    updated_headers = headers_section

    # Site-Id
    updated_headers = re.sub(
        r'name:\s*\'Site-Id\',\s*value:\s*\'[^\']*\',\s*description:\s*\'[^\']*\'',
        r"name: 'Site-Id',\n            value: 'YOUR_SITE_ID',\n            description: 'Site identifier',\n            required: 'Yes'",
        updated_headers
    )

    # API-ClientUsername
    updated_headers = re.sub(
        r'name:\s*\'API-ClientUsername\',\s*value:\s*\'[^\']*\',\s*description:\s*\'[^\']*\'',
        r"name: 'API-ClientUsername',\n            value: 'YOUR_USERNAME',\n            description: 'Username',\n            required: 'Yes'",
        updated_headers
    )

    # API-ClientPassword
    updated_headers = re.sub(
        r'name:\s*\'API-ClientPassword\',\s*value:\s*\'[^\']*\',\s*description:\s*\'[^\']*\'',
        r"name: 'API-ClientPassword',\n            value: 'YOUR_PASSWORD',\n            description: 'Password',\n            required: 'Yes'",
        updated_headers
    )

    # Content-Type
    updated_headers = re.sub(
        r'name:\s*\'Content-Type\',\s*value:\s*\'[^\']*\',\s*description:\s*\'[^\']*\'',
        r"name: 'Content-Type',\n            value: 'application/json',\n            description: 'Content-Type',\n            required: 'Yes'",
        updated_headers
    )

    # Accept-version
    updated_headers = re.sub(
        r'name:\s*\'Accept-version\',\s*value:\s*\'[^\']*\',\s*description:\s*\'[^\']*\'',
        r"name: 'Accept-version',\n            value: '2',\n            description: 'API version',\n            required: 'Yes'",
        updated_headers
    )

    # Verificar se Authorization já existe
    if 'name: \'Authorization\'' not in updated_headers:
        # Adicionar Authorization após o último header
        last_header_end = updated_headers.rfind('}')
        if last_header_end != -1:
            updated_headers = updated_headers[:last_header_end+1] + ',\n          {\n            name: \'Authorization\',\n            value: \'Basic\',\n            description: \'Basic authentication header (Base64 encoded username:password)\',\n            required: \'Yes\'\n          }' + updated_headers[last_header_end+1:]
    else:
        # Atualizar Authorization existente
        updated_headers = re.sub(
            r'name:\s*\'Authorization\',\s*value:\s*\'[^\']*\',\s*description:\s*\'[^\']*\'',
            r"name: 'Authorization',\n            value: 'Basic',\n            description: 'Basic authentication header (Base64 encoded username:password)',\n            required: 'Yes'",
            updated_headers
        )

    # Atualizar o conteúdo do arquivo
    updated_content = content.replace(headers_match.group(1), updated_headers)

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(updated_content)

    print(f"Updated headers in {file_path}")
    return True

def update_headers_in_request_example(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # Padrão para encontrar a seção de headers no requestExample
    request_example_pattern = re.compile(r'requestExample:\s*\{[^}]*headers:\s*\[(.*?)\]', re.DOTALL)
    request_example_match = request_example_pattern.search(content)

    if not request_example_match:
        print(f"No request example headers section found in {file_path}")
        return False

    headers_section = request_example_match.group(1)

    # Atualizar headers no exemplo de requisição
    updated_headers = headers_section

    # Authorization
    if 'name: \'Authorization\'' in updated_headers:
        updated_headers = re.sub(
            r'name:\s*\'Authorization\',\s*value:\s*\'[^\']*\'',
            r"name: 'Authorization',\n            value: 'Basic'",
            updated_headers
        )
    else:
        # Adicionar Authorization após o último header
        last_header_end = updated_headers.rfind('}')
        if last_header_end != -1:
            updated_headers = updated_headers[:last_header_end+1] + ',\n          {\n            name: \'Authorization\',\n            value: \'Basic\'\n          }' + updated_headers[last_header_end+1:]

    # Atualizar o conteúdo do arquivo
    updated_content = content.replace(request_example_match.group(1), updated_headers)

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(updated_content)

    print(f"Updated request example headers in {file_path}")
    return True

def find_and_update_endpoint_files(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') and not file.startswith('index.'):
                file_path = os.path.join(root, file)

                # Verificar se é um arquivo de endpoint
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    if 'EndpointPage' in content and ('headers:' in content or 'authentication:' in content):
                        print(f"Processing endpoint file: {file_path}")
                        update_headers_in_file(file_path)
                        update_headers_in_request_example(file_path)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        directory = sys.argv[1]
    else:
        directory = "src/pages/endpoints"

    find_and_update_endpoint_files(directory)
