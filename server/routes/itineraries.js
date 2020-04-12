const express = require('express');
const router = express.Router();
const City = require("../models/cityModel");
const itineraryModel = require('../models/itineraryModel');
const auth = require('../middleware/auth');

router.get('/all',  auth, (req, res) => { //for testing only
  itineraryModel.find({})
    .then(files => {
        res.send(files)
    })
    .catch(err => console.log(err));
});

router.route("/:id").get( auth, (req, res) => {
  itineraryModel.find({ city: req.params.id })
    .populate("city", "name")
    .exec((err, itineraries) => {
      if (err) {
        res
          .status(400)
          .send({
            status: 400,
            message:
              "This city does not exist, mate. How... how did you even get to this page?"
          });
        return;
      }
      res.json(itineraries);
    });
});

// router.get('/:id', async (req, res, next) => { //query an itinerary   
//   try {
//     const itineraries = await itineraryModel.find({city: req.params.id}); //point to ref model "City"
//     res.json(itineraries);
//   } catch (error) {
//     next(error);
//   } 
// });

module.exports = router;