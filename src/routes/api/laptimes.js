const express = require("express");
const router = express.Router();
var initModels = require("../../models/init-models");
const { QueryTypes } = require("sequelize");

var models = initModels(sequelize);

// Get all users
router.get("/:raceId/:driverId", async (req, res) => {
  const results = await sequelize
    .query(
      `select 
          l.lap, l.position, l.time, l.milliseconds,
          p.stop, p.lap as pitLap, p.time as pitTime, p.duration, p.milliseconds as pitMilliseconds
       from lapTimes as l  
          left outer join pitStops as p on p.driverId = l.driverId and p.raceId = l.raceId and p.lap = l.lap   
       where l.driverId = ${req.params.driverId} and l.raceId = ${req.params.raceId}`,
      {
        type: QueryTypes.SELECT,
      }
    )
    .catch(errHandler);
  res.json(results);

  // const results = await models.laptimes
  //   .findAll({
  //     where: {
  //       driverId: req.params.driverId,
  //       raceId: req.params.raceId,
  //     },
  //     order: [["lap", "ASC"]],
  //   })
  //   .catch(errHandler);
  // res.json(results);
});

// Helpers
const errHandler = (err) => {
  console.log("Error: ", err);
};

module.exports = router;
