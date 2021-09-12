const db = require('../models');
const Posts = db.posts;
const jwt = require('jsonwebtoken');

exports.getAll = (req, res, next) => {
  Posts.findAll().then( (data) => {
    console.log("posts getAll Ctrl");
    res.status(200).json(data);
  }).catch( (err) => {
    res.status(400).json({err});
  });
};