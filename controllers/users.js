const db = require('../models');
const Users = db.users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
  const item = req.body.user;


  bcrypt.hash(req.body.user.pwd, 10)
  .then(hash => {
      item.pwd = hash;
      Users.create(item).then( data => {
        res.status(200).json(data);
      }).catch( err => {
        res.status(400).json({error: err, message: "CANNOT CREATE USER !"});
      } );
    })
  .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  console.log(req.body);
  Users.findOne( {where :{ email: req.body.user.email }})
    .then(user => {
      console.log(user);
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' }); //401:NO AUTHORIZED
      }
      bcrypt.compare(req.body.user.pwd, user.pwd)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error: error }));
    })
    .catch(error => res.status(404).json({ error: error }));
};

exports.getAll = (req, res, next) => {
  Users.findAll().then( (data) => {
    res.status(200).json(data);
  }).catch( (err) => {
    res.status(400).json({err});
  });
};