const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "f1_app",
  "root",
  "123456",
  {
    host: "localhost",
    dialect: "mysql"
  }
);

module.exports = sequelize;
global.sequelize = sequelize;
