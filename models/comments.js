module.exports = (sequelize, Sequelize) => {
  const Comments = sequelize.define("comments", {
    // userId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false
    // },
    // postId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false
    // },
    txt: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  });

  return Comments;
};