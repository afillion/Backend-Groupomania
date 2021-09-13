const db = require('../models');
const Posts = db.posts;
const Userslike = db.userslike;
const Usersdislike = db.usersdislike;
const jwt = require('jsonwebtoken');
const fs = require('fs'); //for File System. Give access for file system functions
const { throws } = require('assert');

exports.new = (req, res, next) => {
  console.log("posts create Ctrl");
  // console.log("req body:", req.body);
  // console.log("req title:", req.title);
  // console.log("req params:", req.params);
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

exports.modifOne = (req, res, next) => {
  Posts.findOne({ where: { id: req.params.id } })
  .then( oldpost => {
    oldpost.update(
      {
        title: req.body.post.title,
        txt: req.body.post.txt,
        imageUrl: req.body.post.imageUrl
      },
      {where: {id: req.params.id}}
    )
    .then( () => {
      res.status(200).json({ message : 'Post modifié' });
    })
    .catch( error => {
      res.status(400).json({ error });
    });
  })
  .catch( error => {
    res.status(404).json({ error });
  });
}

exports.deleteOne = (req, res, next) => {
  Posts.findOne( { where: { id: req.params.id }})
  .then( (post) => {
    if (post !== null) {
      Posts.destroy( {where: { id: req.params.id } } )
      .then( () => {
        res.status(200).json({ message: "Post deleted" });
      })
      .catch( err => { error: err });
    }
    else {
      throw "Post doesn't exists"
    }
  })
  .catch( err => {
    res.status(404).json({ error: err });
  });
};

var user_isLiked = false;
var user_isDisliked = false;
exports.like = (req, res, next) => {
  console.log("\n", req.params, "\n");
  console.log("\n req.body: \n");
  console.log(req.body.userId);
  console.log(req.body.postId);

  console.log(this);



  Userslike.findOne({ where: { userId: req.body.userId, postId: req.params.id }})
  .then( item => {
    if (item) {
       this.user_isLiked = true;
    }
    return;
  })
  .catch( err => {
    res.status(500).json({ error: err});
  });
  Usersdislike.findOne({ where: { userId: req.body.userId, postId: req.params.id }})
  .then( item => {
    if (item) {
      var user_isDisliked = true;
    }
    return;
  })
  .catch( err => {
    res.status(500).json({ error: err });
  });

  if (req.body.like > 0) {
    Userslike.create({
      postId: req.params.id,
      userId: req.body.userId
    }).then( item => {

    })
    .catch( err => {
      res.status(500).json({ error: err });
    });
  }
  else if (req.body.like < 0) {
    Usersdislike.create({
      postId: req.params.id,
      userId: req.body.userId
    }).then( item => {

    })
    .catch( err => {
      res.status(500).json({ error: err });
    })
  }

  console.log("user_isLiked ? ", user_isLiked);
  console.log("user_isDisliked ? ", user_isDisliked);
};

exports.getOne = (req, res, next) => {
  Posts.findOne( {where :{ id: req.params.id }})
  .then( post => {
    res.status(200).json(post);
  })
  .catch( err => {
    res.status(404).json({ error: err });
  });
}

exports.getAll = (req, res, next) => {
  console.log("posts getAll Ctrl");
  Posts.findAll().then( (data) => {
    res.status(200).json(data);
  }).catch( (err) => {
    res.status(500).json({err});
  });
};