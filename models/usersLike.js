module.exports = (sequelize, Sequelize) => {
  const Userslike = sequelize.define("userslike", {
    userId: {
      type: Sequelize.INTEGER,
    },
    postId: {
      type: Sequelize.INTEGER,
    }
  });

  return Userslike;
};