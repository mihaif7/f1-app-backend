const Sequelize = require("sequelize");

module.exports = sequelize.define(
  "races",
  {
    raceId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    year: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    round: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    circuitId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    time: {
      type: Sequelize.TIME,
      allowNull: true,
    },
    url: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
  },
  { timestamps: false }
);
