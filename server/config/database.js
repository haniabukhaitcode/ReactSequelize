const Sequelize = require("sequelize");

// Option 1: Passing parameters separately
const sequelize = new Sequelize("sequelize", "root", "root", {
  host: "localhost",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
module.exports = sequelize;
