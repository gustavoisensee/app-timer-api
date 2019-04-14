# My finances api

This is the RESTful api in nodejs with mongodb which provides information to my-finances app.

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
* EMAIL_PATH_RESET_PASSWORD='http://localhot:3001/account/reset-password'

## Run the project

* yarn start

## Run lint

* yarn lint:js

## Status

[![Build Status](https://travis-ci.com/gustavoisensee/my-finances-api.svg?branch=master)](https://travis-ci.com/gustavoisensee/my-finances-api)
