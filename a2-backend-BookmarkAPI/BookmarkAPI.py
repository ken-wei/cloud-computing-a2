# from __future__ import print_function
# import sys
import json
from flask import Blueprint
from flask import jsonify
from flask import request

# Imports the Google Cloud client library
from google.cloud import datastore

# Instantiates a client
client = datastore.Client()

# The kind for the entity
kind = 'Bookmark'


bookmark_api = Blueprint('bookmark_api', __name__)

@bookmark_api.route("/bookmark", methods=['POST'])
def addBookMark():
    # Get user id from the frontend
    userID = request.get_json()['userID']
    
    # Setup the key for the entity
    key = client.key(
        'Users', userID, 'Bookmark', request.get_json()['placeID'])
    bookmark = datastore.Entity(key=key)

    # Insert all necessary Bookmark data into the Entity
    bookmark['placeID']        = request.get_json()['placeID']
    bookmark['placeName']      = request.get_json()['placeName'].encode('utf-8')
    bookmark['lat']            = request.get_json()['lat']
    bookmark['lng']            = request.get_json()['lng']
    bookmark['rating']         = request.get_json()['rating']
    bookmark['totalRatings']   = request.get_json()['totalRatings']
    bookmark['address']        = request.get_json()['address']

    # Put newly created entity into google datastore
    client.put(bookmark)

    return jsonify({}), 200


@bookmark_api.route("/getBookmarks", methods=['GET'])
def allBookMarks():
    # Get userID from the url param
    userID = request.args.get('username')

    # Ancestor key for Users
    ancestor = client.key('Users', userID)
    query = client.query(kind='Bookmark', ancestor=ancestor)
    
    # Create a bookmark dict to return to the frontend
    bookmarks = {}
    index = 0
    for q in query.fetch():
        bookmarks[index] = {
                      'placeID'     : q['placeID'], 
                      'placeName'   : q['placeName'].decode('utf-8'),
                      'lat'         : q['lat'],
                      'lng'         : q['lng'],
                      'rating'      : q['rating'],
                      'totalRatings': q['totalRatings'],
                      'address'     : q['address']
                    }
        index += 1
    
    # Return all bookmarks of the current user
    return jsonify(bookmarks), 200


@bookmark_api.route("/deleteBookmark", methods=['DELETE'])
def deleteBookmark():
    # Get user ID
    userID = request.args.get('username')
    placeID = request.args.get('placeID')
    
    # Setup the key for the 
    delete_key = client.key('Users', userID, 'Bookmark', placeID)
    # Delete the entity using the key from Google DataStore
    client.delete(delete_key)

    return jsonify({}), 200