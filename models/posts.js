module.exports = (sequelize, Sequelize) => {
  const Posts = sequelize.define("posts", {
    title: {
      type: Sequelize.STRING(30),
    },
    txt: {
      type: Sequelize.TEXT
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    usersLiked: {
      type: Sequelize.JSON //NO ARRAY TYPE FOR MYSQL IN SEQUELIZE
    },
    usersDisliked: {
      type: Sequelize.JSON
    },
    likes: {
      type: Sequelize.INTEGER
    },
    dislikes: {
      type: Sequelize.INTEGER
    },
    imageUrl: {
      type: Sequelize.STRING,
      // validate: {
      //   isUrl: true
      // } Reactivate this for build. Unable in dev mode due to localhost:3000 rejected by isUrl method
    }
  });

  return Posts;
};