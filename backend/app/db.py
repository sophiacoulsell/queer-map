from flask import Flask
from flask_pymongo import pymongo

CONNECTION_STRING = "mongodb+srv://alexren:alexren@queer-maps-cluster.lvyzc.mongodb.net/queer-maps-db?retryWrites=true&w=majority&appName=queer-maps-cluster"
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('queer-maps-db')
user_collection = pymongo.collection.Collection(db, 'user_collection')
