from flask import Flask, jsonify
import json
import web_scrapper
import os

app = Flask(__name__)

@app.route('/news', methods=['GET'])
def get_news():
    web_scrapper.scrape_news()
    json_path = web_scrapper.JSON_PATH
    if os.path.exists(json_path):
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
    else:
        data = {"error": "news_data.json not found"}
    return jsonify(data)

@app.route("/", methods=["GET"])
def index():
    return "hello"

if __name__ == "__main__":
    app.run(debug=True)