module.exports = (sequelize, Sequelize) => {
  const Posts = sequelize.define("posts", {
    title: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    txt: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    // userId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false
    // },
    // usersLiked: {
    //   type: Sequelize.STRING //NO ARRAY TYPE FOR MYSQL IN SEQUELIZE
    // },
    // usersDisliked: {
    //   type: Sequelize.STRING
    // },
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