# chat-app

## Simple Chat application for NodeJS that makes use of Websockets.

### It is necessary to create a .env file with the environment variables that store the credentials of a MongoDB database. If the application is deployed on a Heroku-type server, it will be necessary to configure these environment variables.
```
PORT=xxxx
USER_NAME=xxxx
PASSWORD=xxxx
DBNAME=xxxx
```
### In the latter case, the port does not need to be set.

### The current configuration of the application is for a server type Nginx with the subpath '/ chat'. If you want to apply for another subpath, it will be necessary to replace said subpath in all the places where it is mentioned in the application. On a Heroku server the service path will be '/'.
