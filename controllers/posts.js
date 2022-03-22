const db = require('../models');
const Posts = db.posts;
const Users = db.users
const Userslike = db.userslike;
const Usersdislike = db.usersdislike;
const jwt = require('jsonwebtoken');
const fs = require('fs'); //for File System. Give access for file system functions

exports.new = (req, res, next) => {
  console.log("posts create Ctrl");
  console.log("req body:", req.body);
  console.log("req title:", req.title);
  console.log("req params:", req.params);
  console.log("req file:", req.file);
  let filename;
  req.file == undefined ? filename = '' : filename = req.file.filename;
  const data = {
    title: req.body.title,
    txt: req.body.txt,
    likes: 0,
    dislikes: 0,
    userId: req.body.userId,
    imageUrl: filename
  };
  console.log(data);
  Posts.create(data).then( (post) => {
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
    if (oldpost !== null) {
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
    }
    else {
      throw "Post doesn't exists"
    }
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

exports.user_isLiked = false;
exports.user_isDisliked = false;

exports.like = async (req, res, next) => {
  console.log("\n", req.params, "\n");
  console.log("\n req.body: \n");
  console.log(req.body.userId);
  console.log(req.body.postId);
  this.user_isLiked = false;
  this.user_isDisliked = false;

  await Userslike.findOne({ where: { userId: req.body.userId, postId: req.params.id }})
  .then( item => {
    console.log("test");
    if (item) {
      this.user_isLiked = true;
      console.log(this.user_isLiked);
    }
  })
  .catch( err => { res.status(500).json({ error: err, message: "1"}); });
  await Usersdislike.findOne({ where: { userId: req.body.userId, postId: req.params.id }})
  .then( item => {
    console.log("test");
    if (item) {
      this.user_isDisliked = true;
      console.log(this.user_isDisliked);
    }
  })
  .catch( err => { res.status(500).json({ error: err, message: "2" }); });
  
  if (req.body.like > 0) {
    console.log("in if statement : user_isLiked: ", this.user_isLiked);
    if (this.user_isLiked === true) {
      res.status(401).json({ message: "You already likes this post !" });
      return;
    }
    else if (this.user_isDisliked === true) {
      await Usersdislike.destroy({ where: { userId: req.body.userId, postId: req.params.id }})
      .catch( err => { res.status(500).json({ error: err }); });
      await Posts.findOne({ where: { id: req.params.id }})
      .then( async oldpost => {
        console.log(oldpost);
        await oldpost.update(
          {
            dislikes: oldpost.dislikes - 1
          },
          {where: {id: req.params.id}}
        )
        .catch( err => { res.status(500).json({ error: err }); });
      })
      .catch( err => { res.status(500).json({ error: err }); });
    }
    await Userslike.create({
      postId: req.params.id,
      userId: req.body.userId
    })
    .catch( err => { res.status(500).json({ error: err, message: "3" }); });
    await Posts.findOne({ where: { id: req.params.id }})
    .then( async oldpost => {
      console.log(oldpost);
        await oldpost.update(
          {
            likes: oldpost.likes + 1
          },
          {where: {id: req.params.id}}
        )
        .catch( err => { res.status(500).json({ error: err }); });
      })
    .catch( err => { res.status(500).json({ error: err }); });
    
  }
  else if (req.body.like < 0) {
    console.log("in if statement : user_isDisliked: ", this.user_isDisliked);
    if (this.user_isLiked === true) {
      await Userslike.destroy({ where: { userId: req.body.userId, postId: req.params.id }})
      .catch( err => { res.status(500).json({ error: err }); });
      await Posts.findOne({ where: { id: req.params.id }})
      .then( async oldpost => {
        console.log(oldpost);
        await oldpost.update(
          {
            likes: oldpost.likes - 1
          },
          {where: {id: req.params.id}}
        )
        .catch( err => { res.status(500).json({ error: err }); });
      })
      .catch( err => { res.status(500).json({ error: err }); });
    }
    else if (this.user_isDisliked === true) {
      res.status(401).json({ message: "You already dislikes this post !" });
      return;
    }
    await Usersdislike.create({
      postId: req.params.id,
      userId: req.body.userId
    })
    .catch( err => {res.status(500).json({ error: err, message: "4" }); });
    await Posts.findOne({ where: { id: req.params.id }})
    .then( async oldpost => {
      console.log(oldpost);
        await oldpost.update(
          {
            dislikes: oldpost.dislikes + 1
          },
          {where: {id: req.params.id}}
        )
        .catch( err => { res.status(500).json({ error: err }); });
      })
    .catch( err => { res.status(500).json({ error: err }); });
  }
  res.status(200).json({ message: "Likes updated !" });
};

exports.getOne = (req, res, next) => {
  console.log("post getOne Ctrl");
  Posts.findOne( {where :{ id: req.params.id }, include: [{model: Users}, {model: Comments, include: Users}]})
  .then( post => {
    if (post !== null) {
      res.status(200).json(post);
    }
    else {
      throw "Post doesn't exists"
    }
  })
  .catch( err => {
    res.status(404).json({ error: err });
  });
}

exports.getAll = (req, res, next) => {
  console.log("posts getAll Ctrl");
  Posts.findAll({
    include: [Users, Comments, Userslike, Usersdislike],
    order: [
      ['createdAt','DESC']
    ]
  }).then( async (data) => {
    res.status(200).json(data);
  }).catch( (err) => {
    res.status(500).json({err});
  });
};