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
});

router.get("/summary/:raceId/:driverId", async (req, res) => {
  const results = await sequelize
    .query(
      `SELECT 
          min(l.time) as fastestLapString, 
          min(l.milliseconds) as fastLap, 
          avg(l.milliseconds) as avgPace, 
          max(l.milliseconds) as slowestLap, 
          max(p.stop) as pitStops, 
          avg(p.milliseconds) as avgPit
       FROM 
          laptimes as l 
       INNER JOIN
          pitstops as p on l.raceId = p.raceId and l.driverId = p.driverId
       WHERE l.driverId = ${req.params.driverId} and l.raceId = ${req.params.raceId}`,
      {
        type: QueryTypes.SELECT,
      }
    )
    .catch(errHandler);
  res.json(results);
});

router.get("/summary/old/:raceId/:driverId", async (req, res) => {
  const results = await sequelize
    .query(
      `SELECT 
          min(time) as fastestLapString, min(milliseconds) as fastLap , avg(milliseconds) as avgPace, max(milliseconds) as slowestLap
       FROM 
          laptimes
       WHERE driverId = ${req.params.driverId} and raceId = ${req.params.raceId}`,
      {
        type: QueryTypes.SELECT,
      }
    )
    .catch(errHandler);
  res.json(results);
});

// Helpers
const errHandler = (err) => {
  console.log("Error: ", err);
};

module.exports = router;
