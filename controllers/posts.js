const db = require('../models');
const Posts = db.posts;
const jwt = require('jsonwebtoken');
const fs = require('fs'); //for File System. Give access for file system functions

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

exports.like = (req, res, next) => {
  console.log(req.params);
  Posts.findOne( { where: { id: req.params.id }})
  .then( (post) => {
    // var actualLike = post.usersLiked.find( user => {
    //   console.log(user);
    //   return user == req.body.userId;
    // });
    // var actualDislike = post.usersDisliked.find( user => {
    //   console.log(user);
    //   return user == req.body.userId;
    // });
    if (req.body.like > 0) {
      post.likes++;
      if (post.usersLiked.length === 0) {
        post.usersLiked += req.body.userId;
      }
      else {
        post.usersLiked += " ," + req.body.userId;
      }
    }
    else if (req.body.like < 0) {
      post.dislikes++;
      if (post.usersDisliked.length === 0) {
        post.usersDisliked += req.body.userId;
      }
      else {
        post.usersDisliked += " ," + req.body.userId;
      }    }
    // else if (req.body.like == 0) {
    //   if (actualLike !== undefined) {
    //     post.usersLiked.splice(post.usersLiked.indexOf(req.body.userId), 1);
    //     post.likes--;
    //   }
    //   if (actualDislike !== undefined) {
    //     post.usersDisliked.splice(post.usersDisliked.indexOf(req.body.userId), 1);
    //     post.dislikes--;
    //   }
    // }

    // console.log(array_like);
    // console.log(JSON.parse(array_like));
    // console.log(JSON.stringify(array_like));
    // console.log(JSON.parse(JSON.stringify(array_like)));

    post.update(
      {
        usersLiked: post.usersLiked,
        usersDisliked: post.usersDisliked,
        likes: post.likes,
        dislikes: post.dislikes
      },
      { where: { id: req.params.id } }
    )
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
  })
  .catch( error => {
    res.status(404).json({ error });
  });
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