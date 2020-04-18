const express = require('express');
const router = express.Router();
const City = require("../models/cityModel");
const Itinerary = require('../models/itineraryModel');
const auth = require('../middleware/auth');

router.get('/all', auth, (req, res) => { //for testing only
  Itinerary.find({})
    .then(files => {
        res.send(files)
    })
    .catch(err => console.log(err));
});

router.route("/:id").get(auth, (req, res) => {
  Itinerary.find({ city: req.params.id })
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
      res.json(itineraries); //res.json() normally used to return a nested object/array to a request from client (React server)
    });
});

// router.get('/:id', async (req, res, next) => { //query an itinerary   
//   try {
//     const itineraries = await Itinerary.find({city: req.params.id}); //point to ref model "City"
//     res.json(itineraries);
//   } catch (error) {
//     next(error);
//   } 
// });

router.get("/favorites/user", auth, (req, res) => {
  Itinerary.find({ _id: { $in: req.user.favorites } }) //find all 'id' in req.user.favorites array
    .populate("city", "name")
    .exec((err, itineraries) => {
      if (err) {
        res.status(400).send(err);
        return;
      }
      res.json(itineraries);
    });
});

module.exports = router;