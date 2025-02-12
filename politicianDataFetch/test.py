import openpyxl
import os
import requests
import json
from dotenv import load_dotenv
#공공데이터포털
load_dotenv()
PUBLIC_API_KEY = os.environ.get('PUBLIC_API_KEY')
URL = f"http://apis.data.go.kr/9760000/PofelcddInfoInqireService/getPoelpcddRegistSttusInfoInqire"
params ={'serviceKey' : PUBLIC_API_KEY, 'pageNo' : '1', 'numOfRows' : '10', 'sgId' : '20250402', 'sgTypecode' : '11', 'sggName' : '', 'sdName' : '', 'resultType' : 'json' }
response = requests.get(URL, params=params)

if response.status_code == 200:
    # data = response.json()
    # print(data)
    data = response.content.decode('utf-8')
    print(data)
else:
    print("API 요청 실패:", response.status_code)

