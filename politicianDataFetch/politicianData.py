# import openpyxl
import os
import requests
from dotenv import load_dotenv
#열린국회정보
load_dotenv()
ASSEMBLY_API_KEY = os.environ.get('ASSEMBLY_API_KEY')
URL = f"https://open.assembly.go.kr/portal/openapi/ALLNAMEMBER?KEY={ASSEMBLY_API_KEY}&Type=json&pIndex=1&pSize=10&AGE=21&NAAS_NM=추미애"

response = requests.get(URL)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print("API 요청 실패:", response.status_code)

