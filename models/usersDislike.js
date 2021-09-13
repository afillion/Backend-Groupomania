module.exports = (sequelize, Sequelize) => {
  const Usersdislike = sequelize.define("usersdislike", {
    userId: {
      type: Sequelize.INTEGER,
    },
    postId: {
      type: Sequelize.INTEGER,
    }
  });

  return Usersdislike;
};