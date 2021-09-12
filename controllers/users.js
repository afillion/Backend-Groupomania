const db = require('../models');
const Users = db.users;
const jwt = require('jsonwebtoken');

exports.getAll = (req, res, next) => {
  Users.findAll().then( (data) => {
    res.status(200).json(data);
  }).catch( (err) => {
    res.status(400).json({err});
  });
};