const db = require('../models');
const Posts = db.posts;
const jwt = require('jsonwebtoken');

exports.new = (req, res, next) => {
  console.log("posts create Ctrl");
  console.log("req body:", req.body);
  console.log("req title:", req.title);
  console.log("req params:", req.params);
  const item = req.body.post;
  Posts.create(item).then( (post) => {
    res.status(200).json( { 
      message: "Posts created !", 
      post: post
    } );
  }).catch( err => {
    res.status(500).json( { error: err, message: "Cannot create post !" } );
  });
};

exports.getAll = (req, res, next) => {
  console.log("posts getAll Ctrl");
  Posts.findAll().then( (data) => {
    res.status(200).json(data);
  }).catch( (err) => {
    res.status(500).json({err});
  });
};