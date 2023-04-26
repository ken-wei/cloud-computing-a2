# from __future__ import print_function
# import sys
from flask import Blueprint
from flask import jsonify
from flask import request
import boto3
import json


client = boto3.client('dynamodb', region_name='us-east-1') 

# Initialise the table and add in some accounts
try:
    table = client.create_table(
        TableName='Accounts',
        KeySchema=[
            {   
                "AttributeName": "username", 
                "KeyType": "HASH"
            }
        ],
        AttributeDefinitions=[
        {
            'AttributeName': 'username',
            'AttributeType': 'S'
        }
    ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 5,
            'WriteCapacityUnits': 5,
        }
    )
    # Wait until the table exists.
    client.get_waiter('table_exists').wait(TableName='Accounts')
    # Print out some data about the table.
    print("Accounts table created")

    # Get tables from dynamodb
    dynamodb = dynamodb = boto3.resource('dynamodb',region_name='us-east-1') 
    table = dynamodb.Table('Accounts')
    

    with open("accounts.json") as json_file:
        accounts = json.load(json_file)
        for account in accounts:
            username = account["username"]
            password = account["password"]

            print("Adding Account: ", username, password)

            table.put_item (
                Item={
                    "username": username,
                    "password": password
                }
            )

except client.exceptions.ResourceInUseException:
    # do something here as you require
    print("Table Exists!")
    pass



account_api = Blueprint('account_api', __name__)

@account_api.route("/user", methods=['POST'])
def authenticate():
    response = client.get_item(
        Key={
            'username': { 
                'S': request.get_json()["id"],
            }
        },
        TableName="Accounts",
    )
    if ('Item' in response):
        print(response['Item'], flush=True)
        if (response['Item']['password']['S'] == request.get_json()['password']):
            return jsonify({}), 200
        else:
            return jsonify({}), 404
    else:
        print("Account not found", flush=True)
        return jsonify({}), 404    
    # if (request.get_json()["id"] == "user@test.com" and request.get_json()["password"] == "password"):
    #     return jsonify({"authenticated": "true"}), 200
    # else:
    #     return jsonify({}), 404

@account_api.route("/signup", methods=['POST'])
def registerAccount():
    id = request.get_json()['id']
    password = request.get_json()['password']
    print("SIGN UP" , id , "   " , password, flush=True)
    # dynamodb = boto3.resource('dynamodb')
    # table = dynamodb.Table('Accounts')
    response = client.get_item(
        Key={
            'username': { 
                'S': id,
            }
        },
        TableName="Accounts",
    )
    
    if ('Item' in response):
        print(response['Item'], flush=True)
        return jsonify({}), 409  
    elif ('Item' not in response):
        print("Put Item", flush=True)
        client.put_item(
            TableName='Accounts',
            Item={
                'username': {
                    'S': id
                },
                'password': { 
                    'S': password
                }
            }
        )
        return jsonify({}), 200 