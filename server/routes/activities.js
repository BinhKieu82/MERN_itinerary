const express = require("express");
const router = express.Router();

const activityModel = require("../models/activityModel");

router.get('/:id', (req, res) => { //path to guide front-end action point to get data
  activityModel.find({ city: req.params.id }) //query a specified city by city id
    .populate("itinerary", "title") //access to ref itinerary in activityModel
    .populate("city", "name") //access to ref city in activityModel
    .exec((err, activities) => {
      res.json(activities); //return activityModel dataset from MongoBD, action function in front-end will receive it
    });
});

router.get('/', (req, res) => { //path to guide front-end action point to get data
  activityModel.find({}, (err, activities) => { //query all data in activityModel from MongoBD
    res.json(activities);
  });
});

module.exports = router;
