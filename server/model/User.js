const sequelize = require("sequelize");
const User = define("users", {
  title: {
    type: sequelize.STRING
  },
  technologies: {
    type: sequelize.STRING
  },
  budget: {
    type: sequelize.STRING
  },
  description: {
    type: sequelize.STRING
  },
  email: {
    type: sequelize.STRING
  }
});

module.exports = User;
