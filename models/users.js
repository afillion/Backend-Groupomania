module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    pseudo: {
      type: Sequelize.STRING(10),
      unique: true,
      allowNull: false
    },
    pwd: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.ENUM('admin', 'moderator', 'simple')
    },
    first_name: {
      type: Sequelize.STRING(10),
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    last_name: {
      type: Sequelize.STRING(10),
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    description: {
      type: Sequelize.STRING(155)
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    }
  });

  return Users;
};