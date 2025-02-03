from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from urllib.request import urlretrieve
import time
import json
import os

BASE_DIR = os.path.dirname(os.path.join(os.path.abspath(__file__)))
BASE_DIR = os.path.dirname(BASE_DIR)
BACKEND_DIR = os.path.join(BASE_DIR, "backend")
PUBLIC_DIR = os.path.join(BASE_DIR, "public")  # public 디렉토리
IMG_DIR = os.path.join(PUBLIC_DIR, "imgs")  # public/imgs 디렉토리
JSON_PATH = os.path.join(PUBLIC_DIR, "news_data.json")  # public/news_data.json

def scrape_news():
    
    if os.path.exists(IMG_DIR):
        for file in os.scandir(IMG_DIR):
            os.remove(file.path)
        print("🗑 img dir deleted")
    else:
        os.makedirs(IMG_DIR)

        print("📁 img dir created")


    chromedriver_path = os.path.join(BACKEND_DIR, "chromedriver.exe")

    # Selenium 설정
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # 브라우저 창을 띄우지 않음
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

    # Chrome WebDriver 경로 설정 (ChromeDriver가 설치되어 있어야 함)
    service = Service(executable_path=chromedriver_path)  # chromedriver 경로 변경
    driver = webdriver.Chrome(service=service, options=chrome_options)

    # 네이버 뉴스 정치 섹션 URL
    url = "https://news.naver.com/section/100"
    driver.get(url)

    data_list = []

    # 페이지가 로드될 때까지 대기
    try:
        # Lazy Loading이 끝날 때까지 대기
        elements = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "#newsct > div.section_component.as_section_headline._PERSIST_CONTENT > div.section_article.as_headline._TEMPLATE"))
        )
        
        links = driver.find_elements(By.CSS_SELECTOR, ".sa_text > a")
        headlines = driver.find_elements(By.CSS_SELECTOR, ".sa_text_strong")
        imgs = driver.find_elements(By.CSS_SELECTOR, ".section_article img")
        
        for idx, (headline,link, img) in enumerate(zip(headlines,links, imgs)):
            title = headline.text  # 기사 제목
            link_url = link.get_attribute("href")  # 기사 링크
            img_url = img.get_attribute("src")  # 이미지 URL
            
            img_path = os.path.join(IMG_DIR, f"news_thumbnail_{idx}.jpg")
            urlretrieve(img_url, img_path)
            
            data_list.append({
                "title": title,
                "link": link_url,
                "image":f"/imgs/news_thumbnail_{idx}.jpg"
            })

            
    except Exception as e:
        print("요소를 찾지 못했습니다:", e)
        driver.quit()
        exit()


    # 드라이버 종료
    driver.quit()

    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(data_list, f, ensure_ascii=False, indent=4)

    print("✅ 데이터가 news_data.json 파일에 저장되었습니다.")
