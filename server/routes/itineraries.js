const express = require('express');
const router = express.Router();
const City = require("../models/cityModel");
const itineraryModel = require('../models/itineraryModel');

router.get('/all', (req, res) => { //for testing only
  itineraryModel.find({})
    .then(files => {
        res.send(files)
    })
    .catch(err => console.log(err));
});

router.get('/:id', (req, res) => { //query an itinerary 
  itineraryModel.find({ city: req.params.id }) //point to ref model "City"
    .populate("city", "name") //city.name in itineraryModel refer from cityModel
    .exec((err, itineraries) => {
      if (err) {
        res.status(400).send({
          status: 400,
          message:
            "Guy, the city is not in the system, need your experience shown off!"
        });
        return;
      }
      res.json(itineraries); //called as "res.data" in itineraryAction
    });
});

module.exports = router;