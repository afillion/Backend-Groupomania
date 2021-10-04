const jwt = require('jsonwebtoken');
const db = require('../models');
const Users = db.users;


// Authentification middleware : Use token in req.headers.authorization and decode it to get userId.
// Search userId in BBD. If not find: this is a bad userId so auth fails
module.exports = (req, res, next) => {
  console.log(req.headers);
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    console.log(decodedToken);
    const userId = decodedToken.userId;
    Users.findOne( {where :{ id: userId }})
    .then( user => {
      if (user !== null) {
        next();
      }
      else {
        throw "Utilisateur inexistants";
      }
    })
    .catch( err => {
      res.status(401).json({ error: err });
    });
  } 
  catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};