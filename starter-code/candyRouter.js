// include express
var express = require('express');

// include body-parser
var bodyParser = require('body-parser');

// create a router object
var router = express.Router();

// populate our candies 'database' with some starter candies
var candies = [
  {id: 1, name: "chocolate covered peanuts", color: "brown"},
  {id: 2, name: "red hots", color: "red"},
  {id: 3, name: "almond m&m's", color: "multi"},
  {id: 4, name: "reese's peanut butter cups", color: "brown"},
];

/**
 * Routes & Controllers
 */

// INDEX - return the entire candies db
router.get('/', function(req, res) {
  res.json(candies);
});

// SHOW - return a single candy object
router.get('/:id', function(req, res) {
  // check the validity of the id in the request
  if (req.params.id > 0 && req.params.id <= candies.length) {
    // special case: if this id has been deleted, consider this a 404 error
    if (candies[req.params.id - 1] === null) {
      res.status(404).send('ERROR::candy id ' + req.params.id + ' not found');
    } else {
      // send the selected candy!
      res.json(candies[req.params.id - 1]);
    }
  } else {
    // id is out of range/does not exist
    res.status(404).send('ERROR::candy id ' + req.params.id + ' not found');
  }
});

// CREATE - add a new candy to the candies db
router.post('/', function(req, res) {
  // check that we got both name and color
  if (req.body.name && req.body.color) {
    // if an id is sent with the POST, ignore it; we'll create our own ID based
    // on the current candies db
    var newCandy = {
      id: candies.length + 1,
      name: req.body.name,
      color: req.body.color
    };

    // add the new candy to the db
    candies.push(newCandy);

    // new candy was successfully created/added
    res.status(200).send('new candy added');
  } else {
    // did not get both the name and the color for the new candy, so the create failed
    res.status(422).send('ERROR::candy not added; need both name and color to create a new candy');
  }
});

// UPDATE - update the name and/or color of the selected candy
router.put('/:id', function(req, res) {
  // check the validity of the id in the request
  if (req.params.id > 0 && req.params.id <= candies.length) {
    if (candies[req.params.id - 1] === null) {
      // special case! this candy was deleted and can't be updated
      res.status(404).send('ERROR::candy id ' + req.params.id + ' not found');
    } else {
      // check we have name and/or color for the update
      if (req.body.name || req.body.color) {
        // we have name and/or color, so we can update the specified candy
        if (req.body.name) {
          candies[req.params.id - 1].name = req.body.name;
        }
        if (req.body.color) {
          candies[req.params.id - 1].color = req.body.color;
        }

        // update was successful
        res.status(200).send('candy updated');
      } else {
        // we didn't have name and/or color so we couldn't update the candy
        res.status(422).send('ERROR::candy not updated; object needs to include name and/or color');
      }
    }
  } else {
    // this id doesn't exist in our candy db
    res.status(404).send('ERROR::candy id ' + req.params.id + ' not found');
  }
});

// DESTROY - remove the selected candy from the candies db
router.delete('/:id', function(req, res) {
  // check the validity of the id in the request
  if (req.params.id > 0 && req.params.id <= candies.length) {
    // special case! this candy has already been deleted!
    if (candies[req.params.id - 1] === null) {
      res.status(404).send('ERROR::candy id ' + req.params.id + ' not found');
    } else {
      // delete the candy from the db
      candies[req.params.id - 1] = null;
      res.status(200).send('candy deleted');
    }
  } else {
    // this id doesn't exist in our candy db
    res.status(404).send('ERROR::candy id ' + req.params.id + ' not found');
  }
});

/**
 * Make this router public
 */
module.exports = router;