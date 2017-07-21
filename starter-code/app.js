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

// make files available for reqs
app.use(express.static('public'));

// send requests through body-parser before sending them to the controller
app.use(bodyParser.json());

// send all /candies requests to the candyRouter
app.use('/candies', candyRouter);

// hey! let's be helpful and provide a little documentation
app.get('/', function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// start the server and tell it to listen on port 3000
app.listen(3000);