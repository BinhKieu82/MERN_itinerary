//routes/auth.js authenticate the user credentials either match with the database or not
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');


/* POST user */
router.post("/", function(req, res, next) { //signup backend route
  const { email, password } = req.body;
  if(!email || !password) { //simple validation input fields
    return res.status(400).json({ msg: 'Please fill up all your fields' }); 
  }
  User.findOne({ email }) //validate whether email existed or not
    .then(user => {
      if(!user) return res.status(400).json({ msg: 'User does not exist' });
      bcrypt.compare(password, user.password) //return true or false 
        .then(isMatch => {
          if(!isMatch) return res.status(400).json({ mgs: 'Password is not correct'});

          //when plain text password match with the hashed one
          //again create a token and response to client
          jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 }, //last in 1 hour
            (err, token) => {
              if(err) throw err;
              
              //response the below package to localStorage
              res.json ({ //passed the authentification, user allows to go further
                token,
                user: {                  
                  id: user.id,
                  name: user.name,
                  email: user.email                  
                }
              });
            }
          )
        })
    })
});

//Get user
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password') //dis-regard password (not return password)
    .then(user => res.json(user)) //response user info without password to client
})

module.exports = router;
