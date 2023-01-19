require("dotenv").config();

module.exports = {
  DB: process.env.DATABASE_URL,
  dialect: process.env.DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
