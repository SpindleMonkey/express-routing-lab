// include express
var express = require('express');

// create a server
var app = express();

// include bodh-parser so request bodies are automagically built for us
var bodyParser = require('body-parser');

// include candyRouter
var candyRouter = require('./candyRouter.js');

/**
 * Middleware
 */

// send requests through body-parser before sending them to the controller
app.use(bodyParser.json());

// send all /candies requests to the candyRouter
app.use('/candies', candyRouter);

// start the server and tell it to listen on port 3000
app.listen(3000);