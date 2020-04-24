const express = require('express');
const router = express.Router();
const User = require("../models/userModel");
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
  Itinerary.find({ city: req.params.id }) //response the city with id matched
    .populate("city", "name") //refer to city object and city.name
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

// router.get("/favorites/user", auth, (req, res) => {
//   console.log('backend itinerary User :', req.user );
//   User.findById({_id: req.user}).then (function(user) {
//     console.log('backend User :', user );
//     Itinerary.find({ _id: { $in: user.favorites } }) //find all 'id' in req.user.favorites array & matching with itinerary._id
//       .populate("city", "name")
//       .exec((err, itineraries) => {
//         if (err) {
//           res.status(400).send(err);
//           return;
//         }
//         //console.log('backend itinerary._id:', itineraries);
//         res.json(itineraries); //response city object of an itinerary id matched
//       });
//     }
//   )
// });

// router.get("/favorites/user", auth, (req, res) => {
//   console.log('backend itinerary User :', req.user );
//   let favorites = [];
//   User.findById(req.user.id)
//     .select('-password')
//     .populate("favorites")
//     .exec((err, itineraries) => {
//       if (err) {
//         res.status(400).send(err);
//         return;
//       }
//       console.log('backend user itinerary:', itineraries);
//       res.json(itineraries);
//     }); 
//   console.log('backend itinerary favorites :', favorites );  
// });

module.exports = router;