from flask import Flask, render_template
from flask_pymongo import PyMongo
from flask_cors import CORS
from dotenv import load_dotenv
from config import EVENTBRITE_TOKEN
import requests
import os

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)
CORS(app)

# MongoDB configuration
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)

def get_events(latitude, longitude, radius=10):
    url = "https://www.eventbriteapi.com/v3/events/search/"
    headers = {"Authorization": f"Bearer {EVENTBRITE_TOKEN}"}

    params = {
        "q": "lgbtq",
        "location.latitude": latitude,
        "location.longitude": longitude,
        "location.within": f"{radius}mi"
    }
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        return response.json().get('events', [])
    else:
        response.raise_for_status()

@app.route('/api/get-events', methods=['GET'])
def events():
    latitude = Flask.request.args.get('latitude')
    longitude = Flask.request.args.get('longitude')
    radius = Flask.request.args.get('radius', default=10, type=int)
    events = get_events(latitude, longitude, radius)
    return Flask.jsonify(events)

@app.route('/')
def index():
    return render_template('index.html')

#example route
@app.route('/add_data', methods=['POST'])
def add_data():
    data = Flask.request.json  # Get the JSON data from the POST request
    # Access the 'my_collection' collection in your MongoDB database
    collection = mongo.db.my_collection
    
    # Insert data into the MongoDB collection
    result = collection.insert_one(data)
    
    return Flask.jsonify(message="Data added", id=str(result.inserted_id)), 201

@app.route('/get_data', methods=['GET'])
def get_data():
    collection = mongo.db.my_collection
    # Fetch all documents in the collection
    data = collection.find()
    result = []
    for item in data:
        item['_id'] = str(item['_id'])  # Convert ObjectId to string
        result.append(item)
    return Flask.jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)