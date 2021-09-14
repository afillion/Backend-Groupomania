const db = require('../models');
const Comments = db.comments;

exports.new = (req, res, next) => {
  console.log("Comments create Ctrl");
  // console.log("req body:", req.body);
  // console.log("req title:", req.title);
  // console.log("req params:", req.params);
  const item = req.body.comment;
  Comments.create(item).then( (comment) => {
    res.status(200).json( { 
      message: "Comments created !", 
      comment: comment
    } );
  }).catch( err => {
    res.status(500).json( { error: err, message: "Cannot create comment !" } );
  });
};

exports.modifOne = (req, res, next) => {
  Comments.findOne({ where: { id: req.params.id } })
  .then( oldcomment => {
    if (oldcomment !== null) {
      oldcomment.update(
        {
          txt: req.body.comment.txt
        },
        {where: {id: req.params.id}}
      )
      .then( () => {
        res.status(200).json({ message : 'commentaire modifié' });
      })
      .catch( error => {
        res.status(400).json({ error });
      });
    }
    else {
      throw "comment doest't exists"
    }
  })
  .catch( error => {
    res.status(404).json({ error });
  });
}

exports.deleteOne = (req, res, next) => {
  Comments.findOne( { where: { id: req.params.id }})
  .then( (comment) => {
    if (comment !== null) {
      Comments.destroy( {where: { id: req.params.id } } )
      .then( () => {
        res.status(200).json({ message: "comment deleted" });
      })
      .catch( err => { error: err });
    }
    else {
      throw "comment doesn't exists"
    }
  })
  .catch( err => {
    res.status(404).json({ error: err });
  });
};

exports.getOne = (req, res, next) => {
  Comments.findOne( {where :{ id: req.params.id }})
  .then( comments => {
    if (comments !== null) {
      res.status(200).json(comments);
    }
    else {
      throw "comment doesn't exists"
    }
  })
  .catch( err => {
    res.status(404).json({ error: err });
  });
}

exports.getAll = (req, res, next) => {
  console.log("comments getAll Ctrl");
  Comments.findAll().then( (data) => {
    res.status(200).json(data);
  }).catch( (err) => {
    res.status(500).json({err});
  });
};