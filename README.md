# App timer api

This is the RESTful api in nodejs with mongodb which provides information to app-timer.

## Pre requirements to run the project

You must have in the root folder the .env file with the following keys

* PORT=3000
* DB_PATH='mongo-path'
* DB_NAME='database-name'
* JWT_EXPIRES_TOKEN='2h'
* JWT_SECRET='choose-secret'
* EMAIL_HOST='smtp.mail.com'
* EMAIL_PORT=465
* EMAIL_SECURE=true
* EMAIL_USER='user@mail.com'
* EMAIL_PASSWORD='password'

## Run the project

* yarn start