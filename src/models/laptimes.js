const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('laptimes', {
    raceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    lap: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    time: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    milliseconds: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'laptimes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "raceId" },
          { name: "driverId" },
          { name: "lap" },
        ]
      },
      {
        name: "raceId",
        using: "BTREE",
        fields: [
          { name: "raceId" },
        ]
      },
      {
        name: "raceId_2",
        using: "BTREE",
        fields: [
          { name: "raceId" },
        ]
      },
    ]
  });
};
