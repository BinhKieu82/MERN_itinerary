/* this middleware will be placed right after the path of a route, 
that prevent other without logging in can do any action. it helps app more sercured */
const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token =  req.header('x-auth-token'); //token is the value of the header key
  if(!token) return res.status(401).json({ msg: 'unauthorized!'}) //check for token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret')); //verify token 
    req.user = decoded; //add user from payload
    next();
  } catch(e) {
    res.status(400).json({ msg: 'Token is not valid' })
  }
}
module.exports = auth;
//config.get() will use secret text to create a token