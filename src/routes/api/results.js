const express = require("express");
const router = express.Router();
var initModels = require("../../models/init-models");
const { QueryTypes } = require("sequelize");

var models = initModels(sequelize);

// Get all users
router.get("/:raceId", async (req, res) => {
  const results = await sequelize
    .query(
      `select 
        r.position, r.positionText, r.positionOrder, d.forename, d.surname, d.code, r.grid, r.points, r.laps, r.time, 
        r.milliseconds, r.fastestLap, r.rank, r.fastestLapTime, r.fastestLapSpeed, s.status, r.driverId, d.number, d.nationality,
        r.constructorId, c.name, c.nationality
      from results as r 
        inner join drivers as d on r.driverId = d.driverId
        inner join constructors as c on r.constructorId = c.constructorId
        inner join status as s on r.statusId = s.statusId
      where r.raceId = ${req.params.raceId}
      order by r.positionOrder`,
      {
        type: QueryTypes.SELECT,
      }
    )
    .catch(errHandler);

  res.json(results);
});

// Get all users
router.get("/quali/:raceId", async (req, res) => {
  const results = await sequelize
    .query(
      `select * from qualifying as q inner join drivers as d on q.driverId = d.driverId 
       where raceId = ${req.params.raceId}`,
      {
        type: QueryTypes.SELECT,
      }
    )
    .catch(errHandler);
  res.json(results);
});

router.get("/standings/constructors/:raceId", async (req, res) => {
  const results = await sequelize
    .query(
      `SELECT * 
      FROM constructorstandings AS c 
          inner join constructors AS ct ON c.constructorId = ct.constructorId
      WHERE raceId=${req.params.raceId} ORDER BY position`,
      {
        type: QueryTypes.SELECT,
      }
    )
    .catch(errHandler);
  res.json(results);
});

router.get("/standings/drivers/:raceId", async (req, res) => {
  const results = await sequelize
    .query(
      `SELECT * FROM driverstandings as ds inner join drivers as d on ds.driverId = d.driverId
      WHERE raceId=${req.params.raceId} ORDER BY position`,
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
