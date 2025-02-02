from flask import Flask, render_template, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import os

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)
CORS(app)

# MongoDB configuration
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)

# Replace with your actual Google Places API key
GOOGLE_PLACES_API_KEY = os.getenv("REACT_APP_GOOGLE_MAPS_API_KEY")

@app.route("/api/places", methods=["GET"])
def get_places():
    lat = request.args.get("latitude", default=34.0522, type=float)  # Default to LA
    lng = request.args.get("longitude", default=-118.2437, type=float)
    radius = request.args.get("radius", default=8046, type=int)
    query = "queer"

    # Google Places API URL
    places_url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword={query}&location={lat},{lng}&radius={radius}&key={GOOGLE_PLACES_API_KEY}"
    print(request.args)
    print(f"{lat}, {lng}")

    # Make a request to Google Places API
    response = requests.get(places_url)
    data = response.json()
    print(data)
    # Extract relevant information from API response
    results = []
    if "results" in data:
        for place in data["results"]:
            results.append({
                "name": place.get("name"),
                "lat": place["geometry"]["location"]["lat"],
                "lng": place["geometry"]["location"]["lng"],
                "address": place.get("vicinity", "Unknown"),
                "rating": place.get("rating", "No rating"),
                "place_id": place.get("place_id"),
                "types": place.get("types")
            })

    return jsonify(results)


@app.route('/')
def index():
    return render_template('index.html')

#example route
@app.route('/add_data', methods=['POST'])
def add_data():
    data = request.json  # Get the JSON data from the POST request
    # Access the 'my_collection' collection in your MongoDB database
    collection = mongo.db.my_collection
    
    # Insert data into the MongoDB collection
    result = collection.insert_one(data)
    
    return jsonify(message="Data added", id=str(result.inserted_id)), 201

@app.route('/get_data', methods=['GET'])
def get_data():
    collection = mongo.db.my_collection
    # Fetch all documents in the collection
    data = collection.find()
    result = []
    for item in data:
        item['_id'] = str(item['_id'])  # Convert ObjectId to stringa
        result.append(item)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=5001)