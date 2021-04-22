const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "heroku_2b84991d910ee92",
  "bf4777616fe61d",
  "63ff8370",
  {
    host: "eu-cdbr-west-01.cleardb.com",
    dialect: "mysql"
  }
);

module.exports = sequelize;
global.sequelize = sequelize;


// mysql://bf4777616fe61d:63ff8370@eu-cdbr-west-01.cleardb.com/heroku_2b84991d910ee92?reconnect=true