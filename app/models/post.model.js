module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    imgUrl: {
      type: Sequelize.STRING,
      required: true,
    },
    description: {
      type: Sequelize.STRING,
      required: true,
    },
    userId: {
      type: Sequelize.UUID,
      foreignKey: true,
      required: true,
    },
    username: {
      type: Sequelize.STRING,
      foreignKey: true,
      required: true,
    },
    readBy: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: [],
    },
  });

  return Post;
};
