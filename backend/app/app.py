from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import requests
import os
from bson import ObjectId
from db import db
from pymongo import MongoClient


dotenv_path = os.path.join(os.path.dirname(__file__),'.env')
load_dotenv(dotenv_path)  # Load environment variables from .env file


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

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
    print(f"{lat}, {lng}")

    # Make a request to Google Places API
    response = request.get(places_url)
    data = response.json()
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


# # Try to access the collection and prnpm int it
try:
    events_collection = mongo.db.events
    print("Events collection:", events_collection)
except Exception as e:
    print("Error accessing events collection:", e)

@app.route("/test")
def test():
    db.db.collection.insert_one({"name": "John"})
    return "Connected to the data base!"

# Create Event Endpoint
@app.route("/create_event", methods=["POST"])
@cross_origin()  # Allow React frontend to access
def create_event():
    if request.method == "OPTIONS":  # Handling preflight request
        response = jsonify({"message": "CORS preflight successful"})
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Methods", "*")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
        return response, 200
    
    print("request data:")
    data = request.json
    print("data received:", data)
    required_fields = ["name", "description", "date", "location", "tags", "organizer"]
    print("Events collection:", events_collection)
    
    event = {
        "name": data["name"],
        "description": data["description"],
        "date": data["date"],
        "location": data["location"],  # Can be a string or object from Google API
        "tags": data["tags"],
        "organizer": data["organizer"]
    }

    inserted_id = events_collection.insert_one(event).inserted_id
    return jsonify({"message": "Event created", "id": str(inserted_id)}), 201
    print("Event created")

@app.route("/get_events", methods=["GET"])
@cross_origin()  # Allow React frontend to access
def get_events():
    # Query the events collection
    print("getting events")
    events = list(events_collection.find())  # Finds all documents in the "events" collection

    # Convert MongoDB ObjectId to string for JSON serialization
    for event in events:
        event['_id'] = str(event['_id'])

    return jsonify(events)  # Send data as JSON response

if __name__ == '__main__':
    app.run(port=5000, debug=True)
