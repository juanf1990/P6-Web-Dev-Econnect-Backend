module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
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
