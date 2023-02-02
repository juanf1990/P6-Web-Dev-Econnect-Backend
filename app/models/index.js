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
db.users_posts = require("./users_posts.model.js")(sequelize, Sequelize);

db.posts.belongsToMany(db.users, {
  through: db.users_posts,
});
db.users.belongsToMany(db.posts, {
  through: db.users_posts,
});

module.exports = db;
