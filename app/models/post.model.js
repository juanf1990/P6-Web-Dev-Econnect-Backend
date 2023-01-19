module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    imgUrl: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.UUID,
    },
    readBy: {
      type: Sequelize.ARRAY(Sequelize.UUID),
    },
  });

  return Post;
};
