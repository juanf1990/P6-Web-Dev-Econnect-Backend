const { process } = require("dotenv");
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, {
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.posts = require("./post.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);

db.posts.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});
db.users.hasMany(db.posts, {
  foreignKey: "userId",
  as: "posts",
});

module.exports = db;
