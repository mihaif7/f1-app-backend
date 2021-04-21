var DataTypes = require("sequelize").DataTypes;
var _circuits = require("./circuits");
var _constructorresults = require("./constructorresults");
var _constructors = require("./constructors");
var _constructorstandings = require("./constructorstandings");
var _drivers = require("./drivers");
var _driverstandings = require("./driverstandings");
var _laptimes = require("./laptimes");
var _pitstops = require("./pitstops");
var _qualifying = require("./qualifying");
var _races = require("./races");
var _results = require("./results");
var _seasons = require("./seasons");
var _status = require("./status");

function initModels(sequelize) {
  var circuits = _circuits(sequelize, DataTypes);
  var constructorresults = _constructorresults(sequelize, DataTypes);
  var constructors = _constructors(sequelize, DataTypes);
  var constructorstandings = _constructorstandings(sequelize, DataTypes);
  var drivers = _drivers(sequelize, DataTypes);
  var driverstandings = _driverstandings(sequelize, DataTypes);
  var laptimes = _laptimes(sequelize, DataTypes);
  var pitstops = _pitstops(sequelize, DataTypes);
  var qualifying = _qualifying(sequelize, DataTypes);
  var races = _races(sequelize, DataTypes);
  var results = _results(sequelize, DataTypes);
  var seasons = _seasons(sequelize, DataTypes);
  var status = _status(sequelize, DataTypes);


  return {
    circuits,
    constructorresults,
    constructors,
    constructorstandings,
    drivers,
    driverstandings,
    laptimes,
    pitstops,
    qualifying,
    races,
    results,
    seasons,
    status,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
