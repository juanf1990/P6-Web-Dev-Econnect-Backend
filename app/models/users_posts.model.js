module.exports = (sequelize, Sequelize) => {
  const Users_Posts = sequelize.define("users_posts", {
    userId: {
      type: Sequelize.UUID,
      foreignKey: true,
    },
    postId: {
      type: Sequelize.UUID,
      foreignKey: true,
    },
  });

  return Users_Posts;
};
