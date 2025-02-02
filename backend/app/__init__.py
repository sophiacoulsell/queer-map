from flask import Flask, render_template
from flask_pymongo import PyMongo
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)
CORS(app)

# MongoDB configuration
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)


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
        item['_id'] = str(item['_id'])  # Convert ObjectId to string
        result.append(item)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)