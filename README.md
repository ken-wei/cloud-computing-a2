# s3693288-CloudComputing-A2

Frontend (ReactJS) (hosted on Google Cloud Kubernetes Engine)
- Features
  - Search for locations
  - Display tourists spots around that location
  - Show 5-Days Weather Forecast
  - Able to bookmark locations (Need to register an account)
  - Able to delete bookmarks (Need to register an account)

Backend Account API (hosted on AWS Elastic Container Service)
- handle connection between the frontend to Amazon DynamoDB
  - register account
  - authenticate account
  
Backend Bookmark API (hosted on Google Cloud App Engine)
- handle connection between the frontend to Google Datastore


