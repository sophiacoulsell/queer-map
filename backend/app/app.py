from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import os
from bson import ObjectId
from db import db
from pymongo import MongoClient


dotenv_path = os.path.join(os.path.dirname(__file__), '..', '..','queer-map-site', '.env')
load_dotenv(dotenv_path)  # Load environment variables from .env file


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# MongoDB configuration
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)

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

if __name__ == '__main__':
    app.run(port=5000, debug=True)