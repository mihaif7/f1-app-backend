const express = require("express");
const router = express.Router();
var initModels = require("../../models/init-models");
const { QueryTypes } = require("sequelize");

// Get all users
router.get("/:raceId", async (req, res) => {
  const results = await sequelize
    .query(
      `select c.name as circuitName, location, country, lat, lng, alt, c.url as circuitUrl, raceId, year, round, r.name as raceName, date, time, r.url as raceUrl   
      from circuits c inner join races r on r.circuitId = c.circuitId
      where r.raceId=${req.params.raceId}`,
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
