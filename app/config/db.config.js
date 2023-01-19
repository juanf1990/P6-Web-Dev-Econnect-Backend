module.exports = {
  DB: `postgresql://postgres:XAZWjGcVozJXBKhlJGr3@containers-us-west-167.railway.app:7525/railway`,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
